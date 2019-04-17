import { StateService } from './../state.service';
import { Component, OnInit, Inject} from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/Models/user.model';
import {AuthService} from '../auth.service';
import {DataService} from '../data.service';

import { WEB3 } from '../web3';
import Web3 from 'web3';
const assetArtifacts = require('../../../Ethereum-Files/build/contracts/Asset.json');
import * as Contract from 'truffle-contract';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  fstate: Boolean;
  provider = new Web3.providers.HttpProvider("http://localhost:7545");
  AssetContract = Contract(assetArtifacts);

  constructor(@Inject(WEB3) private web3: Web3,private router: Router, private route: ActivatedRoute,private authservice: AuthService, private sservice: StateService,
    private dservice: DataService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username'   : new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
    this.AssetContract.setProvider(this.provider);
     
  }


  onSubmit() {
    /*
    this.web3.eth.sign('0x86bF0d6b8CEB1fBe690A4A3735b5976Ed741fcC0','').then(data=>{
      console.log(data);
      
    });*/
    const val = this.loginForm.value;
    const sUser = new User('',val.password,'',val.username,'','');
    console.log('loginuser:',sUser);
      this.authservice.signIn(sUser).subscribe( (data: any) => {
      /*   this.dservice.getid(val.username).subscribe( (res: any) => {
      console.log(res.obj.public_key);

     });
    */
     this.web3.eth.getCoinbase().then(acc =>{
        if(acc.toLocaleLowerCase() == data.obj.public_key.toLocaleLowerCase()){
          this.router.navigate(['../home'], {relativeTo: this.route});  
        }
     });
   console.log(data.obj.public_key);
    });
    
  }

  signUp() {
    this.router.navigate(['../signup'], {relativeTo: this.route});
  }



}
