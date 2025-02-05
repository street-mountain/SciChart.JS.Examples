import * as React from "react";
import {
    EAxisAlignment,
    EllipsePointMarker,
    MouseWheelZoomModifier,
    NumberRange,
    NumericAxis,
    ScaleAnimation,
    SciChartSurface,
    SplineBandRenderableSeries,
    XyyDataSeries,
    ZoomExtentsModifier,
    ZoomPanModifier
} from "scichart";
import { appTheme, ExampleDataProvider } from "scichart-example-dependencies";
import classes from "../../../styles/Examples.module.scss";

const divElementId = "chart";

const drawExample = async () => {
    // Create a SciChartSurface
    const { wasmContext, sciChartSurface } = await SciChartSurface.create(divElementId, {
        theme: appTheme.SciChartJsTheme
    });

    // Add an XAxis, YAxis
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { axisAlignment: EAxisAlignment.Top }));
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, { axisAlignment: EAxisAlignment.Left, growBy: new NumberRange(0.2, 0.2) })
    );

    // The spline bandseries requires a special dataseries type called XyyDataSeries
    // This stores X, Y1, Y2 point data for the two lines in the band
    const yValues = ExampleDataProvider.getDampedSinewave(0, 1.0, 0, 0.005, 1000, 13);
    const y1Values = ExampleDataProvider.getDampedSinewave(0, 1.0, 0, 0.005, 1000, 12);
    const dataSeries = new XyyDataSeries(wasmContext);

    for (let i = 0; i < 10; i++) {
        const index = i * 100;
        dataSeries.append(yValues.xValues[index], yValues.yValues[index], y1Values.yValues[index]);
    }

    // Create the band series and add to the chart
    const rendSeries = new SplineBandRenderableSeries(wasmContext, {
        dataSeries,
        strokeThickness: 3,
        interpolationPoints: 20, // Choose the number of points to interpolate for smoothing
        pointMarker: new EllipsePointMarker(wasmContext, {
            width: 9,
            height: 9,
            fill: appTheme.PaleSkyBlue,
            stroke: appTheme.VividSkyBlue
        }),
        animation: new ScaleAnimation({ duration: 800, zeroLine: 0, fadeEffect: true })
    });

    rendSeries.fill = appTheme.VividOrange + "33";
    rendSeries.fillY1 = appTheme.VividSkyBlue + "33";
    rendSeries.stroke = appTheme.VividOrange;
    rendSeries.strokeY1 = appTheme.VividSkyBlue;
    sciChartSurface.renderableSeries.add(rendSeries);

    // Optional: Add some interactivity modifiers
    sciChartSurface.chartModifiers.add(new ZoomExtentsModifier(), new ZoomPanModifier(), new MouseWheelZoomModifier());

    sciChartSurface.zoomExtents();
    return { wasmContext, sciChartSurface };
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
