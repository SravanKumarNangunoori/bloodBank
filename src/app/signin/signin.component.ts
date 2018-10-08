import { Component, OnInit, Input } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { RestClientService } from '../rest.client.service';


@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: 'modal.html'
})
export class NgbdModalContent {
  @Input() name;
  @Input() email;
  @Input() dob:string;
  constructor(private restclient: RestClientService) {}
  public save(){
    console.log("Save"+this.name+this.email+this.dob);
  }
}




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor( private socialAuthService: AuthService,private modalService: NgbModal, private restclient:RestClientService ) {}
  user:any;
  closeResult:String;
  ngOnInit(){}
  public socialSignIn() {
      let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;   
    console.log()
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(" sign in data : " , userData);
        this.user=userData;
        if(this.user){
          const modalRef=this.modalService.open(NgbdModalContent)
          modalRef.componentInstance.name=this.user.name;
          modalRef.componentInstance.email=this.user.email;
        }
      }
    );
  }
  postUserData() {
    this.restclient.post('http://localhost:3000/api/socialSignIn').subscribe(
      (result) => {
        console.log("Sucess");
      }, (error) => {
        console.log(error)
      }
    )
  }
  
  
}
