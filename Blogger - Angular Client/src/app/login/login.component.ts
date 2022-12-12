import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../Models/Login';
import { Rausers } from '../Models/Rausers';
import { LoginService } from '../Services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login = {
    Email: '',
    Password: '',
  };

  loginForm!: FormGroup;
  constructor(
    private loginservice: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  loginSubmitted(login: Login) {
    //alert("Login Successful")
    //   this.login=login
    //   this.loginservice.verifyUser(this.login).subscribe(
    //   (data:any)=>{
    //     console.log("data ", data)
    //     if(data){
    //       console.log("if ", data)

    //       this.toastr.success("Welcome back!");
    //       //this.router.navigate(['/userpage'])
    //       this.router.navigate(['/dashboard']);
    //     }
    //     else{
    //       this.toastr.error("Invalid Credentials! Try again")
    //     }
    //   }
    // )
    this.toastr.success('Welcome back!');
    this.router.navigate(['/userhome']);
  }
}
