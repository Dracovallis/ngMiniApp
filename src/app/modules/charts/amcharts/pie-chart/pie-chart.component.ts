import {AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {PirChartData} from '../../../../../assets/chartdata/PirChartData';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnDestroy, AfterViewInit {
    private chart;
    selected = '';

    constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {
    }

    // Run the function only in the browser
    browserOnly(f: () => void): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.chart) {
                this.chart.dispose();
            }

            this.chart = am4core.create('piechartdiv', am4charts.PieChart);

            this.reloadChart();

            this.chart.legend = new am4charts.Legend();
            this.chart.legend.position = 'bottom';

            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    reloadChart(): void {
        this.chart.series.pop();
        let pieSeries;
        if (this.selected == '') {
            this.chart.data = PirChartData.data;
            // Add and configure Series
            pieSeries = this.chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = 'goals';
            pieSeries.dataFields.category = 'team';
            pieSeries.legendSettings.labelText = '[bold]{team}:';
            pieSeries.legendSettings.itemValueText  = '{goals} goals';
        } else {
            this.chart.data = PirChartData.data[this.selected].goalsByPlayers;
            // Add and configure Series
            pieSeries = this.chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = 'goals';
            pieSeries.dataFields.category = 'player';
            pieSeries.legendSettings.labelText = '[bold]{player}:';
            pieSeries.legendSettings.itemValueText  = '{goals} goals';
        }

        const label = pieSeries.createChild(am4core.Label);

        // label.text = '{values.value.sum}\nTotal goals';
        label.html =
            '<span style="font-size: 30px">{values.value.sum}</span>' +
            '<br>' +
            '<span style="font-size: 20px">Total goals</span>';
        label.textAlign = 'middle';
        label.horizontalCenter = 'middle';
        label.verticalCenter = 'middle';
        label.fontSize = 30;
        this.chart.innerRadius = am4core.percent(55);

        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;

    }

    ngAfterViewInit(): void {
        // Chart code goes in here
        this.browserOnly(() => {
        }); // end am4core.ready()
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}

