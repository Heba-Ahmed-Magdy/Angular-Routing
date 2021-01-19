import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UserCanLGuard } from './user/guards/user-can-l.guard';
import { UserModule } from './user/user.module';

@NgModule({
  imports:[
    RouterModule.forRoot([
    { path: 'Home', component: WelcomeComponent },
    { path: 'Welcome', redirectTo: 'Home' },
    { path: 'LogIn',
      // canLoad:[UserCanLGuard],
      loadChildren:()=>
            import('./user/user.module')
            .then(m=>m.UserModule)
     },
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
    ],
     { relativeLinkResolution: 'legacy',
      //  preloadingStrategy:PreloadAllModules
       }
     )
  ],
  exports:[RouterModule]
})

export class AppRoutingModule { }
