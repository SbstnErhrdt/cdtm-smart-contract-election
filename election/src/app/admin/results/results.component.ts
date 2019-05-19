import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/util/web3.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

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
}