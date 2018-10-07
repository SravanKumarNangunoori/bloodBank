import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest.client.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private restclient: RestClientService) { }
  mockData: any;
  ngOnInit() {
    this.mockData = { "name": "sravann", "age": 21 }

  }


  ///get user data
  getUsersData() {
    this.restclient.get('/api/usercollection').subscribe(
      (result) => {
        console.log("user data is", result);
      }, (error) => {
        console.log(error);
      }
    )
  }

  //post user Data
  postUserData() {
    this.restclient.post('api/postuser').subscribe(
      (result) => {
        console.log("Sucess");
      }, (error) => {
        console.log(error)
      }
    )
  }

}
