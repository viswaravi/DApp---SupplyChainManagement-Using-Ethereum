import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ItemsComponent } from './home/items/items.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DispItemsComponent } from './home/disp-items/disp-items.component';
import { SeeTrackComponent } from './home/see-track/see-track.component';
import { AddTransactionComponent } from './home/add-transaction/add-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ItemsComponent,
    DispItemsComponent,
    SeeTrackComponent,
    AddTransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
