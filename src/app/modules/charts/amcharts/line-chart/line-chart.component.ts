import {Component, Inject, NgZone, PLATFORM_ID, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {LineChartData} from '../../../../../assets/chartdata/LineChartData';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnDestroy, AfterViewInit {
    private chart;

    constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {
    }

    // Run the function only in the browser
    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    ngAfterViewInit(): void {
        // Chart code goes in here
        this.browserOnly(() => {
            if (this.chart) {
                this.chart.dispose();
            }

            am4core.useTheme(am4themes_animated);

            this.chart = am4core.create('linechartdiv', am4charts.XYChart);

            this.chart.paddingRight = 20;

            const data = [];
            let visits = 10;
            for (let i = 1; i < 366; i++) {
                visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
                data.push({date: new Date(2018, 0, i), name: 'name' + i, value: visits});
            }

            this.chart.data = LineChartData.data;

            // Create axes
            let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.minGridDistance = 50;

            let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            let series = this.chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "value1";
            series.dataFields.dateX = "date";
            series.strokeWidth = 2;
            series.minBulletDistance = 10;
            series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
            series.tooltip.pointerOrientation = "vertical";

            // Create series
            let series2 = this.chart.series.push(new am4charts.LineSeries());
            series2.dataFields.valueY = "value2";
            series2.dataFields.dateX = "date";
            series2.strokeWidth = 2;
            // series2.strokeDasharray = "3,4";
            // series2.stroke = series.stroke;

            // Add cursor
            this.chart.cursor = new am4charts.XYCursor();
            this.chart.cursor.xAxis = dateAxis;
        });
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.dispose();
        }
    }


}
