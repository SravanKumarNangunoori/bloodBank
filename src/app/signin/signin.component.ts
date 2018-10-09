import { Component, OnInit, Input } from '@angular/core';
import {  AuthService,GoogleLoginProvider } from 'angular-6-social-login';
import { RestClientService } from '../rest.client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user:any;
  closeResult:String;
  registerForm: FormGroup;
  userInfoForm:FormGroup;
  userType:string;  
  roleModal: boolean;
  userModal:boolean;
  constructor( private formBuilder: FormBuilder,private socialAuthService: AuthService,private restclient:RestClientService ) {}
 
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      roletype: ['', Validators.required],
  });

  this.userInfoForm = this.formBuilder.group({
  email: ['',Validators.required],
  name: ['',Validators.required],
  address:['',Validators.required],
  phonenumber:['',Validators.required],
  state: ['',Validators.required],  
  city: ['',Validators.required],
  zip: ['',Validators.required],
  age:['',Validators.required],
  bloodGroup: ['',Validators.required],

});
    // this.roleModal=true;
    this.userModal=true;
  }
  public socialSignIn() {
      let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;   
    console.log()
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(" sign in data : " , userData);
        this.user=userData;
        console.log(userData);
      }
    );
  }
  submitUsertype(signUpinfo){
    console.log(signUpinfo);
  }
  postUserData() {
    this.restclient.post('/api/socialSignIn').subscribe(
      (result) => {
        console.log("Sucess");
      }, (error) => {
        console.log(error)
      }
    )
  }
  openRoleModal(){
    this.roleModal=true;
  }
  closeRoleModal(){
    this.roleModal=false;
  }
  
  
}
