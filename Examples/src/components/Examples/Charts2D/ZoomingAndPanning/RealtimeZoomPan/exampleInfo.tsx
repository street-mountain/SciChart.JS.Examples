import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import * as React from "react";
import { ExampleStrings } from "../../../ExampleStrings";

import verticalChart from "../../ModifyAxisBehavior/VerticalCharts/javascript-vertical-charts.jpg";
import dragAxisChart from "../DragAxisToScale/drag-axis-on-javascript-charts-to-scale-or-pan.jpg";
import secondaryYAxis from "../../ModifyAxisBehavior/SecondaryYAxes/javascript-chart-with-secondary-y-axis.jpg";
import { TDocumentationLink } from "../../../../../helpes/types/ExampleDescriptionTypes";
import { GalleryItem } from "../../../../../helpes/types/types";
import Gallery from "../../../../Gallery/Gallery";
import ExampleDescription from "../../../../ExampleDescription/ExampleDescription";

const previewDescription = `This examples shows how to add zooming and panning behaviour to a realtime JavaScript Chart.`;
const description = `When you use AutoRanging in a SciChart.js chart, the chart will always automatically range to fit the data.{" "}
This means that zoom, pan modifiers will not work on the chart. In order to allow both behaviors, this
example demonstrates how to use the ZoomState property to determine when to zoom to fit, or when to allow
user zooming.`;
const tips = [
    `Check in the source-code for how we use the SciChartSurface.ZoomState property to determine when to scroll
and when to allow user-zooming.`
];

const documentationLinks: TDocumentationLink[] = [
    {
        href: ExampleStrings.urlDocumentationHome,
        title: ExampleStrings.titleDocumentationHome,
        linkTitle: "SciChart.js Documentation Home"
    },
    {
        href: ExampleStrings.urlTutorialsHome,
        title: ExampleStrings.titleTutorialsHome,
        linkTitle: "SciChart.js Tutorials"
    }
];

const seeAlso: GalleryItem[] = [
    {
        chartGroupTitle: "See also",
        items: [
            {
                imgPath: secondaryYAxis,
                title: ExampleStrings.titleSecondaryYAxis,
                seoTitle: ExampleStrings.urlTitleSecondaryYAxis,
                examplePath: ExampleStrings.urlSecondaryYAxis
            },
            {
                imgPath: dragAxisChart,
                title: ExampleStrings.titleDragAxisToScale,
                seoTitle: ExampleStrings.titleDragAxisToScale,
                examplePath: ExampleStrings.urlDragAxisToScale
            },
            {
                imgPath: verticalChart,
                title: ExampleStrings.titleVerticalCharts,
                seoTitle: ExampleStrings.urlTitleVerticalCharts,
                examplePath: ExampleStrings.urlVerticalCharts
            }
        ]
    }
];

const SeeAlsoComponent = () => <Gallery examples={seeAlso} />;

const Subtitle = () => (
    <p>
        Zoom the real-time chart below by dragging on the surface. Then double-click to reset zoom and start
        automatically scrolling again.
    </p>
);

const Description = () => (
    <div>
        <ExampleDescription
            previewDescription={previewDescription}
            documentationLinks={documentationLinks}
            tips={tips}
            description={description}
        />
    </div>
);

export const realtimeZoomPanExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleRealtimeZoomPan,
    path: ExampleStrings.urlRealtimeZoomPan,
    subtitle: Subtitle,
    description: Description,
    seeAlso: SeeAlsoComponent,
    code,
    githubUrl,
    seoDescription:
        "Demonstrates how to zoom and pan a realtime JavaScript Chart while it is updating, with SciChart.js ZoomState API",
    seoKeywords: "drag, axis, scale, javascript, webgl, canvas",
    thumbnailImage: "zoom-and-pan-a-realtime-javascript-chart.jpg"
};
