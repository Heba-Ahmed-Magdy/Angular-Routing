import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports:[
    RouterModule.forRoot([
    { path: 'Home', component: WelcomeComponent },
    { path: 'Welcome', redirectTo: 'Home' },
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
], { relativeLinkResolution: 'legacy' })
  ],
  exports:[RouterModule]
})

export class AppRoutingModule { }
