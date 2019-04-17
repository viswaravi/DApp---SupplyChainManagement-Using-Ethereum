import { DataService } from './../../data.service';
import { Component, OnInit , Inject} from '@angular/core';
import { WEB3 } from '../../web3';

import Web3 from 'web3';
import * as Contract from 'truffle-contract';
import { promise, Key } from 'protractor';
import { resolve } from 'path';
const assetArtifacts = require('../../../../Ethereum-Files/build/contracts/Asset.json');
import {NgForm, FormGroup, FormControl, Validators, SelectMultipleControlValueAccessor} from '@angular/forms';
import { Item } from 'src/Models/item.model';
declare var window: any;
declare let require: any;

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { WEB32 } from 'src/app/web.3.2';
import { Transaction } from 'src/Models/transaction.model';


@Component({
  selector: 'app-disp-items',
  templateUrl: './disp-items.component.html',
  styleUrls: ['./disp-items.component.css']
})
export class DispItemsComponent implements OnInit {

  constructor(@Inject(WEB3) private web3: Web3,private modalService: NgbModal,@Inject(WEB32) private web32:Web3,private dservice:DataService) { }


  items: Item[] = [];
  itemsCount: any =0;
  closeResult: string;
  userAccounts = new Map();
  usernames:any[] = [];
  user: any;
  selectedItem:any;
  transactions: Transaction[] = [];
  titem:Item;




  provider = new Web3.providers.HttpProvider("http://localhost:7545");
  AssetContract = Contract(assetArtifacts);
  transactForm: FormGroup;
  ngOnInit() {
    this.web3.eth.getCoinbase().then(acc =>{
      this.user = acc;
    });
    this.transactForm = new FormGroup({
      'to'   : new FormControl(null, Validators.required),
      'location'   : new FormControl(null, Validators.required),
      'cost': new FormControl(null, Validators.required) 
    });
    this.AssetContract.setProvider(this.provider);
    this.fillAllItems();

  //  this.items = this.dservice.items;
    this.transactions = this.dservice.transactions;
    console.log('Tx:',this.transactions);
    


    this.getAllUsers();
   
  }

  

 
open(content,id) {
  this.selectedItem = id;
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

isin(w3accounts:string[],dbaccount:string){
  let f = false;
   w3accounts.forEach(acc =>{
     // console.log(acc.toLocaleLowerCase(),':',dbaccount.toLocaleLowerCase(),acc.toLocaleLowerCase() == dbaccount.toLocaleLowerCase()); 
      if(acc.toLocaleLowerCase() == dbaccount.toLocaleLowerCase()){
          f =  true;   
      }
    });
    return f;
}

getAllUsers(){
  this.web32.eth.getAccounts().then(accounts =>{
   //     console.log('WEB3-ACCOUNTS:',accounts);
        this.dservice.getAllAccounts().subscribe((daccounts:any) =>{
     //     console.log('DBACCOUNTS:');        
        
          const accs = daccounts.obj;
          accs.forEach(acc => {
              if(this.isin(accounts,acc.public_key)){
                // console.log(acc.public_key,': present');
                this.userAccounts.set(acc.username,acc.public_key);
                this.usernames.push(acc.username);
              }
          });
     //     console.log(this.usernames);
        
        });      
  });
}

TransactItem(){

  const val = this.transactForm.value;

  this.AssetContract.deployed().then(instance => {
    console.log('Selected');
    console.log(val);
    console.log(this.selectedItem);
    console.log(this.user);
    
    

    return instance.transactItem(this.selectedItem,this.userAccounts.get(val.to),val.cost,val.location,{from:this.user });
  }).then(function(result:any) {
    console.log(result);
  }).catch(function(err){
    console.error(err);
  }
  );  
}



  async fillAllItems(){
    this.AssetContract.deployed().then(function(instance) {
      return instance.getItemTotal();
    }).then(e => {
     //   console.log(e.words[0]);     
        this.itemsCount = e.words[0];

        this.fillItems().then(_ => {
            console.log('Items Filled');
            console.log(this.items);         
          
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
  // console.log('Check Owner',itx[(itx.length)-1].to.toLocaleLowerCase(),' ',this.user.toLocaleLowerCase());
  if(itx.length>0){
  if(itx[(itx.length)-1].to.toLocaleLowerCase() == this.user.toLocaleLowerCase()){
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
