import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

import { SharedModule } from '../shared/shared.module';
import { User_RoutingModule } from './User_Routing.module';
import { USerService } from './USer.service';

@NgModule({
  imports: [
    SharedModule,
    User_RoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers:[USerService]
})
export class UserModule { }
