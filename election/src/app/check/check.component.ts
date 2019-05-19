import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from 'src/util/web3.service';

declare let require: any;
const election_artifacts = require('../../../../build/contracts/Election.json');

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  Election: any;

  vote : any;

  constructor(private route:ActivatedRoute,private web3Service: Web3Service) {}

  ngOnInit() {
    const hash = this.route.snapshot.params['hash'];

    this.web3Service.artifactsToContract(election_artifacts)
      .then((ElectionAbstraction) => {
        this.Election = ElectionAbstraction;
        this.Election.deployed()
          .then(deployed => {
            console.log(deployed);
            deployed.getVoteCandidate.().then((candidatesCount) => {
              const result = candidatesCount.toNumber();
              this.loadVote(result);
            });
          });
      });
  }

}
