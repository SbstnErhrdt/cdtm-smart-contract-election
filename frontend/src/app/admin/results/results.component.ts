import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/util/web3.service';
import { ChartType, ChartOptions } from "chart.js";
import { Label } from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Router } from '@angular/router';

declare let require: any;
const election_artifacts = require('../../../../build/contracts/Election.json');

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit {
  candidates_list = [];
  results = [];

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
  public pieChartLabels: Label[] = this.candidates_list;
  public pieChartData: number[] = this.results;
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ["#ec1e27", "#ea912b"],
    },
  ];

  Election: any;

  account = null;

  candidates = null;

  result = null;

  constructor(private web3Service: Web3Service, private router: Router) {

  }

  ngOnInit() {
    this.web3Service.artifactsToContract(election_artifacts)
      .then((ElectionAbstraction) => {
        this.Election = ElectionAbstraction;
        this.Election.deployed()
          .then(deployed => {
            console.log(deployed);
            deployed.candidatesCount.call().then((candidatesCount) => {
              const result = candidatesCount.toNumber();
              this.loadCandiates(result);
            });
          });
      });
  }

  loadCandiates(candidatesCount) {
    this.candidates = [];

    this.web3Service.artifactsToContract(election_artifacts)
      .then((ElectionAbstraction) => {
        this.Election = ElectionAbstraction;
        this.Election.deployed()
          .then(deployed => {
            for (var i = 1; i <= candidatesCount; i++) {
              deployed.getCandidateVotes(i).then((candidate) => {
                // append the candidates
                this.candidates.push({
                  id: candidate[0].toNumber(),
                  name: candidate[1],
                  party: candidate[2],
                  votes: candidate[3].toNumber(),
                })
                this.candidates_list.push(candidate[1]);
                this.results.push(candidate[3].toNumber());
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
