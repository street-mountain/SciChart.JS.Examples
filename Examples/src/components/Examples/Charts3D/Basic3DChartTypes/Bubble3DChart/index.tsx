import * as React from "react";
import classes from "../../../styles/Examples.module.scss";
import {appTheme} from "scichart-example-dependencies";
import {populationData, PopulationData} from "./data/PopulationData";

import {
    SciChart3DSurface,
    CameraController,
    Vector3,
    MouseWheelZoomModifier3D,
    OrbitModifier3D,
    ResetCamera3DModifier,
    NumericAxis3D,
    NumberRange,
    ScatterRenderableSeries3D,
    XyzDataSeries3D,
    SpherePointMarker3D,
    TGradientStop,
    parseColorToUIntArgb,
    TooltipModifier3D,
    SeriesInfo3D,
    TooltipSvgAnnotation3D,
    XyzSeriesInfo3D
} from "scichart";

const divElementId = "chart";

type TMetadata = {
    country: string;
    color: string;
    vertexColor: number;
    pointScale: number;
};

// SCICHART CODE
const drawExample = async () => {
    const { sciChart3DSurface, wasmContext } = await SciChart3DSurface.create(divElementId, {
        theme: appTheme.SciChartJsTheme
    });
    sciChart3DSurface.camera = new CameraController(wasmContext, {
        position: new Vector3(-141.6, 310.29, 393.32),
        target: new Vector3(0, 50, 0)
    });

    sciChart3DSurface.chartModifiers.add(
        new MouseWheelZoomModifier3D(),
        new OrbitModifier3D(),
        new ResetCamera3DModifier());

    const tooltipModifier = new TooltipModifier3D({ tooltipLegendOffsetX: 10, tooltipLegendOffsetY: 10 });
    tooltipModifier.tooltipDataTemplate = (seriesInfo: SeriesInfo3D, svgAnnotation: TooltipSvgAnnotation3D) => {
        const valuesWithLabels: string[] = [];
        if (seriesInfo && seriesInfo.isHit) {
            const md = (seriesInfo as XyzSeriesInfo3D).pointMetadata as TMetadata;
            valuesWithLabels.push(md.country);
            valuesWithLabels.push(`Life Expectancy: ${seriesInfo.xValue}`);
            valuesWithLabels.push(`GDP Per Capita: ${seriesInfo.yValue}`);
            valuesWithLabels.push(`Year: ${seriesInfo.zValue}`);
        }
        return valuesWithLabels;
    }
    const defaultTemplate = tooltipModifier.tooltipSvgTemplate;
    tooltipModifier.tooltipSvgTemplate = (seriesInfo: SeriesInfo3D, svgAnnotation: TooltipSvgAnnotation3D) => {
        if (seriesInfo) {
            const md = (seriesInfo as XyzSeriesInfo3D).pointMetadata as TMetadata;
            svgAnnotation.containerBackground = md.color
            svgAnnotation.textStroke = "white";
        }
        return defaultTemplate(seriesInfo, svgAnnotation);
    };
    sciChart3DSurface.chartModifiers.add(tooltipModifier);

    sciChart3DSurface.xAxis = new NumericAxis3D(wasmContext, {
        axisTitle: "Life Expectancy",
        visibleRange: new NumberRange(30, 85)
    });
    sciChart3DSurface.yAxis = new NumericAxis3D(wasmContext, {
        axisTitle: "Gdp Per Capita",
        visibleRange: new NumberRange(0, 50000)
    });
    sciChart3DSurface.zAxis = new NumericAxis3D(wasmContext, {
        axisTitle: "Year",
        visibleRange: new NumberRange(1950, 2010)
    });

    // Population dataset from gapminderdata
    // data format example = [
    //    { country: "Afghanistan", year: 1952, population: 8425333, continent: "Asia", lifeExpectancy: 28.801, gdpPerCapita: 779.4453145 },
    // ]
    const year = populationData.map(item => item.year);
    const population = populationData.map(item => item.population);
    const lifeExpectancy = populationData.map(item => item.lifeExpectancy);
    const gdpPerCapita = populationData.map(item => item.gdpPerCapita);

    // Metadata in scichart.js 3D controls color and scale of a bubble. It can also hold additional optional properties
    // Below we format the data for lifeExpectancy into metadata colour coded and scaled depending on the value
    const metadata = formatMetadata(populationData, [
        {offset: 1, color: appTheme.VividPink},
        {offset: 0.9, color: appTheme.VividOrange},
        {offset: 0.7, color: appTheme.MutedRed},
        {offset: 0.5, color: appTheme.VividGreen},
        {offset: 0.3, color: appTheme.VividSkyBlue},
        {offset: 0.2, color: appTheme.Indigo},
        {offset: 0, color: appTheme.DarkIndigo}
    ]);

    sciChart3DSurface.renderableSeries.add(
        new ScatterRenderableSeries3D(wasmContext, {
            dataSeries: new XyzDataSeries3D(wasmContext, {
                xValues: lifeExpectancy,
                yValues: gdpPerCapita,
                zValues: year,
                metadata
            }),
            pointMarker: new SpherePointMarker3D(wasmContext, { size: 10 }),
            opacity: 0.9
        })
    );

    return { sciChart3DSurface, wasmContext };
};

function formatMetadata(population: PopulationData[], gradientStops: TGradientStop[]): TMetadata[] {
    const valuesArray = populationData.map(item => item.lifeExpectancy);
    const low = Math.min(...valuesArray);
    const high = Math.max(...valuesArray);

    const sGradientStops = gradientStops.sort((a, b) => (a.offset > b.offset ? 1 : -1));
    // Compute a scaling factor from 0...1 where values in valuesArray at the lower end correspond to 0 and
    // values at the higher end correspond to 1
    const metaData: TMetadata [] = [];
    for (const item of population) {
        const x = item.lifeExpectancy;
        // scale from 0..1 for the values
        const valueScale = (x - low) / (high - low);
        // Find the nearest gradient stop index
        const index = sGradientStops.findIndex(gs => gs.offset >= valueScale);
        // const nextIndex = Math.min(index + 1, sGradientStops.length - 1);
        // work out the colour of this point
        const color = sGradientStops[index].color;
        const vertexColor = parseColorToUIntArgb(color);
        metaData.push({country: item.country, pointScale: 0.1 + valueScale, vertexColor, color });
    }
    return metaData;
}
// React component needed as our examples app is react.
// SciChart can be used in Angular, Vue, Blazor and vanilla JS! See our Github repo for more info
export default function ChartComponent() {
    const sciChartSurfaceRef = React.useRef<SciChart3DSurface>();

    React.useEffect(() => {
        const chartInitializationPromise = drawExample().then(({ sciChart3DSurface }) => {
            sciChartSurfaceRef.current = sciChart3DSurface;
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
