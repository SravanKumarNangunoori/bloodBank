import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest.client.service';

import { } from '@types/googlemaps';
import { HttpHeaderResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';


@Component({
    selector: 'app-hospital',
    templateUrl: './hospital.component.html',
    styleUrls: ['./hospital.component.scss']

})
export class HospitalComponent implements OnInit {
    showEmergency: boolean;
    emergencyNotification: any;
    assitedPatients: any;

    constructor(private restclient: RestClientService) { }
    mockData: any;
    getdata: any;
    firstdata: string;
    showForm: boolean;
    hospitals: any;
    hospital: any;
    activeHospitalId: any;
    showHospitalDetails: boolean;
    sho: boolean = true;
    shwForm: boolean;
    temp: any;
    relativeModal:boolean;
    bloodbanklist:any;

    ngOnInit() {
        //this.mockData = { "Name": "Albany HOSPITAL","Address":"Albany","Apos":30,"Bpos":20,"ABpos":40,"Opos":25,"Aminus":30,"Bminus":20,"ABminus":40,"Ominus":25}
        this.showForm = false;
        this.assitedPatients=[];
        this.showHospitalDetails = false;
        this.showhospitaldata();
        this.checkNotification();
        this.temp = setInterval(() => {
            this.checkNotification();
        }, 5000);
        this.showEmergency = true;
    }
    ngOnDestroy() {
        clearInterval(this.temp);
    }


    checkNotification() {
        this.restclient.get('/api/getNotification').subscribe(
            (result) => {
                this.notification(result);
            }
        )
    }
    notification(result): any {
        console.log(result);

        result.forEach(element => {
            console.log(element);
            if (element.hospital.email == localStorage.getItem('userid')) {
                if (this.emergencyNotification != null) {
                    if (this.emergencyNotification.user.email != element.user.email) {
                        this.showEmergency = true;
                    }
                }
                this.emergencyNotification = element;
                // alert("Emergency at location"+element.location.lat + '  '+element.location.lon + 'by' + element.user.name);        
            }
        });
    }
    // selectChange(event: any) {
    //     //this.showHospital(event.target.value);
    // }
    //     this.showHospitalDetails = false;
    //     this.showhospitaldata();
    // }

    selectChange(event: any) {
        //this.showHospital(event.target.value);
    }
    selectDetailChange(event: any) {
        for (var i = 0; i < this.hospitals.length; i++) {
            if (this.hospitals[i]._id == event.target.value) {
                this.activeHospitalId = event.target.value;
                return;
            }
        }
    }
    reportEmergency(){
        this.assitedPatients.push(this.emergencyNotification);
        console.log(this.assitedPatients);
        this.emergencyNotification=null;
        this.restclient.post('api/reportHospitalEmergency',{}).subscribe(
            (result)=>{
                console.log(result);
            }
        )
    }
    OpenEmergencyModal()
    {
    this.relativeModal=true;
    this.restclient.get('api/hospital').subscribe((result)=>{
        this.bloodbanklist=result;
        console.log("success")
        
      }, (error)=>{
        console.log(error);
      })
    
    }
    
    onFormSubmitTobb(event)
    {
    console.log(event);
    this.restclient.post('api/hospital', event).subscribe((result)=>{
        
        console.log("success")
        
      }, (error)=>{
        console.log(error);
      })
    }
    ref()
{
    this.relativeModal=false;  
}



    showHospital() {
        this.showHospitalDetails = false;
        let email = (localStorage.getItem('userid'));
        for (var i = 0; i < this.hospitals.length; i++) {
            if (this.hospitals[i].email == email) {
                this.hospital = this.hospitals[i];
                this.activeHospitalId = this.hospitals[i]._id;
                console.log(this.hospital);
                return;
            }
        }
    }
    // Update hospital data
    onFormSubmit(event) {
        var postadata = this.hospital;
        this.restclient.post('api/updatehospital', postadata).subscribe((result) => {
            if (result) {
                this.showhospitaldata();
            }
        }, (error) => {
            console.log(error);
        })
    }
    serializeForm(form) {
        var obj = {};
        var elements = form.querySelectorAll("input, select, textarea");
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                obj[name] = value;
            }
        }

        return obj;
    }
    //get hospital data
    gethospitaldata() {

        console.log("hospital");
        var that = this;
        this.restclient.get('api/hospitalcollection').subscribe(
            (result) => {
                //var inp1 = document.getElementById("Name");
                //var inp2 = document.getElementById("Address");
                that.hospitals = result;
                that.showHospital();
                that.showForm = this.sho;
                that.shwForm = !this.sho;
                that.showHospitalDetails = false;
            }, (error) => {
                console.log(error);
            })
    }

    showhospitaldata() {
        var that = this;
        this.restclient.get('api/hospitalcollection').subscribe(
            (result) => {
                that.hospitals = result;
                that.showHospitalDetails = true;
                that.showForm = false;
                this.shwForm = true;
                that.getCurrentLoggedInUser();
            }, (error) => {
                console.log(error);
            })
    }

    getCurrentLoggedInUser() {
        let email = (localStorage.getItem('userid'));
        for (var i = 0; i < this.hospitals.length; i++) {
            if (this.hospitals[i].email == email) {
                this.hospital = this.hospitals[i];
                this.activeHospitalId = this.hospitals[i]._id;
                console.log(this.hospital);
                return;
            }
        }
    }

    //post hospital data
    posthospitaldata() {
        console.log("hospital post");
        this.restclient.post('api/posthospital', this.mockData).subscribe(
            (result) => {
                console.log("data is", result);

            }, (error) => {
                console.log(error)
            })
    }
    deleteall() {
        this.restclient.post('api/deleteall', {}).subscribe((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        })
    }
}

