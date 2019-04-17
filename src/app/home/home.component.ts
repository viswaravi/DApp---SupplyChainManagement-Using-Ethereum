import { Router, ActivatedRoute } from '@angular/router';
  import { User } from 'src/Models/user.model';
  import { DataService } from './../data.service';
  import { Component, OnInit,Inject, KeyValueDiffers } from '@angular/core';
  import { Item } from 'src/Models/item.model';


  import { WEB3 } from '../web3';
  import Web3 from 'web3';
  import { WEB32} from '../web.3.2';
  import * as Contract from 'truffle-contract';
  import { promise, Key } from 'protractor';
  import { resolve } from 'path';
  const assetArtifacts = require('../../../Ethereum-Files/build/contracts/Asset.json');
  import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
  declare var window: any;
  declare let require: any;

  import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {

    
    newItemForm: FormGroup;
    closeResult: string;
    key:any;
    userAccounts: User[] = [];
    user:any;

    constructor(private router: Router, private route: ActivatedRoute,private dservice:DataService, @Inject(WEB3) private web3: Web3,@Inject(WEB32) private web32:Web3,private modalService: NgbModal) { }

    provider = new Web3.providers.HttpProvider("http://localhost:7545");
    AssetContract = Contract(assetArtifacts);

    items: Item[] = [];
    itemsCount: any =0;

  async ngOnInit() {
    this.newItemForm = new FormGroup({
      'name'   : new FormControl(null, Validators.required),
      'quantity': new FormControl(null, Validators.required),
      'location'   : new FormControl(null, Validators.required),
      'cost': new FormControl(null, Validators.required) 
    });
    this.AssetContract.setProvider(this.provider);
    this.web3.eth.getCoinbase().then(Key =>{
            this.key = Key;          
    });
    }

    
  open(content) {
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

  addItem(){
    const val = this.newItemForm.value;
    console.log(val);
    this.AssetContract.deployed().then(instance =>{
      return instance.addItem(val.name,val.quantity,val.location,val.cost, {from: this.key});
    }).then(function(result:any) {
      console.log(result);
    }).catch(function(err: any){
      console.error(err);
    }
    );
    
  }

  logout(){
    this.router.navigate(['/login']);
  }

  }

