import { Component, OnInit } from "@angular/core";
import { ChartType, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit {
  candidates = ["Simon", "Sebastian"];
  results = [300, 500];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "left",
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = this.candidates;
  public pieChartData: number[] = this.results;
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ["#ec1e27", "#ea912b"],
    },
  ];

  constructor() {}

  ngOnInit() {}

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  addSlice() {
    this.pieChartLabels.push(["Line 1", "Line 2", "Line 3"]);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push("rgba(196,79,244,0.3)");
  }

  removeSlice() {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position =
      this.pieChartOptions.legend.position === "left" ? "top" : "left";
  }
}
