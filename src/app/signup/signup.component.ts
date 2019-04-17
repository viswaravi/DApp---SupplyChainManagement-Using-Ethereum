import { WEB3 } from './../web3';
import { DataService } from './../data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators}  from '@angular/forms';
import { User } from '../../Models/user.model';
import { AuthService } from '../auth.service';
import { Router , ActivatedRoute} from '@angular/router';
import Web3 from 'web3';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  fstate: Boolean;

  constructor(@Inject(WEB3) private web3:Web3 ,private authservice: AuthService, private router: Router, private route: ActivatedRoute,private dservice:DataService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'name'    : new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'email'   : new FormControl(null, Validators.required)
    });
  }

  
  onSubmit() {
    // console.log(this.signUpForm.value);
   const val = this.signUpForm.value;
    this.web3.eth.getCoinbase().then(key=>{ 
      
    const newUser = new User('', val.password, val.name, val.username, val.email,key);
    console.log('NEW_USER:',newUser);
    this.authservice.signUp(newUser).subscribe( data => {
          console.log(data);
    this.router.navigate(['../login'], {relativeTo: this.route});
    });

   });
  
  }
}
