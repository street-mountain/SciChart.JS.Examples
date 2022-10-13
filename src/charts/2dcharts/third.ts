import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumberRange } from "scichart/Core/NumberRange";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { XyScatterRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/XyScatterRenderableSeries";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import { TSciChart } from "scichart/types/TSciChart";
import { getColor } from "../utils";
import {theme} from "../../theme";


export default async function init2dThirdChart(id: string) {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(id, { theme });
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, { visibleRange: new NumberRange(-0.5, 5.5), isVisible: false }));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { visibleRange: new NumberRange(-0.5, 5.5), isVisible: false }));

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
    xValuesR: [2.7, 2.74, 2.84, 2.64, 2.7, 2.84, 3, 3.06, 3.16, 3.13, 3.23, 3.03, 1.3, 1.3, 1.63, 1.66, 1.76, 1.85, 2.08, 2.12, 1.89, 1.56, 1.2, 1.07, 1.07, 0.84, 0.78, 0.64, 0.55, 0.45, 0.32, 0.28, 0.12, 0.12, 0.45, 0.64, 0.74, 0.91, 1.04, 0.87, 0.58, 0.35, 0.06, -0.07, -0.14, -0.21, -0.34, -0.34, -0.27, 0.15, 0.12, -0.04, -0.01, 0.25, 0.35, 0.55, 0.58, 0.61, -0.04, -0.01, -0.14, -0.3, 0.25, 0.42, 0.61, 0.81, 0.87, 0.97, 0.91, 0.78, 0.61, 0.51, 0.35, 0.22, 0.19, -0.04, -0.07, -0.04, -0.27, -0.34, -0.34, -0.3, -0.3, -0.34, -0.17, 0.15, 0.45, 0.58, 0.71, 0.81, 0.84, 0.48, 0.28, 0.25, -0.04, -0.11, -0.11, -0.3, -0.3, -0.3, -0.3, -0.3, -0.34, -0.37, 0.06, 0.06, -0.07, -0.21, -0.24, -0.43, -0.43, -0.3, -0.11, -0.11, -0.34, -0.47, -0.34, -0.37, -0.3, -0.24, -0.21, -0.04, 0.25, 0.51, 0.51, 0.61, 0.74, 0.71, 0.61, 0.55, 0.45, 0.25, 0.15, -0.01, -0.17, 0.02, 0.09, -0.3, -0.21, 0.06, -0.07, -0.17, -0.37, -0.17, 0.02, 0.12, 0.28, 0.42, 0.58, 0.71, 0.84, 0.74, 0.64, 0.58, 0.28, 0.19, -0.07, -0.17, -0.27, -0.3, -0.37, -0.34, -0.34, -0.17, -0.11, -0.04, 0.06, 0.06, -0.34, -0.37, -0.4, -0.47, -0.5, -0.5, -0.47, -0.47, -0.43, -0.47, -0.43, -0.37, -0.17, -0.14, -0.27, -0.21, -0.17, -0.21, -0.4, -0.4, -0.4, -0.43, -0.43, -0.43, -0.43, -0.37, -0.3, -0.3, -0.34, -0.34, -0.27, -0.27, -0.21, -0.24, -0.4, -0.3, -0.11, -0.01, -0.01, 0.02, 0.15, 0.15, 0.22, 0.35, 0.32, 0.25, 0.22, 0.06, 0.02, 0.32, 0.64, 0.84, 0.25, -0.01, -0.24, -0.27, -0.24, -0.21, -0.21, -0.17, -0.17, -0.3, -0.07, -0.04, -0.07, -0.01, -0.01, -0.01, 0.15, 0.12, -0.01, 0.45, 0.71, 0.48, 0.15, 0.32, 0.61, 0.19, -0.01, 0.09, -0.04, -0.11, -0.14, -0.14, -0.43, -0.17, 0.12, 0.09, -0.01, 0.68, 0.42, 0.15, 0.09, -0.17, -0.11, -0.01, 0.09, 0.32, 0.32, -0.07, -0.01, -0.04, -0.04, 0.02, -0.11, 0.25, 0.58, 0.64, 0.12, 0.09, 0.02, -0.01, 0.06, 0.06, 0.12, 0.12, -0.24, -0.37, -0.4, -0.5, -0.37, -0.24, -0.07, 0.45, 0.84, 0.91, 0.74, 0.42, 0.22, 0.12, -0.14, -0.37, -0.43, -0.07, 0.51, 0.51, 0.25, -0.17, -0.43, -0.27, 0.19, 0.32, 0.02, -0.27, -0.14, 0.42, 0.51, 0.12, -0.17, -0.21, 0.19, 0.42, 0.12],
    yValuesR: [1.73, 1.42, 1.65, 1.88, 1.73, 4.07, 4.07, 3.99, 3.39, 3.01, 3.31, 3.76, 0.29, 0.29, 0.14, 0.22, 0.22, 0.22, 0.29, 0.29, 0.14, 0.22, 0.22, 0.22, 0.14, 0.14, 0.07, -0.01, 0.14, 0.29, 0.44, 0.44, 0.44, 0.44, 0.37, 0.07, -0.01, -0.08, -0.01, 0.29, 0.59, 0.82, 1.42, 1.95, 2.41, 1.58, 1.27, 1.05, 1.5, 2.71, 2.41, 1.73, 1.27, 1.12, 0.82, 0.97, 0.82, 0.67, 1.42, 1.12, 1.58, 2.03, 1.73, 0.75, 0.75, 0.52, 0.59, 0.52, 0.37, 0.29, 0.44, 0.82, 0.9, 1.05, 1.88, 2.03, 1.73, 1.58, 1.88, 2.33, 2.56, 2.03, 1.58, 1.27, 1.42, 1.65, 1.12, 0.75, 0.67, 0.59, 0.59, 0.75, 1.12, 1.5, 1.95, 1.42, 1.12, 1.05, 1.12, 1.42, 1.95, 2.25, 2.48, 2.63, 1.27, 1.27, 1.27, 1.42, 1.95, 1.95, 2.71, 2.48, 2.48, 2.56, 2.71, 2.25, 1.8, 1.27, 1.2, 1.27, 1.5, 1.65, 1.12, 0.9, 0.9, 0.9, 0.82, 0.67, 0.75, 0.82, 0.9, 0.9, 0.67, 0.75, 0.9, 0.52, 0.52, 0.67, 0.67, 0.9, 1.2, 1.5, 2.25, 1.35, 0.97, 0.9, 0.59, 0.44, 0.29, 0.22, 0.37, 0.14, 0.14, 0.22, 0.59, 0.82, 1.27, 1.5, 1.73, 1.88, 2.1, 2.48, 2.56, 2.63, 2.56, 2.41, 2.18, 2.03, 0.75, 0.67, 0.59, 0.52, 0.67, 0.67, 0.75, 2.18, 2.71, 3.08, 3.24, 3.16, 2.93, 2.86, 2.78, 2.48, 2.48, 2.86, 2.93, 2.78, 1.95, 1.42, 1.05, 0.82, 0.59, 0.59, 0.82, 0.97, 1.65, 2.25, 2.33, 1.65, 1.5, 2.33, 2.71, 3.01, 2.86, 2.63, 2.56, 2.33, 2.03, 1.58, 1.35, 1.2, 1.5, 1.88, 2.25, 2.56, 2.71, 1.73, 1.12, 0.82, 1.05, 0.97, 0.9, 1.2, 2.03, 2.33, 0.67, 0.75, 1.27, 1.05, 1.05, 1.2, 2.1, 2.18, 2.48, 1.65, 0.75, 0.44, 0.75, 0.97, 0.82, 0.67, 0.82, 0.37, 0.44, 0.75, 0.97, 1.35, 1.95, 2.93, 2.18, 1.73, 1.58, 1.05, 0.82, 0.67, 0.59, 0.37, 0.75, 1.27, 2.18, 2.41, 1.8, 1.35, 0.75, 0.59, 0.75, 1.88, 2.18, 2.48, 1.88, 1.12, 0.82, 0.59, 0.59, 0.67, 1.35, 1.88, 2.33, 2.63, 2.25, 1.5, 1.12, 0.82, 0.67, 2.18, 2.03, 1.58, 1.12, 0.9, 0.44, 0.44, 0.37, 0.59, 0.97, 1.73, 2.63, 3.01, 3.08, 2.41, 1.8, 1.27, 1.12, 1.2, 2.03, 2.78, 2.18, 1.42, 1.2, 1.42, 1.95, 1.73, 0.97, 0.82, 0.97, 1.73, 2.03, 1.35, 0.97, 1.27, 1.8],
    xValuesG: [3, 3.1, 3.16, 3.29, 2.97, 2.93, 3.03, 3.23, 3.33, 3.33, 3.33, 3.33, 3.29, 3.16, 3, 2.77, 2.67, 2.41, 2.21, 1.95, 1.76, 1.85, 2.57, 2.64, 2.7, 2.8, 3.23, 3.46, 3.36, 3.16, 3.06, 2.9, 2.74, 2.67, 2.67, 2.77, 2.9, 3.06, 3.16, 3.06, 3.03, 2.84, 2.74, 2.67, 2.84, 2.93, 3.06, 3.13, 2.97, 2.8, 2.74, 2.61, 2.41, 2.25, 2.18, 2.05, 2.05, 2.28, 2.41, 2.41, 2.44, 2.44, 2.9, 2.21, 1.76, 1.69, 1.69, 1.79, 1.82, 1.92, 1.99, 1.99, 1.69, 1.63, 1.46, 1.3, 1.27, 1.46, 1.33, 1.23, 1.2, 1.49, 1.3, 1.17, 1.27, 1.2, 1.07, 1.1, 1.3, 1.4, 1.53, 1.2, 1.2, 1, 0.81, 1, 1.1, 1.2, 1.1, 0.97,2.38, 2.38, 2.57, 2.38, 2.44, 2.44, 2.41, 2.41, 2.51, 2.51, 2.57, 2.51, 2.57, 2.57, 2.67, 2.64, 2.74, 2.74, 2.77, 2.8, 2.77, 2.77, 2.9, 2.8, 2.64, 2.54, 2.44, 2.44, 2.51, 2.74, 1.69, 1.46, 1.59, 1.63, 1.56, 1.53, 1.56, 1.59, 1.56, 1.36, 1.14, 1.07, 1, 1.04, 1.04, 1.04, 0.91, 0.84, 0.78, 1.17, 1.33, 1.4, 1.53, 1.43, 1.36, 1.46, 1.46, 1.72, 1.76, 1.76, 1.99, 1.92, 1.85, 1.79, 1.76, 1.85, 1.99, 1.95, 1.85, 1.76, 1.99, 1.79, 1.85, 1.99, 2.05, 1.95, 1.89, 1.72, 1.66, 1.56, 1.49, 1.63, 1.76, 1.76, 1.43, 1.4, 1.3, 1.23, 1.33, 1.59, 1.76, 1.95, 2.25, 2.35, 2.44, 2.35, 2.35, 2.64, 2.67, 2.77, 1.33, 1.3, 1.36, 1.3, 0.94, 0.84, 0.94, 0.84, 0.81, 0.78, 0.97, 1.04, 1.14, 1.2, 1.36, 1.49, 1.49, 1.46, 1.4, 1.49, 1.2, 1.23, 1.3, 1.3, 1.46, 1.4, 1.59, 1.72, 1.79, 1.79, 1.82, 1.82, 1.69, 1.66, 1.85, 1.89, 1.72, 1.66, 1.59, 1.56, 1.43, 1.36, 1.4, 1.4, 1.27, 1.27, 0.94, 0.84, 0.81, 0.84, 0.97, 1.2, 1.27, 1.2, 1.43, 1.66, 1.63, 1.49, 1.33, 1.04, 0.91, 0.81, 1.07, 1.2, 1.33, 1.33, 1.46, 1.3, 1.36, 1.56, 1.59, 1.53, 1.59, 1.76, 1.82, 1.85, 2.15, 2.18, 1.92, 1.63, 1.27, 1.14, 1.1, 0.28, 0.38, 0.35, 0.28, 0.55, 0.48, 0.35, 0.55, 0.45, 0.64, 0.51, 0.68, 0.45, 0.51, 0.48, 0.94, 0.91, 0.74, 0.48, 0.42, 0.87, 1.17, 1.2, 0.81, 0.91, 1.2, 1, 1.63, 1.07, 0.87, 1.69, 0.87, 0.74, 1, 0.68, 0.61, 0.68, 0.38, 0.48, 0.28, 0.32, 0.48, 0.22, 0.15, 0.71, 0.45, 0.51, 0.58, 0.68, 1.23, 1.33, 1, 1.3, 1.1, 0.78, 0.45, 0.48, 0.74, 0.97, 1.23, 1.49, 1, 0.94, 0.78, 1.17, 0.94, 0.91, 0.12, 0.19, 0.68, 0.42, 0.38, 0.94, 1.23, 0.91, 0.71, 0.55, 0.68, 0.74, 0.71, 0.81, 0.87, 0.87, 0.81, 0.81, 0.78, 0.81, 0.71, 0.68, 0.78, 0.94, 1, 1, 0.84, 0.78, 0.87, 0.87, 0.81, 0.74, 0.87, 0.94, 0.87, 0.68, 0.64, 0.78, 0.78, 0.94, 1, 0.87, 0.84, 1.1, 1.1, 1.07, 1.2, 1, 0.81, 0.74, 0.68, 0.61, 0.55, 0.45, 0.58, 0.58, 0.48, 0.58, 0.68, 0.68, 0.94, 0.87, 0.74, 0.74, 0.81, 0.94, 1.04, 0.74, 0.81, 0.94, 0.94, 1.46, 1.4, 1.36, 1.36, 1.43, 1.53, 1.46, 1.43, 1.59, 1.72, 1.85, 1.82, 1.69, 1.85, 1.95, 1.72, 1.82, 1.95, 1.79, 1.63, 1.99, 1.76, 2.28, 2.38, 2.31, 2.57, 2.38, 2.35, 2.38, 2.18, 2.02, 2.28, 2.15, 1.92, 2.15, 2.38, 2.25, 1.69, 1.66, 1.92, 1.63, 1.69, 1.79, 1.46, 1.27, 2.08, 1.49, 1.23, 1.14, 1.17, 1.2, 1.2, 1.23, 1.17, 1.14, 1.04, 0.97, 1, 1.17, 1.33, 1.43, 1.23, 1.1, 0.91, 0.81, 1.07, 1.33, 1.33, 1.46, 1.49, 1.36, 1.23, 1.3, 1.49, 1.63, 1.76, 1.89, 2.15, 2.48, 2.7, 2.8, 2.54, 2.08, 1.82, 1.4, 1.2, 1.33, 2.08, 1.99, 2.25, 2.28, 1.85, 1.69, 1.95, 2.02, 1.59, 1.95, 1.85, 1.49, 1.36, 1.53, 1.1, 0.45, 0.51, 0.71, 1.1, 1.1, 0.64, 0.64, 0.94, 1.07, 1.17, 1.3, 1.36, 1.33, 1.14, 1.17, 1.53, 1.49, 2.08, 2.08, 1.72, 1.43, 2.25, 2.41, 2.05, 1.85, 1.49, 1.36, 1.59, 1.89, 1.76, 1.66, 2.7, 2.41, 1.92, 1.36, 1.1, 1.04, 0.97, 0.58, 0.45, 0.58, 0.91, 1.14, 1.36, 1.56, 1.69, 1.72, 1.69, 1.95, 2.15, 2.35, 2.7, 2.84, 2.54, 1.66, 1.56, 1.43, 1.17, 1.23, 1.07, 1.43, 1.66],
    yValuesG: [0.44, 0.59, 0.67, 0.75, 0.59, 0.52, 0.59, 0.75, 0.82, 0.67, 0.52, 0.22, -0.01, -0.01, 0.44, 0.44, 0.14, -0.16, -0.31, -0.31, -0.31, -0.46, -0.54, -0.39, 0.22, 0.52, 0.67, 0.52, 0.14, 0.07, -0.01, -0.08, -0.08, -0.16, -0.24, -0.08, 0.14, 0.29, 0.29, 0.44, 0.52, 0.44, 0.44, 0.52, 0.52, 0.52, 0.67, 0.59, 0.44, 0.37, 0.37, 0.07, -0.24, -0.31, -0.24, -0.24, -0.24, -0.24, -0.16, 0.22, 0.52, 0.67, 0.29, 0.97, 1.2, 1.2, 1.27, 1.58, 1.73, 1.95, 2.25, 2.41, 2.86, 3.08, 3.69, 3.76, 3.46, 3.61, 3.76, 3.84, 3.46, 3.39, 3.84, 3.39, 3.01, 2.71, 2.63, 2.41, 2.33, 1.2, 0.9, 1.35, 1.73, 2.18, 2.56, 2.56, 2.56, 2.41, 2.18, 1.95,4.22, 4.22, 4.07, 4.22, 4.29, 4.29, 3.99, 3.99, 4.14, 3.99, 3.99, 3.54, 3.69, 3.76, 3.69, 3.46, 3.16, 3.54, 3.08, 3.08, 3.31, 3.39, 3.16, 3.16, 3.61, 3.84, 4.07, 4.59, 4.07, 3.54, 1.88, 2.86, 3.24, 2.93, 2.86, 3.16, 3.31, 2.71, 2.48, 3.24, 3.31, 3.08, 2.93, 3.24, 3.46, 3.31, 3.01, 3.16, 3.16, 2.48, 1.95, 1.42, 1.05, 1.73, 1.8, 1.42, 1.65, 1.27, 0.75, 0.44, 0.9, 1.05, 1.42, 2.03, 2.33, 2.18, 1.73, 1.65, 2.25, 2.56, 2.03, 2.25, 2.41, 1.8, 1.58, 1.5, 0.52, 0.22, -0.16, -0.08, -0.08, -0.08, -0.16, -0.24, 0.14, 0.14, -0.08, 0.14, -0.16, -0.46, -0.31, -0.01, 0.07, 0.07, 0.37, 0.75, 0.22, 0.37, 0.44, 0.67, 3.16, 2.78, 2.56, 3.24, 3.39, 3.54, 3.69, 3.76, 3.69, 3.54, 3.99, 3.92, 3.99, 4.07, 3.92, 3.92, 4.52, 4.52, 3.61, 3.31, 2.86, 2.48, 2.1, 1.95, 2.63, 3.31, 3.76, 3.61, 3.31, 2.93, 2.63, 2.78, 3.46, 3.76, 3.16, 2.78, 2.71, 3.24, 3.69, 3.84, 3.99, 3.01, 2.41, 2.33, 3.31, 3.69, 3.84, 3.69, 3.46, 3.76, 4.07, 4.14, 3.69, 2.86, 2.63, 3.16, 3.61, 4.07, 4.29, 3.76, 3.54, 3.39, 2.78, 2.1, 1.5, 1.35, 1.95, 2.03, 1.73, 1.73, 2.03, 2.03, 1.42, 1.05, 0.75, 0.44, 0.52, 1.05, 1.65, 2.33, 3.01, 3.46, 3.61, 1.88, 2.33, 2.48, 2.03, 2.33, 2.18, 2.03, 2.25, 1.8, 1.95, 1.65, 1.88, 1.5, 1.5, 1.2, 1.12, 1.05, 1.42, 1.65, 1.58, 1.2, 0.9, 0.82, 0.82, 0.9, 0.97, 0.9, 0.75, 0.9, 0.97, 0.82, 0.82, 0.9, 1.65, 1.88, 1.12, 1.88, 2.1, 1.8, 2.48, 1.88, 2.71, 2.48, 2.03, 1.5, 1.12, 1.88, 1.88, 1.5, 1.12, 0.75, 0.9, 0.67, 0.75, 1.12, 1.58, 1.95, 2.33, 1.12, 0.82, 0.59, 1.2, 1.5, 1.65, 0.97, 0.9, 1.35, 1.88, 2.1, 2.18, 2.33, 1.8, 1.05, 0.9, 1.27, 1.73, 2.25, 2.18, 1.8, 1.88, 1.88, 1.88, 1.88, 1.95, 2.1, 2.25, 2.33, 2.63, 2.63, 2.33, 2.25, 2.03, 2.25, 2.48, 2.78, 2.86, 3.01, 3.01, 2.86, 2.41, 2.78, 2.86, 2.86, 2.56, 2.18, 2.03, 1.88, 2.03, 2.48, 2.86, 2.86, 2.41, 2.1, 2.1, 2.63, 2.33, 2.63, 2.63, 2.71, 2.93, 3.16, 3.24, 3.46, 3.16, 2.78, 2.48, 2.1, 2.03, 2.33, 2.71, 2.86, 2.03, 1.95, 2.1, 2.63, 2.56, 2.1, 2.03, 0.44, 0.59, 0.44, 0.59, 0.67, 0.9, 0.97, 0.75, 0.52, 0.14, 0.37, 0.75, 0.97, 0.37, 0.67, 0.75, 0.07, 0.52, 0.75, 0.22, 0.67, 0.97, 0.52, 0.82, 0.59, 1.12, 1.5, 0.97, 1.27, 1.58, 1.12, 1.2, 1.88, 1.73, 1.12, 1.27, 1.8, 2.03, 1.95, 2.56, 2.63, 2.25, 2.63, 2.86, 2.41, 2.1, 2.33, 2.1, 1.65, 1.5, 1.35, 1.2, 1.05, 1.27, 1.42, 1.58, 1.42, 1.27, 1.12, 1.2, 1.2, 1.73, 1.88, 1.65, 1.5, 1.27, -0.24, -0.24, -0.24, -0.16, 0.29, 0.22, 0.14, -0.16, -0.31, -0.39, -0.39, -0.39, -0.54, -0.01, 0.14, -0.08, -0.08, 0.14, 0.22, 0.52, 0.97, 0.82, 0.59, 0.59, 1.27, 1.65, 1.35, 1.12, 2.03, 2.25, 1.27, 1.95, 2.25, 1.58, 1.35, 1.65, 2.33, 2.63, 3.24, 2.93, 3.61, 3.92, 3.24, 3.31, 3.92, 3.92, 3.61, 4.22, 5.05, 5.35, 4.67, 3.54, 1.95, 1.42, 1.05, 2.18, 2.86, -0.01, -0.01, 1.2, 1.95, 2.41, 2.25, 1.58, 1.12, 1.35, 1.73, -0.01, -0.24, -0.24, -0.24, 0.37, 0.75, 1.5, 2.1, 3.08, 3.84, 4.52, 5.35, 5.27, 4.97, 4.59, 4.22, 3.92, 2.78, 2.41, 2.03, 1.42, 0.9, 0.44, 0.52, 0.97, 2.1, 2.93, 3.69, 2.56, 1.2, 0.82],
    xValuesB: [2.44, 2.41, 2.41, 2.41, 2.44, 2.48, 2.54, 2.61, 2.61, 2.7, 2.74, 2.9, 3.03, 3.1, 3.2, 3.33, 3.39, 3.46, 3.65, 3.82, 3.69, 3.39, 3.16, 3.1, 2.93, 2.44, 2.38, 2.51, 3, 3.13, 2.9, 2.57, 2.44, 2.61, 2.84, 3.03, 3, 2.84, 0.02, -0.07, -0.01, 0.15, 0.09, 0.48, -0.04, -0.37, -0.47, -0.07, -0.01, 0.15, 0.12, 0.06, -0.04, 0.09, 0.06, 0.09, 0.35, 1.07, 1.27, 2.05, 2.18, 1.82, 1.2, 0.78, 0.51, 0.48, 0.09, 0.02, -0.04, 0.12, 0.09, 0.06, 0.09, -0.07, 0.22, 0.15, 0.09, 0.15, 0.06, -0.14, 0.12, 0.22, 0.48, 0.61, 1.2, 1.4, 1.49, 1.79, 1.95, 2.05, 1.4, 1.14, 0.87, 0.55, 0.45, 0.38, 0.51, 0.68, 0.78, 0.87, 0.61, 0.42, 0.38, 0.38, 0.42, 0.58, 0.87, 1.4, 1.66, 2.08, 2.35, 2.44, 2.31, 1.82, 2.05, 2.57, 2.48, 2.38, 2.15, 1.92, 2.35, 2.7, 2.57, 0.48, 0.51, 0.58, 0.35, 0.35, 0.51, 0.61, 0.61, 0.55, 1, 0.97, 0.74, 0.71, 0.55, 0.48, 0.45, 0.42, 0.45, 0.51, 0.55, 0.45, 0.42, 0.32, 0.28, 0.25, 0.25, 0.25, 0.32, 0.38, 0.42, 0.35, 0.38, 0.51, 0.48, 0.38, 0.45, 0.58, 0.58, 0.55, 0.55, 0.74, 1.1, 1.36, 1.2, 1, 0.91, 1.69, 1.72, 1.59, 1.59, 1.76, 1.89, 1.99, 1.99, 1.49, 1.23, 0.87, 0.87, 1.56, 1.72, 1.99, 1.89, 1.79, 2.05, 2.05, 1.92, 1.95, 1.95, 0.25, 0.22, 0.45, 0.68, 0.64, 0.61, 0.61, 0.87, 0.64, 1.1, 1.27, 0.97, 0.97, 1.76, 1.49, 2.31, 2.15, 2.05, 2.31, 2.18, 2.02, 2.25, 2.48, 2.77, 2.84, 2.97, 2.7, 2.21, 2.08, 2.28, 2.61, 2.38, 2.12, 2.02, 2.54, 2.77, 2.35, 2.15, 2.25, 2.18, 2.64, 3.13, 2.44, 2.21, 2.18, 2.48, 2.64, 2.77, 2.87, 2.25, 1.92, 2.08, 2.61, 2.64, 2.67, 2.15, 2.02, 2.12, 2.48, 2.44, 2.31, 2.02, 2.05, 2.64, 0.19, 0.22, 0.38, 0.48, 2.54, 2.77, 2.93, 3, 3.06, 3.06, 2.9, 2.87, 2.97, 3.1, 3.36, 3.72, 3.49, 2.87, 2.18, 1.89, 2.61, 2.67, 2.7, 2.12, 2.08, 1.66, 1.4, 1.04, 0.78, 0.42, 0.71, 1.04, 1.76],
    yValuesB: [2.1, 1.8, 1.65, 1.42, 1.27, 1.12, 1.05, 1.05, 1.05, 0.97, 0.97, 0.97, 0.97, 0.97, 1.12, 1.35, 1.35, 1.27, 1.12, 1.12, 1.5, 1.73, 1.88, 2.03, 2.25, 2.33, 2.48, 1.95, 1.73, 1.5, 1.95, 2.18, 1.73, 1.35, 1.2, 1.35, 1.8, 2.03, 3.61, 3.84, 4.37, 4.59, 5.35, 5.5, 5.42, 5.35, 5.2, 5.12, 5.2, 5.5, 5.27, 4.22, 3.92, 4.44, 5.27, 5.35, 5.35, 5.42, 5.5, 5.42, 5.42, 5.42, 5.35, 5.35, 5.35, 4.97, 4.37, 4.14, 3.84, 4.75, 5.05, 5.12, 4.37, 4.14, 5.35, 5.42, 5.12, 4.29, 3.39, 4.29, 4.67, 4.97, 5.27, 5.35, 5.35, 5.42, 5.5, 5.5, 5.42, 5.27, 5.12, 5.05, 4.82, 4.52, 4.07, 3.84, 3.99, 4.52, 4.75, 4.9, 4.97, 4.52, 4.07, 3.84, 4.29, 4.52, 4.75, 4.75, 4.82, 4.82, 4.59, 4.75, 4.97, 5.05, 4.82, 4.67, 4.75, 5.12, 5.2, 5.2, 5.05, 4.75, 4.67, 4.37, 4.37, 4.82, 4.37, 4.14, 4.22, 4.52, 4.75, 4.97, 4.97, 4.9, 4.59, 4.44, 4.07, 3.84, 3.31, 3.24, 3.31, 3.92, 4.22, 3.84, 3.69, 3.84, 3.84, 3.46, 3.76, 3.92, 3.69, 3.46, 3.61, 3.84, 4.22, 4.52, 4.75, 4.37, 3.99, 4.29, 4.67, 4.75, 4.9, 5.12, 5.2, 5.2, 4.97, 5.05, 5.05, 4.9, 4.75, 4.67, 4.75, 4.59, 4.75, 4.97, 5.05, 5.12, 4.97, 4.9, 5.05, 4.97, 5.2, 5.12, 4.75, 4.37, 3.99, 3.54, 3.69, 4.37, 4.9, 3.31, 3.01, 3.08, 3.92, 5.12, 4.9, 3.84, 4.22, 5.2, 5.5, 4.59, 4.75, 5.35, 5.35, 5.35, 5.2, 5.5, 4.82, 4.29, 3.31, 4.52, 4.82, 4.44, 4.37, 3.54, 3.08, 2.86, 4.07, 4.22, 2.41, 2.03, 3.24, 3.76, 4.22, 2.78, 2.56, 3.39, 4.14, 4.37, 3.24, 2.63, 2.63, 4.37, 5.35, 3.54, 3.16, 2.71, 2.56, 3.39, 4.75, 4.82, 3.01, 2.71, 2.41, 2.33, 3.92, 4.22, 2.71, 2.41, 3.24, 4.37, 4.75, 3.76, 3.01, 4.07, 4.29, 4.82, 5.35, 5.35, 4.59, 4.22, 3.69, 3.24, 2.78, 2.1, 1.42, 0.97, 1.05, 1.12, 0.75, 0.29, 0.14, 0.29, -0.01, 0.82, 1.8, 2.78, 4.22, 4.97, 5.05, 4.67, 4.37, 4.22, 3.92, 5.05, 5.42, 5.2]
};
