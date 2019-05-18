import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/util/web3.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor(private web3Service: Web3Service, ) { }

  ngOnInit() {
    console.log('Constructor: ' + web3Service);
  }

}
