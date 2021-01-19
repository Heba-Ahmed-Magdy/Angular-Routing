import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading:boolean=false;
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService,private router:Router) {
    router.events.subscribe((e)=>{
      if(e instanceof NavigationStart)
      {
        this.loading=true;
      }
      if(e instanceof NavigationEnd || e instanceof NavigationError || e instanceof NavigationCancel)
      {
        this.loading=false;
      }
    })
   }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
