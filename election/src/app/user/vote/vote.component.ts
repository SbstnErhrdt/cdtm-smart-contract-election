import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/util/web3.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    console.log('Constructor: ' + this.web3Service);
    console.log('Constructor: ' + this.web3Service.ready);
    console.log('Constructor: ' + this.web3Service.accountsObservable);
    console.log(this.web3Service.accountsObservable[0]);
  }

}
