import * as React from "react";
import { appTheme } from "scichart-example-dependencies";
import classes from "../../../styles/Examples.module.scss";

import {
    DataLabelState,
    ECoordinateMode,
    EHorizontalAnchorPoint,
    EStrokePaletteMode,
    IPointMetadata,
    IPointMarkerPaletteProvider,
    IRenderableSeries,
    LineSeriesDataLabelProvider,
    NumericAxis,
    NumberRange,
    parseColorToUIntArgb,
    SciChartSurface,
    SplineLineRenderableSeries,
    TextAnnotation,
    TPointMarkerArgb,
    TWebAssemblyChart,
    Thickness,
    TSciChart,
    XyDataSeries,
    XySeriesInfo,
    EllipsePointMarker,
    RolloverModifier
} from "scichart";

const divElementId = "chart";

const drawExample = async (): Promise<TWebAssemblyChart> => {
    // Create a chart with X, Y axis
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId, {
        theme: appTheme.SciChartJsTheme
    });
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { growBy: new NumberRange(0.2, 0.2) }));

    // Given a dataset with X, Y but also additional values in the form of an object of any kind
    const dataValues = [
        { x: 0, y: 50, anObject: { label: "", pointColor: "#F48420", isSelected: false } },
        { x: 1, y: 35, anObject: { label: "Orange Point", pointColor: "#F48420", isSelected: false } },
        { x: 2, y: 68, anObject: { label: "Highest Point", pointColor: "#7BCAAB", isSelected: false } },
        { x: 3, y: 58, anObject: { label: "Selected Point", pointColor: "#F48420", isSelected: true } },
        { x: 4, y: 50, anObject: { label: "Orange Point", pointColor: "#F48420", isSelected: false } },
        { x: 5, y: 50, anObject: { label: "", pointColor: "#F48420", isSelected: false } },
        { x: 6, y: 40, anObject: { label: "Blue Point", pointColor: "#50C7E0", isSelected: false } },
        { x: 7, y: 53, anObject: { label: "Selected Point", pointColor: "#F48420", isSelected: true } },
        { x: 8, y: 55, anObject: { label: "", pointColor: "#F48420", isSelected: false } },
        { x: 9, y: 23, anObject: { label: "Blue Point", pointColor: "#50C7E0", isSelected: false } },
        { x: 10, y: 45, anObject: { label: "Selected Point", pointColor: "#F48420", isSelected: true } },
        { x: 11, y: 12, anObject: { label: "Lowest Point", pointColor: "#EC0F6C", isSelected: false } },
        { x: 12, y: 59, anObject: { label: "", pointColor: "#F48420", isSelected: false } },
        { x: 13, y: 60, anObject: { label: "", pointColor: "#F48420", isSelected: false } }
    ];

    // You can create a dataseries with these object values as metadata
    const xyDataSeriesWithMetadata = new XyDataSeries(wasmContext, {
        xValues: dataValues.map(row => row.x),
        yValues: dataValues.map(row => row.y),
        metadata: dataValues.map(row => row.anObject) // put any javascript object here
    });

    // You can assign this dataseries to a RenderableSeries in SciChart
    const lineSeries = new SplineLineRenderableSeries(wasmContext, {
        dataSeries: xyDataSeriesWithMetadata,
        stroke: appTheme.VividSkyBlue,
        strokeThickness: 3,
        pointMarker: new EllipsePointMarker(wasmContext, {
            width: 15,
            height: 15,
            strokeThickness: 0
        })
    });

    // Now you can consume metadata in the following ways
    // - Colouring points
    // - Labelling points
    // - Custom data for tooltips
    // - Tagging datapoints with the objects for later use
    //

    // 1. via paletteprovider (colour points or segments based on metadata values)

    // @ts-ignore
    const getColorFromMetadata = metadata => {
        // @ts-ignore
        const pointColorArgb = parseColorToUIntArgb(metadata.pointColor);
        const selectedColorArgb = 0xffffffff;
        const fill = metadata.isSelected ? selectedColorArgb : pointColorArgb;
        return fill;
    };

    const pointPaletteProvider: IPointMarkerPaletteProvider = {
        strokePaletteMode: EStrokePaletteMode.SOLID,
        onAttached(parentSeries: IRenderableSeries): void {},
        onDetached(): void {},
        overridePointMarkerArgb(
            xValue: number,
            yValue: number,
            index: number,
            opacity?: number,
            metadata?: IPointMetadata
        ): TPointMarkerArgb {
            // Metadata values can be used in paletteprovider overrides
            if (metadata) {
                const fill = getColorFromMetadata(metadata);
                return { stroke: fill, fill };
            }
            return undefined; // means use default colour
        }
    };
    lineSeries.paletteProvider = pointPaletteProvider;

    // 2. Via DataLabel provider
    const dataLabelProvider = new LineSeriesDataLabelProvider({
        // @ts-ignore
        metaDataSelector: metadata => metadata.label, // This is how you route a label (string) from metadata to data-labels in scichart
        style: { fontFamily: "Arial", fontSize: 16, padding: new Thickness(5, 5, 5, 5) },
        color: appTheme.ForegroundColor
    });
    lineSeries.dataLabelProvider = dataLabelProvider;
    // This is how you override colors of labels on a per-label basis, which can also come from metadata
    dataLabelProvider.getColor = (state: DataLabelState, label: string) => {
        const metadata = state.getMetaData();
        return getColorFromMetadata(metadata);
    };

    // 3. Via cursors and tooltips
    lineSeries.rolloverModifierProps.markerColor = appTheme.DarkIndigo;
    lineSeries.rolloverModifierProps.tooltipColor = appTheme.Indigo;
    lineSeries.rolloverModifierProps.tooltipDataTemplate = (seriesInfo: XySeriesInfo): string[] => {
        const valuesWithLabels: string[] = [];
        // Line Series
        const xySeriesInfo = seriesInfo as XySeriesInfo;

        valuesWithLabels.push("X Value: " + xySeriesInfo.formattedXValue);
        valuesWithLabels.push("Y Value: " + xySeriesInfo.formattedYValue);

        valuesWithLabels.push(" ");
        if (seriesInfo.pointMetadata) {
            // @ts-ignore
            let label = seriesInfo.pointMetadata.label;
            label = label === "" ? "..." : label;
            valuesWithLabels.push(`Metadata Label: "${label}"`);
            // @ts-ignore
            valuesWithLabels.push("Metadata Selected: " + seriesInfo.pointMetadata.isSelected);
        }
        return valuesWithLabels;
    };

    sciChartSurface.renderableSeries.add(lineSeries);

    // Add a RolloverModifier for tooltips
    sciChartSurface.chartModifiers.add(
        new RolloverModifier({
            showRolloverLine: false,
            showTooltip: true
        })
    );

    // Add title annotation
    sciChartSurface.annotations.add(
        new TextAnnotation({
            text: "Line Chart with Metadata (Objects per data-point)",
            fontSize: 18,
            textColor: appTheme.ForegroundColor,
            x1: 0.5,
            y1: 0,
            opacity: 0.77,
            horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
            xCoordinateMode: ECoordinateMode.Relative,
            yCoordinateMode: ECoordinateMode.Relative
        })
    );

    sciChartSurface.zoomExtents();
    return { sciChartSurface, wasmContext };
};

// React component needed as our examples app is react.
// SciChart can be used in Angular, Vue, Blazor and vanilla JS! See our Github repo for more info
export default function ChartComponent() {
    const sciChartSurfaceRef = React.useRef<SciChartSurface>();

    React.useEffect(() => {
        const chartInitializationPromise = drawExample().then(({ sciChartSurface }) => {
            sciChartSurfaceRef.current = sciChartSurface;
        });

        return () => {
            // check if chart is already initialized
            if (sciChartSurfaceRef.current) {
                sciChartSurfaceRef.current.delete();
                return;
            }

            // else postpone deletion
            chartInitializationPromise.then(() => {
                sciChartSurfaceRef.current.delete();
            });
        };
    }, []);

    return <div id={divElementId} className={classes.ChartWrapper} />;
}
