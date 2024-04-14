<script setup>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { shallowRef, onMounted } from 'vue';

let root;
const chartdiv = shallowRef(null);
onMounted(() => {
    root = am5.Root.new(chartdiv.value);

    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    root.dateFormatter.setAll({
        dateFormat: "yyyy",
        dateFields: ["valueX"]
    });

    let data = [
        { "date": "2020-07-01", "visits": 213 },
        { "date": "2020-07-02", "visits": 249 },
        { "date": "2020-07-03", "visits": 179 },
        { "date": "2020-07-04", "visits": 170 },
        { "date": "2020-07-05", "visits": 184 },
        { "date": "2020-07-06", "visits": 202 },
        { "date": "2020-07-07", "visits": 198 },
        { "date": "2020-07-08", "visits": 168 },
        { "date": "2020-07-09", "visits": 176 },
        { "date": "2020-07-10", "visits": 171 },
        { "date": "2020-07-11", "visits": 190 },
        { "date": "2020-07-12", "visits": 154 },
        { "date": "2020-07-13", "visits": 246 },
        { "date": "2020-07-14", "visits": 250 },
        { "date": "2020-07-15", "visits": 227 },
        { "date": "2020-07-16", "visits": 140 },
        { "date": "2020-07-17", "visits": 170 },
        { "date": "2020-07-18", "visits": 125 },
        { "date": "2020-07-19", "visits": 106 },
        { "date": "2020-07-20", "visits": 207 },
        { "date": "2020-07-21", "visits": 222 },
        { "date": "2020-07-22", "visits": 198 },
        { "date": "2020-07-23", "visits": 204 },
        { "date": "2020-07-24", "visits": 213 },
        { "date": "2020-07-25", "visits": 145 },
        { "date": "2020-07-26", "visits": 166 },
        { "date": "2020-07-27", "visits": 163 },
        { "date": "2020-07-28", "visits": 135 },
        { "date": "2020-07-29", "visits": 45 },
    ];

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
    }));

    let easing = am5.ease.linear;


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minGridDistance: 70
        }),
        tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.2,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        connect: false,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "visits",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{valueY}"
        })
    }));

    series.fills.template.setAll({
        fillOpacity: 0.2,
        visible: true
    });

    series.strokes.template.setAll({
        strokeWidth: 2
    });


    // Set up data processor to parse string dates
    // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd",
        dateFields: ["date"]
    });

    series.data.setAll(data);

    series.bullets.push(function () {
        let circle = am5.Circle.new(root, {
            radius: 4,
            fill: root.interfaceColors.get("background"),
            stroke: series.get("fill"),
            strokeWidth: 2
        })

        return am5.Bullet.new(root, {
            sprite: circle
        })
    });


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // add scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);


});
</script>

<template>
    <div class="w-[100%] h-[500px]" ref="chartdiv"></div>
</template>

<style scoped></style>
