import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";

const DemoColumn = () => {
    var data = [
        {
            label: "Abrasilense",
            name: "Good",
            percentage: 2
        },
        {
            label: "Azospirillum, Brasilense",
            name: "Good",
            percentage: 18
        },
        {
            label: "Bacillus, megaterium",
            name: "Good",
            percentage: 14
        },
        {
            label: "psuedomonas,fluorescens",
            name: "Good",
            percentage: 4
        },
        {
            label: "Sacchromyces, boulardii",
            name: "Good",
            percentage: 3
        },
        {
            label: "salmonella H, antigen",
            name: "Good",
            percentage: 15
        },
        {
            label: "Trichoderma, viride",
            name: "Good",
            percentage: 3
        },
        {
            label: "Abrasilense",
            name: "Contaminated",
            percentage: 1
        },
        {
            label: "Azospirillum, Brasilense",
            name: "Contaminated",
            percentage: 10
        },
        {
            label: "Bacillus, megaterium",
            name: "Contaminated",
            percentage: 8
        },
        {
            label: "psuedomonas,fluorescens",
            name: "Contaminated",
            percentage: 2
        },
        {
            label: "Sacchromyces, boulardii",
            name: "Contaminated",
            percentage: 3
        },
        {
            label: "salmonella H, antigen",
            name: "Contaminated",
            percentage: 5
        },
        {
            label: "Trichoderma, viride",
            name: "Contaminated",
            percentage: 1
        }
    ];
    var config = {
        data: data,
        isGroup: true,
        xField: "label",
        yField: "percentage",
        seriesField: "name",
        label: {
            position: "middle",
            layout: [
                { type: "interval-adjust-position" },
                { type: "interval-hide-overlap" },
                { type: "adjust-color" }
            ]
        }
    };
    return <Column {...config} />;
};

export default DemoColumn;
