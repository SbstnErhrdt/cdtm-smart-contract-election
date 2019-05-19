import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/util/web3.service';

declare let require: any;
const election_artifacts = require('../../../../build/contracts/Election.json');
@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {

  Election: any;
  
  account = null;

  stations = null;

  images = [
    "https://images.pexels.com/photos/2159549/pexels-photo-2159549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1666362/pexels-photo-1666362.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/57553/pexels-photo-57553.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/45189/pexels-photo-45189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2216275/pexels-photo-2216275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2159549/pexels-photo-2159549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1666362/pexels-photo-1666362.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/57553/pexels-photo-57553.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/45189/pexels-photo-45189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2216275/pexels-photo-2216275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2159549/pexels-photo-2159549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1666362/pexels-photo-1666362.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/57553/pexels-photo-57553.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/45189/pexels-photo-45189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2216275/pexels-photo-2216275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/45189/pexels-photo-45189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2216275/pexels-photo-2216275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2159549/pexels-photo-2159549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1666362/pexels-photo-1666362.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/57553/pexels-photo-57553.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/45189/pexels-photo-45189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2216275/pexels-photo-2216275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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

  generateRandom() {
    return Math.random().toString(36).substr(2, 16);
  }


  selectStation(id) {
    this.web3Service.artifactsToContract(election_artifacts)
      .then((ElectionAbstraction) => {
        ElectionAbstraction.deployed().then(function (instance) {
          return instance.assignAddressToStation(id, { from: localStorage.getItem('account') });
        }).then(function (result) {
          console.log(result)
          // Wait for votes to update
        }).catch(function (err) {
          console.error(err);
        });
      });
  }
}
