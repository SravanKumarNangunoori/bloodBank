import { Component, OnInit, Input } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { RestClientService } from '../rest.client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user: any;
  closeResult: String;
  registerForm: FormGroup;
  userInfoForm: FormGroup;
  hospitalform: FormGroup;
  bloodbankform: FormGroup;
  userType: string;
  roleModal: boolean;
  userModal: boolean;
  hospitalModal: boolean;
  bloodbankmodal: boolean;

  constructor(private formBuilder: FormBuilder, private socialAuthService: AuthService, private restclient: RestClientService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      roletype: ['', Validators.required],
    });

    this.userInfoForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      age: ['', Validators.required],
      bloodGroup: ['', Validators.required],

    });

    this.hospitalform = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      AmbulanceNumber: ['', Validators.required],

    });
    this.bloodbankform = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],

    });

    this.roleModal = false;
    this.userModal = false;
    this.hospitalModal = false;
    this.bloodbankmodal = false;

  }


  ///gmail sigin 
  public socialSignIn() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    let registeredUser;
    console.log()
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(" sign in data : ", userData);
        this.user = userData;
        console.log(userData);
        if(this.user.email!=null){
          this.restclient.get('/api/registeredUsers').subscribe(
            (result)=>{
            registeredUser=result;
            
        this.validateUser(registeredUser);
            },(error)=>{
              console.log(error);
            });
        }
      }
    );
    
    }
  

  validateUser(registeredUser){
    registeredUser.forEach(element => {
      if(element.email==this.user.email){
        this.routeUser(element);
      }
    });  
    
    this.openRoleModal();
  }

  routeUser(element){
    console.log(element);
  }

 

  submitUserRole(roletype) {
    console.log(this.user, roletype);    
    this.restclient.post('/api/registerUser',{"email":this.user.email,"roletype":roletype}).subscribe(
      (result)=>{
        console.log("userdata posted");
        if (roletype == 'hospitalManager') {
          this.closeRoleModal();
          this.hospitalform.controls['email'].setValue(this.user.email);
          this.openHospitalModal();
        } else if (roletype == 'bloodBankManager') {
          this.closeRoleModal();
          this.bloodbankform.controls['email'].setValue(this.user.email);
          this.openBloodBankModal();
    
        } else {
          this.closeRoleModal();
          this.userInfoForm.controls['email'].setValue(this.user.email);
          this.userInfoForm.controls['name'].setValue(this.user.name);
          this.openUserModal();
        }
      },
      (error)=>{
        console.log(error);
      });

    
    

  }
  submitUserForm(userform){
    console.log(userform);
    this.restclient.post('/api/postuser',userform).subscribe(
      (result) => {
        this.closeUserModal();
        this.routeUser({"email":this.user.email,"roletype":"commonUser"})
      }, (error) => {
        console.log(error)
      }
    )

  }

  submitHositalform(hospitalform){
    console.log(hospitalform);
    this.restclient.post('/api/posthospital',hospitalform).subscribe(
      (result) => {
        this.closeHospitalModal();
        this.routeUser({"email":this.user.email,"roletype":"hospitalManager"})
      }, (error) => {
        console.log(error)
      }
    )
  }

  submitBloodBankform(bloodBankform){
    console.log(bloodBankform);
    this.restclient.post('/api/postbloodbank',bloodBankform).subscribe(
      (result) => {
        this.closeBloodBankModal()
        this.routeUser({"email":this.user.email,"roletype":"bloodBankManager"})
      }, (error) => {
        console.log(error)
      }
    )
  }


  openRoleModal() {
    this.roleModal = true;
  }
  closeRoleModal() {
    this.roleModal = false;
  }

  openUserModal() {
    this.userModal = true;
  }
  closeUserModal() {
    this.userModal = false;
  }
  openHospitalModal() {
    this.hospitalModal = true
  }
  closeHospitalModal() {
    this.hospitalModal = false;
  }

  openBloodBankModal() {
    this.bloodbankmodal = true;
  }
  closeBloodBankModal() {
    this.bloodbankmodal = false;
  }
}
