import * as React from "react";
import { TExampleInfo } from "../../../../AppRouter/examplePages";
import { code } from "./GENERATED_SRC";
import { githubUrl } from "./GENERATED_GITHUB_URL";
import { ExampleStrings } from "../../../ExampleStrings";
import { GalleryItem } from "../../../../../helpers/types/types";
import { TDocumentationLink } from "../../../../../helpers/types/ExampleDescriptionTypes";

const description = `An Impulse Chart (otherwise known as Stem Chart, Lollipop Chart) displays a single point at the top of a thin stem.
    In SciChart.js these can be customised with different color points or shapes.`;
const tips = [
    `To change the size of the impulse point, set the size property. Default value is 10.0.`
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
    },
    {
        href: ExampleStrings.urlImpulseChartDocumentation,
        title: ExampleStrings.urlTitleImpulseChartDocumentation,
        linkTitle: "JavaScript Impulse Chart Documentation"
    },
    {
        href: ExampleStrings.urlRenderSeriesPropertiesDocumentation,
        title: ExampleStrings.urlTitleRenderSeriesProperties,
        linkTitle: "Common RenderableSeries Properties"
    }
];

const seeAlso: GalleryItem[] = [
    {
        chartGroupTitle: "See also",
        items: [
            {
                imgPath: ExampleStrings.imgColumnChart,
                title: ExampleStrings.titleColumnChart,
                seoTitle: ExampleStrings.urlTitleColumnChart,
                examplePath: ExampleStrings.urlColumnChart
            },
            {
                imgPath: ExampleStrings.imgStackedColumnChart,
                title: ExampleStrings.titleStackedColumnChart,
                seoTitle: ExampleStrings.urlTitleStackedColumnChart,
                examplePath: ExampleStrings.urlStackedColumnChart
            },
            {
                imgPath: ExampleStrings.imgGroupedColumnChart,
                title: ExampleStrings.titleGroupedColumnChart,
                seoTitle: ExampleStrings.urlTitleGroupedColumnChart,
                examplePath: ExampleStrings.urlGroupedColumnChart
            }
        ]
    }
];

const Subtitle = () => (
    <p>
        Use this demonstration to learn how to create a <strong>JavaScript Impulse Chart</strong> using SciChart.js, our own High Performance{" "}
        <a href={ExampleStrings.urlJavascriptChartFeatures} target="_blank" title="JavaScript Chart Library">
            JavaScript Chart Library
        </a>.
    </p>
);

export const impulseChartExampleInfo: TExampleInfo = {
    title: ExampleStrings.titleImpulseChart,
    pageTitle: ExampleStrings.pageTitleImpulseChart,
    path: ExampleStrings.urlImpulseChart,
    subtitle: Subtitle,
    documentationLinks,
    tips,
    description,
    seeAlso,
    code,
    githubUrl,
    metaDescription:
        "Demonstrates how to create a JavaScript Impulse Chart. Impulse are rendered with a fill and size properties",
    metaKeywords: "impulse, lollipop, javascript, webgl, canvas",
    thumbnailImage: "javascript-impulse-chart.jpg"
};
