import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest.client.service';
import { DataShareService } from '../data.share.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { } from '@types/googlemaps';

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
  hospitals: any;
  lat: number;
  lng: number;
  nearestHospital: any;

  test11()
  {
this.relativeModal=false
  }

  test111()
  {
this.sameBloodModal=false
  }
  

  age:string;
  onAge(ag){
    console.log(ag)
    if(ag>120) {
   this.age="";
   alert("Age should not be greater than 120")
  }
  }



  
 // age1:string;
  //onAge1(ag){
   // console.log(ag)
   // if(ag>120) {
   //this.age1="";
  // alert("Age should not be greater than 120")
 // }
 // }
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
console.log(this.currentUserProfile.sameblood);
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
//   // }
email:any;
name:any;
phonenumber:any;

email1:any;
name1:any;
phonenumber1:any;


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

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
  i:number=0;
 // samebloods:any[]=[];
  submitSameBloodForm(sameBloodForm) {
    this.currentUserProfile.sameblood.push(sameBloodForm);
    // this.email1="";
    // this.age1="";
    // this.phonenumber1="";
    // this.name1="";
   // console.log(this.samebloods);
    this.currentUserProfile.sameblood=this.currentUserProfile.sameblood;
    this.updateUserData();
   // this.sameBloodModal = false;
  }
 // relatives:any[]=[];
  submitrelativeForm(relativeForm) {
    this.currentUserProfile.relatives.push(relativeForm)
    // this.email="";
    // this.age="";
    // this.phonenumber="";
    // this.name="";
    
   // console.log(relativeForm);
    this.currentUserProfile.relatives=this.currentUserProfile.relatives;
    //this.relativeModal = false;
  }

  emergency() {
    this.getLocationOfUser();
    this.getAllHospitals();
    var a,b;
    setTimeout(() => {
      
    let nearesthospital=this.hospitals[0];
   for(var i=0;i < this.hospitals.length - 1;i++){
   a=this.calculateDistance(this.hospitals[i].location.latitutde,this.hospitals[i].location.longitude);
   b= this.calculateDistance(this.hospitals[i+1].location.latitutde,this.hospitals[i+1].location.longitude);
   console.log(a,b);
    if(a<b){
      nearesthospital=this.hospitals[i];
    }
   }
   
   this.nearestHospital=nearesthospital;
   this.postNotification();
    }, 1000);


  }
  getAllHospitals() {
    this.restclient.get('api/hospitalcollection').subscribe(
      (result) => {
        this.hospitals = result;        
      }, (error) => {
        console.log("Error fetching hospital Details")
      });
  }

  postNotification(){
    let usernotify={
      'user':this.currentUserProfile,
      
      'hospital':this.nearestHospital,
      'location':{
        'lat':this.lat,
        'lon':this.lng
      },
    }
    this.restclient.post('api/notify', usernotify).subscribe((result) => {
      if (result) {
        console.log(result);
      }
    }, (error) => {
      console.log(error);
    })
  }
  OpenRelativeModal() {
    this.relativeModal = true;
  }
  OpenSameBLoodModal() {
    this.sameBloodModal = true;
  }
  getLocationOfUser(){
    if (navigator.geolocation) {
      setTimeout('',1000);
          navigator.geolocation.getCurrentPosition((geoSuccess) => {
         console.log(geoSuccess);
         this.lat=geoSuccess.coords.latitude;
         this.lng=geoSuccess.coords.longitude;
          },
          (geoError)=>{
             console.log(geoError);
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
  }

  calculateDistance(lati,longi){
    var distance=((this.lat -lati)*(this.lat -lati))+((this.lng-longi)*(this.lng-longi));
    distance=Math.sqrt(distance);
    console.log(distance);
    return distance;
  }
  


}
