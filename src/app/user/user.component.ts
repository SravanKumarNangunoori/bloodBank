import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest.client.service';
import { DataShareService } from '../data.share.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: any;
  mockData: any;
  userProfiles: {};
  currentUserProfile: any;
  relativeModal: boolean;
  sameBloodModal: boolean;
  relativeForm: FormGroup;
  sameBloodForm: FormGroup;

  constructor(private restclient: RestClientService,
    private dataservice: DataShareService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userData = this.dataservice.getUserData();
    this.getUserprofile();
    this.relativeForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phonenumber: ['', Validators.required],
      age: ['', Validators.required],

    });
    this.sameBloodForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phonenumber: ['', Validators.required],
      age: ['', Validators.required]

    })

  }


  ///get user data
  getUserprofile() {
    this.restclient.get('/api/usercollection').subscribe(
      (result) => {
        this.userProfiles = result;
        // console.log(this.userProfiles);
        this.getCurrentUserProfie();
      }, (error) => {
        console.log(error);
      }
    )
  }
  getCurrentUserProfie() {
    console.log("gettingCurrent USr profiel");
    let usrprofiles: any = this.userProfiles;
    usrprofiles.forEach(element => {
      if (this.userData.email == element.email) {
        this.currentUserProfile = element;
        console.log("current user profile", this.currentUserProfile);
      }

    });
  }
  //post user Data
  // postUserData() {
  //   this.restclient.post('/api/usercollection', this.mockData).subscribe(
  //     (result) => {
  //       console.log("Sucess");
  //     }, (error) => {
  //       console.log(error)
  //     }
  //   )
  // }

  updateUserData(){
    this.restclient.post('api/updateUser', this.currentUserProfile).subscribe((result)=>{
      if(result){
        console.log(result);
        this.getUserprofile();
      }
    }, (error)=>{
      console.log(error);
    })
  }

  submitSameBloodForm(sameBloodForm) {
    console.log(sameBloodForm);
    this.currentUserProfile.sameblood.push(sameBloodForm);
    this.updateUserData();
    this.sameBloodModal = false;
  }
  submitrelativeForm(relativeForm) {
    console.log(relativeForm);
    this.currentUserProfile.relatives.push(relativeForm);
    this.updateUserData();
    this.relativeModal = false;
  }

  OpenRelativeModal() {
    this.relativeModal = true;
  }
  OpenSameBLoodModal() {
    this.sameBloodModal = true;
  }
}
