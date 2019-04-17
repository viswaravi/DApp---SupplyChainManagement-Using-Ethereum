import { DataService } from './../../data.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { WEB3 } from '../../web3';
import Web3 from 'web3';
import * as Contract from 'truffle-contract';
import { promise } from 'protractor';
import { resolve } from 'path';
const assetArtifacts = require('../../../../Ethereum-Files/build/contracts/Asset.json');
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Item } from 'src/Models/item.model';
import { Transaction } from 'src/Models/transaction.model';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
declare var window: any;
declare let require: any;

@Component({
  selector: 'app-see-track',
  templateUrl: './see-track.component.html',
  styleUrls: ['./see-track.component.css']
})
export class SeeTrackComponent implements OnInit {

  provider = new Web3.providers.HttpProvider("http://localhost:7545");
  AssetContract = Contract(assetArtifacts);

  transactions: Transaction[] =[];
  trackedTransactions: Transaction[] =[];
  
  txcount: number;
  itemID:any;
  items: Item[] = [];
  itemsCount: any =0;
  trackedItem:any;
  user: any;
  titem: Item;

  constructor(@Inject(WEB3) private web3: Web3,private dservice: DataService) { }

  

  ngOnInit() {
    this.web3.eth.getCoinbase().then(acc =>{
      this.user = acc;
    });
    this.AssetContract.setProvider(this.provider);
   // this.fillAllTransactions();
   this.transactions = this.dservice.transactions;
   this.fillAllItems();
   this.changeTrackedTransactions();
  }

  changeTrackedTransactions(){
    
    this.trackedItem = this.trackedItem[0];
    console.log('Updating:',this.trackedItem);
    this.trackedItem = this.trackedItem[0];
    this.trackedTransactions = [];
    for(let tx of this.transactions){
      if(tx._id == this.trackedItem){
        this.trackedTransactions.push(tx);
      }
    }
  }

  getFloat(n){
    if(n%2!=0){
      return 'right';
    }
    else{
      return 'left';
    }

  }

TransactItem(){
  this.AssetContract.deployed().then(function(instance) {
    return instance.transactItem('beetroot','20','VNR','2500', {from: '0xeab4d2006d140299aC6aD2F0DaAC78801ec3C0B6'});
  }).then(function(result:any) {
    console.log(result);
  }).catch(function(err){
    console.error(err);
  }
  );  
}

async fillAllTransactions(){
  this.AssetContract.deployed().then(function(instance) {
    return instance.getTransactionCount();
  }).then(e => {
      console.log(e.words[0]);     
      this.txcount = e.words[0];

      this.fillTransactios().then(_ => {
          console.log('Transactions Filled');
          console.log(this.transactions);
          this.trackedItem = this.items[0].name;
      });

  }).catch(function(err){
    console.error(err);
  }
  );
}


async fillTransactios(){
  console.log('Filling Items');
 
  let i= 1;
  let index = 1;
//  for(i=1;i<=this.itemsCount;i++){
  while(index<=this.txcount){
    this.AssetContract.deployed().then(instance => {
      instance.transactions(i++).then(tx => {
          console.log(tx);
            this.transactions.push(new Transaction(tx.iid,tx.from,tx.to,tx.cost,tx.location));
        });
  });
  index++;
} 
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async fillAllItems(){
  this.AssetContract.deployed().then(function(instance) {
    return instance.getItemTotal();
  }).then(e => {
   //   console.log(e.words[0]);     
      this.itemsCount = e.words[0];

      this.fillItems().then(_ => {
          console.log('Items Filled');
          console.log(this.items);       
          
          this.trackedItem = this.items[0];  
        
          console.log('Length:',this.items.length);
          
          
      });
     
      

  }).catch(function(err){
    console.error(err);
  }
  );
}


isOwner(item:Item){
  let itx:Transaction[] = [];
  this.transactions.forEach(tx =>{

    console.log('ID CHECK:',tx._id , item._id);
    
    if(tx._id == item._id){
     itx.push(tx);
    }
});
console.log('ITEM TX:',itx,'  itx len:',itx.length);

for(let tx of itx){
  if(tx.to.toLocaleLowerCase() == this.user.toLocaleLowerCase() || tx.from.toLocaleLowerCase()==this.user.toLocaleLowerCase()){
    return true;
  }
}

return false;
}

async fillItems(){
  console.log('Filling Items');
 
  let i= 1;
  let index = 1;
//  for(i=1;i<=this.itemsCount;i++){
  while(index<=this.itemsCount){
    this.AssetContract.deployed().then(instance => {
      instance.items(i++).then(item => {
     //     console.log(item);
          if(item.quantity.words[0]!= NaN){
           this.titem = new Item(item.id.words[0],item.name,item.quantity.words[0],item.location,item.cost.words[0],item.owner,item.txcount.words[0]);
           
           if(this.isOwner(this.titem) || (this.titem.txcount == 0 && this.titem.owner.toLocaleLowerCase()==this.user.toLocaleLowerCase())){
              this.items.push(this.titem);
              console.log('Pushed:',this.titem);
              
            }
            
           console.log('Items Length:',this.items.length);
            
          }
        });
  });
  index++;
} 
}



}
