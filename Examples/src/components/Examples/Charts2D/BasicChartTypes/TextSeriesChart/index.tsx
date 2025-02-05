import * as React from "react";
import classes from "../../../styles/Examples.module.scss";
import { appTheme } from "scichart-example-dependencies";
import {
    SciChartSurface,
    NumericAxis,
    NumberRange,
    ZoomPanModifier,
    ZoomExtentsModifier,
    MouseWheelZoomModifier,
    LogarithmicAxis,
    ENumericFormat,
    XyTextDataSeries,
    FastTextRenderableSeries
} from "scichart";

// tslint:disable:no-empty

const divElementId = "chart";

const drawExample = async () => {
    // Create a SciChartSurface
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId, {
        theme: appTheme.SciChartJsTheme
    });
    const xAxis = new LogarithmicAxis(wasmContext, {
        axisTitle: "Number of Tweets",
        logBase: 2,
        labelFormat: ENumericFormat.SignificantFigures,
        growBy: new NumberRange(0, 0.1)
    });
    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, {
            axisTitle: "Average Sentiment",
            labelPrecision: 2,
            visibleRange: new NumberRange(0, 1.01),
            visibleRangeLimit: new NumberRange(0, 1.01)
        })
    );

    // data is { xValues: number[], yValues: number[], textValues: string[] }
    const data: { xValues: number[]; yValues: number[]; textValues: string[] } = await fetch("/api/tweetData").then(r =>
        r.json()
    );
    const series = new FastTextRenderableSeries(wasmContext, {
        dataLabels: { style: { fontFamily: "arial", fontSize: 10 }, calculateTextBounds: false },
        dataSeries: new XyTextDataSeries(wasmContext, data)
    });
    sciChartSurface.renderableSeries.add(series);

    sciChartSurface.chartModifiers.add(new ZoomPanModifier(), new ZoomExtentsModifier(), new MouseWheelZoomModifier());

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
