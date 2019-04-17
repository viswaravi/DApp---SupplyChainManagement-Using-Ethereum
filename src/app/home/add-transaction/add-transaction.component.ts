import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  constructor() { }

  transactForm:FormGroup;
  

  ngOnInit() {
    this.transactForm = new FormGroup({
      'to': new FormControl(null, Validators.required),
      'location'   : new FormControl(null, Validators.required),
      'cost': new FormControl(null, Validators.required) 
    });
  }

}
