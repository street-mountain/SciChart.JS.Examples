async function simpleStackedColumnChart(divElementId) {
  // #region ExampleA
  // Demonstrates how to create a Column chart with SciChart.js
  const {
    SciChartSurface,
    NumericAxis,
    StackedColumnRenderableSeries,
    StackedColumnCollection,
    XyDataSeries,
    SciChartJsNavyTheme
  } = SciChart;

  // or, for npm, import { SciChartSurface, ... } from "scichart"

  const { wasmContext, sciChartSurface } = await SciChartSurface.create(divElementId, {
    theme: new SciChartJsNavyTheme()
  });
  sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
  sciChartSurface.yAxes.add(new NumericAxis(wasmContext));

  // Data for the example
  const xValues = [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003];
  const yValues1 = [10, 13, 7, 16, 4, 6, 20, 14, 16, 10, 24, 11];
  const yValues2 = [12, 17, 21, 15, 19, 18, 13, 21, 22, 20, 5, 10];
  const yValues3 = [7, 30, 27, 24, 21, 15, 17, 26, 22, 28, 21, 22];
  const yValues4 = [16, 10, 9, 8, 22, 14, 12, 27, 25, 23, 17, 17];
  const yValues5 = [7, 24, 21, 11, 19, 17, 14, 27, 26, 22, 28, 16];

  // Create some RenderableSeries - for each part of the stacked column
  // Notice the stackedGroupId. This defines if series are stacked (same), or grouped side by side (different)
  const rendSeries1 = new StackedColumnRenderableSeries(wasmContext, {
    dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues1, dataSeriesName: "EU" }),
    fill: "#882B91",
    stroke:"#E4F5FC",
    strokeThickness: 2,
    opacity: 0.8,
    stackedGroupId: "StackedGroupId"
  });

  const rendSeries2 = new StackedColumnRenderableSeries(wasmContext, {
    dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues2, dataSeriesName: "Asia" }),
    fill: "#EC0F6C",
    stroke: "#E4F5FC",
    strokeThickness: 2,
    opacity: 0.8,
    stackedGroupId: "StackedGroupId"
  });

  const rendSeries3 = new StackedColumnRenderableSeries(wasmContext, {
    dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues3, dataSeriesName: "USA" }),
    fill: "#F48420",
    stroke: "#E4F5FC",
    strokeThickness: 2,
    opacity: 0.8,
    stackedGroupId: "StackedGroupId"
  });

  const rendSeries4 = new StackedColumnRenderableSeries(wasmContext, {
    dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues4, dataSeriesName: "UK" }),
    fill: "#50C7E0",
    stroke: "#E4F5FC",
    strokeThickness: 2,
    opacity: 0.8,
    stackedGroupId: "StackedGroupId",
  });

  const rendSeries5 = new StackedColumnRenderableSeries(wasmContext, {
    dataSeries: new XyDataSeries(wasmContext, { xValues, yValues: yValues5, dataSeriesName: "Latam" }),
    fill: "#30BC9A",
    stroke: "#E4F5FC",
    strokeThickness: 2,
    opacity: 0.8,
    stackedGroupId: "StackedGroupId"
  });

  // To add the series to the chart, put them in a StackedColumnCollection
  const stackedColumnCollection = new StackedColumnCollection(wasmContext);
  stackedColumnCollection.dataPointWidth = 0.6;
  stackedColumnCollection.add(rendSeries1, rendSeries2, rendSeries3, rendSeries4, rendSeries5);

  // Add the Stacked Column collection to the chart
  sciChartSurface.renderableSeries.add(stackedColumnCollection);
  // #endregion

  // Optional: add zooming, panning for the example
  const { MouseWheelZoomModifier, ZoomPanModifier, ZoomExtentsModifier } = SciChart;
  sciChartSurface.chartModifiers.add(new MouseWheelZoomModifier(), new ZoomPanModifier, new ZoomExtentsModifier());
};

simpleStackedColumnChart("scichart-root");





async function builderExample(divElementId) {
  // #region ExampleB
  // Demonstrates how to create a Column chart with SciChart.js using the Builder API
  const {
    chartBuilder,
    ESeriesType,
    EThemeProviderType
  } = SciChart;

  // or, for npm, import { chartBuilder, ... } from "scichart"

  // Data for the example
  const xValues = [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003];
  const yValues1 = [10, 13, 7, 16, 4, 6, 20, 14, 16, 10, 24, 11];
  const yValues2 = [12, 17, 21, 15, 19, 18, 13, 21, 22, 20, 5, 10];
  const yValues3 = [7, 30, 27, 24, 21, 15, 17, 26, 22, 28, 21, 22];
  const yValues4 = [16, 10, 9, 8, 22, 14, 12, 27, 25, 23, 17, 17];
  const yValues5 = [7, 24, 21, 11, 19, 17, 14, 27, 26, 22, 28, 16];

  const { wasmContext, sciChartSurface } = await chartBuilder.build2DChart(divElementId, {
    surface: { theme: { type: EThemeProviderType.Dark } },
    series: [
      // Group StackedColumn into one StackedColumnCollection and pass into the series object
      {
        type: ESeriesType.StackedColumnCollection,
        series: [
          {
            type: ESeriesType.StackedColumnSeries,
            options: { stackedGroupId: "StackedGroupId", fill: "#882B91", stroke: "#E4F5FC" },
            xyData: { xValues, yValues: yValues1 }
          },
          {
            type: ESeriesType.StackedColumnSeries,
            options: { stackedGroupId: "StackedGroupId", fill: "#EC0F6C", stroke: "#E4F5FC" },
            xyData: { xValues, yValues: yValues2 }
          },
          {
            type: ESeriesType.StackedColumnSeries,
            options: { stackedGroupId: "StackedGroupId", fill: "#F48420", stroke: "#E4F5FC" },
            xyData: { xValues, yValues: yValues3 }
          },
          {
            type: ESeriesType.StackedColumnSeries,
            options: { stackedGroupId: "StackedGroupId", fill: "#50C7E0", stroke: "#E4F5FC" },
            xyData: { xValues, yValues: yValues4 }
          },
          {
            type: ESeriesType.StackedColumnSeries,
            options: { stackedGroupId: "StackedGroupId", fill: "#30BC9A", stroke: "#E4F5FC" },
            xyData: { xValues, yValues: yValues5 }
          }
        ]
      },
    ]
  });
  // #endregion
};



if (location.search.includes("builder=1"))
builderExample("scichart-root");
