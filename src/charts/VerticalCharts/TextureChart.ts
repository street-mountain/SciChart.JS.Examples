import { chartBuilder } from "scichart/Builder/chartBuilder";
import { LegendModifier } from "scichart/Charting/ChartModifiers/LegendModifier";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { ELegendPlacement, ELegendOrientation, TLegendItem } from "scichart/Charting/Visuals/Legend/SciChartLegendBase";
import { NumberRange } from "scichart/Core/NumberRange";
import { Thickness } from "scichart/Core/Thickness";
import { ESeriesType } from "scichart/types/SeriesType";
import { RangeFillPaletteProvider, PaletteRange } from "./RangeFillPaletteProvider";
import { getCommonChartConfigs, getCommonChartModifiersConfig, getParsedData } from "./utils";
import {
    LegendTextColor,
    TextureFill,
    TextureLine,
    TexturePalette1,
    TexturePalette2,
    TexturePalette3,
    theme
} from "../../theme";

export const drawTextureChart = async () => {
    const { sciChartSurface, wasmContext } = await chartBuilder.build2DChart("texture-chart", {
        ...getCommonChartConfigs("Texture"),
        modifiers: getCommonChartModifiersConfig(),
        surface: {
            theme: { type: theme.type },
        }
    });

    sciChartSurface.yAxes.get(0).visibleRange = new NumberRange(-5, 30);

    const dataSeries1 = new XyDataSeries(wasmContext, { dataIsSortedInX: true, containsNaN: false });
    const dataSeries2 = new XyDataSeries(wasmContext, { dataIsSortedInX: true, containsNaN: false });

    const data = await getParsedData("Texture.csv");
    data.forEach((dataRow) => {
        const x = dataRow[0];
        dataSeries1.append(x, dataRow[1]);
        dataSeries2.append(x, 0);
    });

    const rangePaletteProvider = new RangeFillPaletteProvider([
        new PaletteRange(8, 8, TexturePalette1),
        new PaletteRange(18, 22, TexturePalette2),
        new PaletteRange(22, 25, TexturePalette1),
        new PaletteRange(25, 26, TexturePalette2),
        new PaletteRange(29, 29, TexturePalette2),
        new PaletteRange(40, 40, TexturePalette3),
        new PaletteRange(50, 55, TexturePalette3),
        new PaletteRange(55, 58, TexturePalette2),
        new PaletteRange(70, 75, TexturePalette1),
        new PaletteRange(75, 76, TexturePalette3),
        new PaletteRange(85, 97, TexturePalette2)
    ]);

    const renderableSeries = chartBuilder.buildSeries(wasmContext, [
        {
            type: ESeriesType.MountainSeries,
            options: {
                dataSeries: dataSeries1,
                paletteProvider: rangePaletteProvider,
                isDigitalLine: true,
                strokeThickness: 0,
                fill: TextureFill,
            }
        },
        {
            type: ESeriesType.LineSeries,
            options: {
                dataSeries: dataSeries2,
                strokeThickness: 4,
                stroke: TextureLine,
            }
        },
    ]);

    renderableSeries[0].rolloverModifierProps.showRollover = false;
    renderableSeries[1].rolloverModifierProps.showRollover = false;

    sciChartSurface.renderableSeries.add(...renderableSeries);

    const legendModifier = new LegendModifier({ placementDivId: `texture-legend` });
    legendModifier.sciChartLegend.getLegendHTML = generateTextureLegend;
    sciChartSurface.chartModifiers.add(legendModifier);

    return sciChartSurface;
};

const generateTextureLegend = (
    placement: ELegendPlacement,
    textColor: string,
    backgroundColor: string,
    margin: Thickness,
    orientation: ELegendOrientation,
    showCheckboxes: boolean,
    showSeriesMarkers: boolean,
    items: TLegendItem[]
): string => {
    return `
    <div class="chart-legend full-size-legend" style="color: ${LegendTextColor};">
        <div class="legend-color-item">
            <div class="color-label" style="background-color: ${TextureLine};"></div>
            <div class="color-label" style="background-color: ${TexturePalette2};"></div>
        </div>
        <div class="legend-text-item">
            <span>${"MUD"}</span>
            <span>${"GRAIN"}</span>
        </div>
        <div class="legend-color-item">
            <div class="color-label" style="background-color: ${TexturePalette1};"></div>
            <div class="color-label" style="background-color: ${TexturePalette3};"></div>
        </div>
        <div class="legend-text-item">
            <span>${"SAND"}</span>
            <span>${"GRAVEL"}</span>
        </div>
    </div>
    `;
};
