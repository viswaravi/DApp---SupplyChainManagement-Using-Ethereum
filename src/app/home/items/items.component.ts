import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/Models/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input( )  element : Item;  

  constructor() { }

  ngOnInit() {
  }

  seeTrack(){
    
  }

  TransactItem(){
    
  }

  
}
