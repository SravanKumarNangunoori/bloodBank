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
  emergencyHospital:string;
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
      age: ['', Validators.required,Validators.max(100), Validators.min(0)],

    });
    this.sameBloodForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phonenumber: ['', Validators.required],
      age: ['', Validators.required,Validators.max(100), Validators.min(0)]

    })
  }

 
  ///get user data
  getUserprofile() {
    this.restclient.get('/api/usercollection').subscribe(
      (result) => {
        this.userProfiles = result;
       
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
  
email:any;
name:any;
phonenumber:any;




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
 
  submitSameBloodForm(sameBloodForm) {
    let testsample={
      sameblood:sameBloodForm
    }
    
    // this.currentUserProfile.push(testsample);    
    this.currentUserProfile.sameblood.push(sameBloodForm);
    this.updateUserData();
   this.sameBloodModal = false;
  }
 
  submitrelativeForm(relativeForm) {
    let testsample={
      relatives:relativeForm
    }
    
    this.currentUserProfile.relatives.push(relativeForm);
   
    // this.currentUserProfile.relatives=testsample;
    this.updateUserData();
    this.relativeModal = false;
  }

  emergency() {
    this.getLocationOfUser();
    this.getAllHospitals();
    var a,b;
    setTimeout(() => {
      
    a=this.calculateDistance(this.hospitals[0].location.latitude,this.hospitals[0].location.longitude);
    let nearesthospital=this.hospitals[0];
   for(var i=0;i < this.hospitals.length - 1;i++){
   b=this.calculateDistance(this.hospitals[i].location.latitude,this.hospitals[i].location.longitude);   
    if(a>b){
      nearesthospital=this.hospitals[i];
    }
   }
   
   this.nearestHospital=nearesthospital;
   console.log(this.nearestHospital);
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
    let d=this.getDistanceFromLatLonInKm(this.lat,this.lng,lati,longi);
    console.log(d);
    return d;
  }
  

getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
}
