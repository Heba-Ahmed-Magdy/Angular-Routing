import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  imports:[
    RouterModule.forChild([
      {path:'LogIn',component:LoginComponent}
    ])
  ],
  exports:[RouterModule]
})
export class User_RoutingModule {
}
