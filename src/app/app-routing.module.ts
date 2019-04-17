import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { homeRoutes } from './home.routing';

const routes: Routes = [
    {path: '' , redirectTo: '/login', pathMatch: 'full'},
    {  path: 'login' , component: LoginComponent },
    {path:'signup', component:SignupComponent},
    {  path: 'home'  , component: HomeComponent , children: homeRoutes},
    {path: '**', redirectTo: '/notfound', pathMatch: 'full'},
    {path: 'notfound', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
