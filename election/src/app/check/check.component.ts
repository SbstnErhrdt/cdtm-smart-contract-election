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

  candidate = null;

  vote : any;

  constructor(private route:ActivatedRoute,private web3Service: Web3Service) {}

  ngOnInit() {
    const hash = this.route.snapshot.params['hash'];

    const that = this;

    this.web3Service.artifactsToContract(election_artifacts)
      .then((ElectionAbstraction) => {
        this.Election = ElectionAbstraction;
        this.Election.deployed()
          .then(deployed => {
            console.log(deployed);
            deployed.getVoteCandidate(that.web3Service.web3.utils.fromAscii(hash)).then((candidate) => {
              // append the candidates
              this.candidate = {
                id: candidate[0].toNumber(),
                name: candidate[1],
                party: candidate[2],
              };
            });
          });
      });
  }

}
