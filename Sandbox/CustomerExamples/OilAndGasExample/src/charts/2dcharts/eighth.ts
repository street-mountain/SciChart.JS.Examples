import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumberRange } from "scichart/Core/NumberRange";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { getColor } from "../utils";
import { XyScatterRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/XyScatterRenderableSeries";
import { TSciChart } from "scichart/types/TSciChart";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import {appTheme} from "../../theme";

export default async function init2dEightChart(id: string) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(id, { theme: appTheme.SciChartJsTheme });
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { visibleRange: new NumberRange(-1.5, 3.5), isVisible: false }));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { visibleRange: new NumberRange(-1.5, 3.5), isVisible: false }));

    // Create a scatter series with some initial data
    const scatterSeriesR = generateData(wasmContext, getColor('red'), data.xValuesR, data.yValuesR);
    const scatterSeriesB = generateData(wasmContext, getColor('blue'), data.xValuesB, data.yValuesB);
    const scatterSeriesG = generateData(wasmContext, getColor('green'), data.xValuesG, data.yValuesG);

    sciChartSurface.renderableSeries.add(scatterSeriesG);
    sciChartSurface.renderableSeries.add(scatterSeriesB);
    sciChartSurface.renderableSeries.add(scatterSeriesR);
}

function generateData(wasmContext: TSciChart, color: string, xValues: number[], yValues: []) {
    return new XyScatterRenderableSeries(wasmContext, {
        dataSeries: new XyDataSeries(wasmContext, {
            xValues,
            yValues
        }),
        pointMarker: new EllipsePointMarker(wasmContext, {
            width: 3,
            height: 3,
            fill: color,
            strokeThickness: 0
        })
    });
}

const data: any = {
    xValuesR: [0.48, 0.78, 1.14, 1.43, 1.82, 1.95, 1.95, 2.08, 1.49, 1.2, 0.58, 0.22, 0.12, 1.59, 1.46, 2.15, 2.02, 2.28, 2.28, 2.08, 1.4, 1.07, 1.92, 2.08, 2.08, 1.85, 1.79, 1.82, 2.18, 2.44, 2.74, 2.57, 2.12, 2.18, 2.61, 2.77, 2.97, 2.64, 2.31, 1.85, 1.23, 1.56, 1.82, 1.56, 1.27, 1.33, 0.55, 0.55, 0.61, 0.64, 0.71, 0.71, 0.68, 0.68, 0.58, 0.58, 0.32, 0.42, 0.48, 0.61, 0.81, 0.74, 0.71, 0.71, 0.71, 0.71, 0.64, 0.58, 0.45, 0.38, 0.38, 0.28, -0.01, -0.04, -0.11, -0.21, -0.27, -0.07, -0.17, -0.21, 0.09, 0.28, 0.22, 0.02, 0.19, 0.25, 0.35, 0.42, 0.48, 0.48, 0.55, 0.55, 0.58, 0.68, 0.74, 0.81, 0.81, 0.78, 0.68, 0.58, 0.45, 0.25, 0.12, 0.06, 0.09, -0.01, 0.02, 0.25, 0.48, 0.51, 0.51, 0.51, 0.51, 0.55, 0.51, 0.55, 0.58, 0.58, 0.58, 0.61, 0.58, 0.58, 0.58, 0.51, 0.51, 0.51, 0.45, 0.42, 0.28, 0.22, 0.15, 0.12, 0.06, 0.02, -0.14, -0.04, -0.07, 0.12, 0.32, -0.37, -0.37, -0.4, -0.4, -0.4, -0.4, -0.4, -0.21, -0.34, -0.34, 0.02, 0.09, 0.32, 0.15, 0.42, 0.51, 0.48, 0.45, 0.45, 0.45, 0.42, 0.38, 0.38, 0.38, 0.38, 0.35, 0.35, 0.35, 0.32, 0.32, 0.22, 0.19, 0.15, 0.09, 0.15, 0.02, 0.02, -0.01, 0.02, 0.19, 0.25, 0.22, 0.09, 0.28, 0.32, 0.32, 0.32, 0.22, 0.06, -0.14, -0.21, -0.27, -0.34, -0.34, -0.34, -0.34, -0.34, -0.37, -0.37, -0.34, -0.34, -0.34, -0.34, -0.37, -0.37, -0.37, -0.34, -0.34, -0.34, -0.34, -0.37, -0.37, -0.37, -0.37, -0.37, -0.4, -0.4, -0.4, -0.4, -0.4, -0.4, -0.4, -0.4, -0.4, -0.3, -0.21, -0.07, -0.01, 0.02, -0.04, -0.14, -0.21, 0.15, 0.19, 0.25, 0.32, 0.35, 0.35, 0.35, 0.42, 0.38, 0.35, 0.28, 0.15, 0.12, -0.04, -0.17, -0.24, -0.21, 0.06, 0.15, 0.12, -0.01, -0.11, -0.07, -0.01, 0.19, 0.15, 0.12, 0.09, 0.02, -0.14, -0.17, -0.17, -0.3, -0.21, 0.19, -0.04, 0.02, 0.02, 0.02, 0.09, 0.12, 0.02, -0.24, -0.27, -0.3, -0.3, -0.34, -0.11, -0.21, -0.21, -0.43, -0.11, -0.07, -0.07, -0.01, 0.02, 0.19, 0.19, 0.35, 0.22, 0.09, -0.04, -0.11, -0.17, -0.17, -0.17, -0.14, 0.06, 0.15, -0.01, -0.07, -0.11, -0.14, -0.21, -0.14, 0.19, 0.12, 0.02, 0.02, -0.04, -0.14, -0.17, -0.21, -0.3, -0.27, -0.14, -0.24, -0.3, -0.27, -0.37, -0.27, -0.27, -0.3, -0.27, -0.3, -0.3, -0.14, 0.02, 0.02, -0.14, -0.21, -0.07, 0.02, 0.02, -0.24, -0.07, 0.12, 0.19, 0.25, 0.25, 0.25, 0.25, 0.22, 0.22, 0.19, 0.12, 0.09, 0.06, -0.07, -0.07, -0.17, -0.24, -0.27, -0.27, -0.34, -0.3, -0.14, -0.14, -0.21, -0.27, -0.07, 0.15, 0.15, 0.02],
    yValuesR: [0.14, 0.52, 0.52, -0.16, 0.29, 1.5, 2.1, 2.48, 1.05, 0.59, 0.52, 0.29, 0.14, 4.22, 4.37, 3.99, 3.54, 4.44, 4.82, 5.12, 4.75, 4.59, 4.52, 4.82, 3.99, 2.86, 2.33, 2.03, 2.63, 3.76, 5.42, 4.59, 3.39, 3.46, 4.59, 5.12, 5.42, 5.5, 5.35, 4.22, 4.22, 3.92, 4.14, 3.92, 3.08, 2.41, 1.12, 1.2, 1.42, 1.58, 1.95, 2.03, 2.25, 2.33, 2.56, 2.56, 2.93, 3.08, 3.01, 3.01, 2.86, 2.63, 2.48, 2.25, 2.1, 1.95, 1.73, 1.5, 1.35, 1.35, 2.03, 2.1, 1.95, 1.8, 1.5, 0.59, 0.29, 0.97, 1.42, 1.2, 1.65, 2.03, 2.41, 2.1, 1.95, 1.88, 0.9, 0.9, 0.9, 1.05, 1.05, 1.12, 1.35, 1.58, 1.73, 1.95, 2.33, 2.63, 2.71, 2.71, 2.78, 2.93, 2.78, 2.41, 2.1, 1.65, 1.65, 1.42, 1.42, 1.65, 1.8, 2.03, 2.25, 2.18, 2.63, 2.63, 2.56, 2.41, 2.33, 2.25, 2.18, 2.03, 1.95, 1.88, 1.8, 1.65, 1.42, 1.35, 1.27, 1.12, 1.05, 1.05, 1.05, 1.05, 1.35, 1.58, 1.88, 2.1, 2.41, -0.24, -0.31, -0.16, -0.08, -0.01, 0.07, 0.14, 0.67, 1.05, 1.58, 1.95, 2.1, 2.48, 2.63, 2.93, 2.63, 2.56, 2.56, 2.48, 2.33, 2.1, 2.03, 1.8, 1.5, 1.35, 1.12, 1.12, 1.05, 0.97, 0.97, 0.82, 0.75, 0.59, 0.75, 1.88, 1.8, 1.8, 1.65, 1.58, 1.8, 1.88, 2.03, 2.1, 2.33, 2.56, 2.03, 1.73, 1.65, 1.65, 0.82, 0.59, 0.59, 0.44, 0.29, 0.07, 0.07, 0.22, 0.37, 0.52, 0.82, 0.9, 1.2, 1.42, 1.65, 1.58, 1.42, 1.2, 1.05, 0.9, 0.75, 0.52, 0.44, 0.14, 0.07, 0.22, 0.59, 0.67, 0.9, 1.12, 1.42, 1.65, 1.8, 1.88, 1.95, 2.03, 2.18, 2.18, 2.18, 1.95, 1.5, 0.9, 0.75, 3.08, 3.08, 2.93, 2.86, 2.78, 2.63, 2.33, 2.18, 1.88, 1.58, 1.42, 0.9, 0.67, 0.37, 0.22, 0.07, 0.07, 0.29, 0.67, 0.9, 0.9, 1.05, 1.2, 1.35, 1.5, 1.5, 1.58, 1.42, 1.42, 2.18, 2.18, 2.41, 2.1, 2.1, 2.33, 2.41, 2.48, 2.18, 2.56, 2.71, 2.63, 2.48, 1.73, 1.58, 1.42, 1.35, 1.05, 0.07, 0.07, 0.29, 1.12, 2.63, 2.63, 2.71, 2.86, 2.86, 2.78, 2.56, 2.41, 2.25, 2.03, 1.95, 2.18, 1.88, 1.8, 1.65, 1.58, 1.88, 2.18, 1.95, 1.58, 0.97, 0.75, 0.44, 0.44, 0.97, 1.27, 0.97, 0.75, 0.67, 0.59, 0.59, 1.12, 1.27, 1.42, 1.88, 1.88, 1.88, 1.95, 2.18, 2.03, 1.73, 1.27, 1.05, 0.9, 0.97, 1.5, 2.1, 1.8, 1.27, 0.82, 0.97, 1.27, 1.27, 2.41, 2.48, 2.48, 2.56, 2.33, 2.25, 2.1, 1.88, 1.5, 1.27, 1.05, 0.75, 0.67, 0.44, 0.14, 0.07, -0.08, -0.16, -0.16, -0.24, -0.24, 0.14, 0.82, 1.12, 1.27, 0.52, 0.44, 1.35, 1.73, 1.65],
    xValuesG: [0.91, 0.61, 0.15, -0.01, -0.21, -0.11, -0.17, -0.27, -0.24, 0.32, 0.09, 0.25, 0.35, 0.78, 1, 1.04, 2.64, 2.48, 2.41, 2.28, 2.15, 2.12, 1.85, 2.08, 2.15, 2.31, 1.76, 1.4, 1.43, 1.66, 1.49, 1.43, 1.2, 1.14, 1.43, 1.53, 1.33, 0.51, 0.74, 1.1, 1.04, 0.87, 1.14, 1.46, 1.76, 1.95, 1.89, 1.59, 1.56, 2.54, 2.41, 2.21, 1.89, 2.15, 2.61, 2.77, 1.95, 1.49, 1.4, 1.76, 2.57, 2.35, 1.63, 1.72, 1.99, 1.63, 1.4, 1.27, 1.27, 1.17, 1.14, 1.04, 1.1, 1.07, 0.97, 0.94, 0.94, 0.97, 1.04, 1.14, 1.2, 1.23, 1.27, 1.36, 1.4, 1.49, 1.56, 1.56, 1.66, 1.66, 1.66, 1.59, 1.59, 1.63, 1.49, 1.43, 1.49, 1.63, 1.63, 1.56, 1.53, 1.27, 1, 0.97, 1.04, 1.1, 1.17, 1.23, 1.33, 1.33, 1.17, 1.07, 1, 1, 0.87, 0.71, 0.87, 0.94, 1, 1.27, 1.33, 1.4, 1.46, 1.56, 1.59, 1.59, 1.3, 0.97, 0.78, 1.17, 1.2, 1.27, 1.3, 1.23, 1.23, 1.33, 1.33, 1.33, 1.36, 1.27, 1.2, 1.23, 1.23, 1.2, 1.07, 1.07, 1, 0.94, 1, 1.14, 1.17, 1.33, 1.4, 0.94, 0.94, 1, 1, 1.07, 1.07, 1.14, 1.2, 1.27, 1.36, 1.46, 1.49, 1.56, 1.69, 1.69, 1.76, 1.72, 1.63, 1.49, 1.33, 1.2, 1.14, 1.04, 1, 0.81, 0.68, 0.64, 0.68, 0.64, 0.48, 0.64, 0.74, 0.74, 0.71, 0.74, 0.81, 0.91, 0.94, 0.94, 0.81, 0.74, 0.87, 0.94, 1, 1.07, 1.14, 1.14, 1.27, 1.36, 1.49, 1.53, 1.49, 1.36, 1, 0.71, 0.81, 0.94, 1.1, 1.17, 1.17, 1.2, 1.33, 1.33, 1.1, 0.81, 0.61, 0.91, 1.2, 1.53, 1.4, 1.1, 0.71, 1.1, 1.46, 0.48, 0.64, 0.97, 1.14, 1.53, 1.82, 1.92, 2.08, 2.12, 2.15, 2.21, 1.85, 1.79, 1.66, 1.46, 1.1, 0.81, 0.48, 0.35, 0.22, 0.22, 2.08, 2.08, 2.18, 2.35, 2.15, 2.08, 1.85, 1.89, 1.85, 1.85, 1.85, 1.82, 1.79, 1.79, 1.76, 1.69, 1.69, 1.63, 1.59, 1.53, 1.49, 1.4, 1.3, 1.23, 1.17, 1.1, 1, 0.87, 0.81, 0.71, 0.64, 0.58, 0.55, 0.38, 0.38, 0.35, 0.35, 0.22, 0.22, 0.25, 0.35, 0.42, 0.42, 0.42, 0.35, 0.38, 0.55, 0.55, 0.51, 0.45, 0.32, 0.28, 0.28, 0.32, 0.32, 0.32, 0.42, 0.45, 0.48, 0.48, 0.58, 0.61, 0.81, 0.68, 0.58, 0.64, 0.68, 0.71, 0.74, 0.81, 0.84, 0.74, 0.58, 0.51, 0.58, 0.64, 0.74, 0.84, 0.97, 1.04, 1, 0.97, 1.17, 1.2, 1.36, 1.53, 1.33, 0.97, 0.91, 0.91],
    yValuesG: [5.05, 4.97, 4.44, 5.35, 5.5, 4.52, 3.84, 3.01, 2.63, 3.46, 3.31, 4.07, 4.37, 4.82, 4.82, 4.82, 5.05, 5.05, 4.52, 3.61, 3.31, 3.31, 3.01, 3.92, 4.52, 4.82, 4.67, 4.52, 4.67, 4.67, 4.07, 2.86, 3.24, 3.76, 3.08, 2.48, 2.41, 3.24, 3.61, 3.08, 1.95, 1.65, 1.95, 2.41, 3.31, 4.37, 4.82, 4.75, 4.07, 5.2, 4.75, 4.07, 3.31, 3.99, 5.05, 5.42, 5.27, 4.67, 4.59, 4.67, 4.82, 4.9, 2.93, 3.31, 4.52, 3.92, 3.08, 2.93, 2.86, 2.86, 2.93, 3.31, 3.39, 3.54, 3.76, 3.92, 4.14, 4.22, 4.22, 4.22, 4.14, 4.07, 3.99, 3.84, 3.84, 3.69, 3.54, 3.31, 3.08, 2.86, 2.56, 2.48, 2.33, 2.41, 2.41, 2.41, 2.48, 2.63, 3.01, 3.39, 3.61, 3.84, 4.14, 3.92, 3.46, 3.16, 2.93, 2.71, 2.63, 2.63, 2.71, 2.86, 3.39, 3.54, 3.61, 3.69, 3.92, 4.07, 4.07, 3.76, 3.76, 3.61, 3.46, 3.24, 3.08, 3.39, 3.76, 3.99, 3.99, 2.63, 2.41, 2.48, 3.01, 3.16, 2.78, 2.86, 3.01, 2.86, 2.56, 2.33, 2.18, 2.03, 1.88, 1.8, 1.8, 2.1, 2.41, 2.25, 2.1, 2.03, 2.03, 1.88, 1.88, 2.63, 2.63, 2.48, 2.41, 2.33, 2.25, 2.18, 2.1, 2.1, 2.1, 2.03, 2.03, 2.18, 2.48, 2.78, 3.24, 3.54, 3.84, 4.07, 4.29, 4.44, 4.44, 4.44, 4.52, 4.22, 3.76, 3.61, 3.54, 3.39, 3.39, 3.84, 3.99, 3.92, 3.46, 3.39, 3.39, 3.39, 3.46, 3.76, 3.76, 3.39, 3.31, 3.16, 2.86, 2.63, 2.48, 2.41, 2.41, 2.48, 2.56, 2.71, 2.93, 3.24, 3.54, 3.99, 4.29, 4.29, 4.14, 3.92, 3.61, 3.16, 3.01, 3.16, 3.99, 4.14, 3.76, 2.63, 2.33, 2.86, 3.39, 3.92, 3.69, 2.41, 2.25, 0.9, 0.9, 1.12, 1.12, 1.58, 2.41, 3.01, 3.76, 4.52, 4.82, 5.35, 5.27, 5.27, 5.12, 4.9, 4.75, 4.59, 3.99, 3.54, 3.24, 3.24, 2.86, 2.86, 2.86, 3.01, 3.69, 3.84, 3.76, 3.39, 2.93, 2.71, 2.63, 2.41, 2.25, 2.18, 2.1, 2.03, 1.95, 1.88, 1.8, 1.65, 1.58, 1.5, 1.35, 1.35, 1.27, 1.27, 1.27, 1.2, 1.12, 1.12, 1.12, 1.12, 1.12, 1.12, 1.2, 1.42, 1.58, 2.18, 2.56, 2.63, 2.56, 2.18, 1.8, 1.5, 1.35, 1.58, 1.65, 1.95, 2.41, 2.63, 2.78, 2.93, 3.01, 3.16, 3.31, 3.39, 3.54, 3.69, 3.76, 3.84, 4.07, 4.07, 4.37, 4.14, 4.14, 4.22, 4.29, 4.29, 4.29, 4.44, 4.44, 3.92, 3.61, 3.54, 3.16, 2.93, 2.41, 2.1, 2.56, 2.71, 2.71, 2.71, 2.93, 3.31, 3.54, 3.84, 3.69, 2.93, 2.71, 2.71],
    xValuesB: [2.15, 2.15, 2.28, 2.54, 2.48, 2.44, 2.28, 2.28, 1.99, 1.95, 2.02, 1.92, 1.66, 1.79, 2.15, 2.41, 2.28, 2.08, 2.05, 2.02, 1.14, 0.97, 1.59, 1.69, 1.89, 1.99, 2.25, 2.08, 1.66, 1.49, 1.79, 0.91, 0.58, 1, 1.14, 1.56, 1.82, 1.36, 1, 1.33, 1.56, 1.46, 0.58, 0.64, 0.64, 0.74, 0.74, 0.78, 0.87, 0.87, 0.84, 0.81, 0.55, 0.94, 1, 0.94, 0.74, 0.81, 1.3, 1.69, 1.79, 1.85, 1.85, 1.95, 2.05, 2.21, 1.95, 1.63, 1.36, 1.4, 1.89, 1.92, 2.08, 1.92, 1.46, 1.3, 1.69, 1.92, 2.02, 2.12, 1.85, 1.92, 1.92, 1.92, 2.05, 2.05],
    yValuesB: [2.78, 2.93, 3.69, 4.9, 5.42, 5.42, 5.12, 4.59, 3.61, 3.01, 3.24, 4.29, 4.52, 4.44, 4.75, 5.27, 4.44, 3.69, 3.31, 3.08, 1.65, 1.73, 1.42, 1.73, 2.48, 4.07, 5.35, 5.35, 4.82, 4.75, 4.9, 4.37, 3.84, 3.76, 3.24, 1.95, 2.93, 3.31, 3.69, 4.07, 3.46, 2.48, 3.24, 3.24, 3.16, 3.01, 3.01, 3.08, 2.86, 2.41, 2.03, 1.65, 1.58, 1.73, 1.65, 1.5, 1.58, 1.42, 1.5, 1.58, 2.33, 2.86, 3.84, 4.52, 5.05, 5.42, 5.5, 5.05, 4.82, 4.67, 4.52, 3.84, 5.12, 5.27, 4.97, 4.9, 4.82, 4.29, 5.12, 5.42, 5.27, 4.75, 4.52, 4.37, 4.29, 4.29]
};
