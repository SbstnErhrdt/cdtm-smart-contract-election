import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/util/web3.service';
import { ChartType, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

declare let require: any;
const election_artifacts = require('../../../../build/contracts/Election.json');

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit {
  candidates = ["Simon", "Sebastian"];
  results = [300, 500];

  Election: any;

  account = null;

  stations = null;

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

  constructor(private web3Service: Web3Service) {

  }

  ngOnInit() {
    this.web3Service.artifactsToContract(election_artifacts)
      .then((ElectionAbstraction) => {
        this.Election = ElectionAbstraction;
        this.Election.deployed()
          .then(deployed => {
            console.log(deployed);
            deployed.pollingStationsCount.call().then((stationsCount) => {
              const result = stationsCount.toNumber();
              this.loadStations(result);
            });
          });
      });
  }

  loadStations(candidatesCount) {
    this.stations = [];

    this.web3Service.artifactsToContract(election_artifacts)
      .then((ElectionAbstraction) => {
        this.Election = ElectionAbstraction;
        this.Election.deployed()
          .then(deployed => {
            for (var i = 1; i <= candidatesCount; i++) {
              deployed.getStation(i).then((station) => {
                // append the candidates
                this.stations.push({
                  id: station[0].toNumber(),
                  name: station[1],
                  amountOfEligibleVoters: station[2].toNumber(),
                })
              });
            }
          });
      });
  }

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
