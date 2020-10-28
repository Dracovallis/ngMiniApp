import {AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnDestroy, AfterViewInit {
  private chart;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.chart = am4core.create("chartdiv", am4charts.PieChart);

      this.chart.data = [{
        "country": 'Lithuania',
        "litres": 501.9
      }, {
        "country": "Czech Republic",
        "litres": 301.9
      }, {
        "country": "Ireland",
        "litres": 201.1
      }, {
        "country": "Germany",
        "litres": 165.8
      }, {
        "country": "Australia",
        "litres": 139.9
      }, {
        "country": "Austria",
        "litres": 128.3
      }, {
        "country": "UK",
        "litres": 99
      }, {
        "country": "Belgium",
        "litres": 60
      }, {
        "country": "The Netherlands",
        "litres": 50
      }];

      // Add and configure Series
      let pieSeries = this.chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";

      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit(): void {
    // Chart code goes in here
    this.browserOnly(() => {


    }); // end am4core.ready()
  }

  ngOnDestroy(): void {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
