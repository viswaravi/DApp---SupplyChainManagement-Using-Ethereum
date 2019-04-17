import { DispItemsComponent } from './home/disp-items/disp-items.component';
import { ItemsComponent } from './home/items/items.component';
import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AddTransactionComponent } from './home/add-transaction/add-transaction.component';
import { SeeTrackComponent } from './home/see-track/see-track.component';


export const homeRoutes: Routes = [
    {path: '', redirectTo: 'items', pathMatch: 'full'},
    {path: 'seeTrack',component:SeeTrackComponent },
    {path: 'dispItems',component:DispItemsComponent },
    {path: 'addTransaction',component:AddTransactionComponent },
    {path: '**', redirectTo: 'dispItems', pathMatch: 'full'},
];
