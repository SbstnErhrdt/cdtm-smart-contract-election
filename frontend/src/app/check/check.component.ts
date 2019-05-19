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

  vote: any;

  c = {
    id: 1,
    name: 'Ekrem Imamoglu',
    party: 'CHP',
  };

  constructor(private route: ActivatedRoute, private web3Service: Web3Service) { }

  ngOnInit() {
    this.run();
  }

  run() {
    const hash = this.route.snapshot.params['hash'];
    console.log(hash);



    const that = this;

    this.web3Service.artifactsToContract(election_artifacts)
      .then((ElectionAbstraction) => {
        this.Election = ElectionAbstraction;
        this.Election.deployed()
          .then(deployed => {
            console.log('dep', deployed);

            ////deployed.hash2candidateId.call().then((res) => {
            //  console.log(res);
            //});

            deployed.getVoteCandidate(this.web3Service.web3.utils.asciiToHex(hash)).then((candidate) => {
              console.log("aaa",candidate);
              // append the candidates
              this.candidate = {
                id: candidate[0].toNumber(),
                name: candidate[1],
                party: candidate[2],
              };
            }).catch(function (err) {
              console.error(err);
            });
            
            
          });
      });
  }

}
