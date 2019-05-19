import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/util/web3.service';
import { Router } from '@angular/router';

declare let require: any;
const election_artifacts = require('../../../../build/contracts/Election.json');

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  ENDPOINT = "http://localhost:4200/check/";

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
              deployed.getCandidate(i).then((candidate) => {
                // append the candidates
                this.candidates.push({
                  id: candidate[0].toNumber(),
                  name: candidate[1],
                  party: candidate[2],
                })
              });
            }
          });
      });
  }

  generateRandom() {
    return Math.random().toString(36).substr(2, 16);
  }


  vote(id, candidate) {
    this.result = null;
    let r = this.generateRandom();
    console.log(this.web3Service.web3.utils.fromAscii(r));
    let that = this;
    this.web3Service.artifactsToContract(election_artifacts)
      .then((ElectionAbstraction) => {
        ElectionAbstraction.deployed().then(function (instance) {
          return instance.vote(id, that.web3Service.web3.utils.fromAscii(r), { from: localStorage.getItem('account') });
        }).then(function (result) {
          console.log('RES', result);
          if (result) {
            that.result = {};
            that.result['candidate'] = candidate;
            that.result['hash'] = that.ENDPOINT + r;
          }
        }).catch(function (err) {
          console.error(err);
          alert(err);
        });
      });
  }

  nextVote() {
    this.result = {};
    this.router.navigate(["/"]);
  }


}
