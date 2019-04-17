import { DataService } from './data.service';
import { Component, OnInit, Inject, enableProdMode } from '@angular/core';
import { WEB3 } from './web3';
import Web3 from 'web3';
import * as Contract from 'truffle-contract';
const assetArtifacts = require('../../Ethereum-Files/build/contracts/Asset.json');
declare var window: any;
declare let require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'F-CHAIN';

  account: any;
  accounts: any;
 
  

  constructor(@Inject(WEB3) private web3: Web3,private dservice: DataService){}

  provider = new Web3.providers.HttpProvider("http://localhost:7545");
  AssetContract = Contract(assetArtifacts);

  async ngOnInit() {
    const accounts = await this.web3.eth.getAccounts();
    this.accounts = accounts;
    this.AssetContract.setProvider(this.provider);
   // console.log(this.accounts);
  }

  addItem(){
    this.AssetContract.deployed().then(function(instance) {
      return instance.addItem('beetroot','20','VNR','2500', {from: '0xeab4d2006d140299aC6aD2F0DaAC78801ec3C0B6'});
    }).then(function(result:any) {
      console.log(result);
    }).catch(function(err){
      console.error(err);
    }
    );
  }


  getItems(){
    this.AssetContract.methods.getItemName(1).call({from:'0xeab4d2006d140299aC6aD2F0DaAC78801ec3C0B6'});
  }

  getItemName(){
    this.AssetContract.deployed().then(function(instance) {
      return instance.items(2);
     // return instance.getItemName(1, {from: '0xeab4d2006d140299aC6aD2F0DaAC78801ec3C0B6'});
    //  return instance.getItemName(1).call({from:'0xeab4d2006d140299aC6aD2F0DaAC78801ec3C0B6'});
    }).then(function(result) {
      console.log(result);
    }).catch(function(err){
      console.error(err);
    }
    );
  }

  getItemDetails(){
    this.AssetContract.deployed().then(function(instance) {
      return instance.getItem(1, {from: '0xeab4d2006d140299aC6aD2F0DaAC78801ec3C0B6'});
    }).then(function(result) {
      console.log(result);
    }).catch(function(err){
      console.error(err);
    }
    );
  }

}
