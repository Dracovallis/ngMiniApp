import {AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';

/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {isPlatformBrowser} from '@angular/common';
import {BarChartData} from '../../../../../assets/chartdata/BarChartData';
import {PirChartData} from '../../../../../assets/chartdata/PirChartData';

@Component({
    selector: 'app-column-chart',
    templateUrl: './column-chart.component.html',
    styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements AfterViewInit, OnDestroy {
    private chart;
    selected;
    selectOptions;


    constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {
        this.selectOptions = Object.keys(BarChartData.data);
        this.selected = this.selectOptions[this.selectOptions.length - 1];
    }

    // Run the function only in the browser
    browserOnly(f: () => void): void {
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
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            this.chart = am4core.create('columnchartdiv', am4charts.XYChart);
            if ( BarChartData.data[this.selected]) {
                this.chart.data = BarChartData.data[this.selected];
            }


            // Create axes
            const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = 'month';
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

            categoryAxis.renderer.labels.template.adapter.add('dy', function(dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }
                return dy;
            });

            const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            const series = this.chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = 'goals';
            series.dataFields.categoryX = 'month';
            series.name = 'Goals';
            series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/] goals';
            series.columns.template.fillOpacity = .8;

            const columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        });
    }

    reloadChart(): void {
        this.chart.series.pop();
        if (BarChartData.data[this.selected]) {
            this.chart.data = BarChartData.data[this.selected]
            // Add and configure Series
            // Create series
            const series = this.chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = 'goals';
            series.dataFields.categoryX = 'month';
            series.name = 'Goals';
            series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/] goals';
            series.columns.template.fillOpacity = .8;

            const columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
        }
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}
