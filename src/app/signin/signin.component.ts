import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor( private socialAuthService: AuthService ) {}
  
  ngOnInit(){}
  public socialSignIn() {
    
      let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;   
    console.log()
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(" sign in data : " , userData);
       
      }
    );

}}
