import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { HospitalComponent } from './hospital/hospital.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  { path: 'bloodBank', component:BloodBankComponent  },
  
  { path: 'user', component:UserComponent  },
  
  { path: 'hospital', component:HospitalComponent  },
  
  { path: '', redirectTo: '/user', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    BloodBankComponent,
    HospitalComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
