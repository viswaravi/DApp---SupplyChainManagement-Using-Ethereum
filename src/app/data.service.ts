import { Transaction } from 'src/Models/transaction.model';
import { WEB32 } from './web.3.2';
import { Injectable, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map,catchError}  from 'rxjs/operators';
import { WEB3 } from './web3';
import Web3 from 'web3';
import * as Contract from 'truffle-contract';
import { Item } from 'src/Models/item.model';
const assetArtifacts = require('../../../../Ang_Eth/build/contracts/Asset.json');
declare var window: any;
declare let require: any;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  account: any;
  accounts: any;
  items: Item[] = [];
  itemsCount: any =0;
  transactions: Transaction[] =[];
  txcount: number;

  constructor(private http: HttpClient,@Inject(WEB3) private web3: Web3,@Inject(WEB32) private web32:Web3) { 
    this.fillAllItems();
    this.fillAllTransactions();
  }
  AssetContract = Contract(assetArtifacts);
  provider = new Web3.providers.HttpProvider("http://localhost:7545");
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  
  getid(username: String ) {
    return this.http.get('http://localhost:3000/api/user/getid/' + username);
  }

  getAllAccounts(){
     return this.http.get('http://localhost:3000/api/user/all').pipe(catchError(this.handleError));
  }
  
// name: string,quantity: string, location: string,cost: number,owner: string
 async addItem(){
    this.AssetContract.deployed().then(function(instance) {
      return instance.addItem('carrot','10','MDU','5000', {from: '0xeab4d2006d140299aC6aD2F0DaAC78801ec3C0B6'});
    }).then(function(result:any) {
      console.log(result);
    }).catch(function(err){
      console.error(err);
    }
    );
  }

  async fillAllItems(){
    this.AssetContract.setProvider(this.provider);
    this.AssetContract.deployed().then(function(instance) {
      return instance.getItemTotal();
    }).then(e => {
      //  console.log(e.words[0]);     
        this.itemsCount = e.words[0];

        this.fillItems().then(_ => {
         //   console.log('Items Filled');
        //    console.log(this.items);
            return this.items;            
        });

    }).catch(function(err){
      console.error(err);
    }
    );
  }


  async fillItems(){
   // console.log('Filling Items');
   
    let i= 1;
    let index = 1;
  //  for(i=1;i<=this.itemsCount;i++){
    while(index<=this.itemsCount){
      this.AssetContract.deployed().then(instance => {
        instance.items(i++).then(item => {
       //     console.log(item);
            if(item.quantity.words[0]!= NaN){
              this.items.push(new Item(item.id.words[0],item.name,item.quantity.words[0],item.location,item.cost.words[0],item.owner,item.txcount.words[0]));
            }
          });
    });
    index++;
  } 
}


async fillAllTransactions(){
  this.AssetContract.deployed().then(function(instance) {
    return instance.getTransactionCount();
  }).then(e => {
   //   console.log(e.words[0]);     
      this.txcount = e.words[0];

      this.fillTransactios().then(_ => {
        //  console.log('Transactions Filled');
       //   console.log(this.transactions);
      });

  }).catch(function(err){
    console.error(err);
  }
  );
}


async fillTransactios(){
  // console.log('Filling Items');
 
  let i= 1;
  let index = 1;
//  for(i=1;i<=this.itemsCount;i++){
  while(index<=this.txcount){
    this.AssetContract.deployed().then(instance => {
      instance.transactions(i++).then(tx => {
       //   console.log(tx);
            this.transactions.push(new Transaction(tx.iid.words[0],tx.from,tx.to,tx.cost,tx.location));
        });
  });
  index++;
} 
}

  

}
