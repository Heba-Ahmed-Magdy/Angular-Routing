import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCanLGuard implements CanLoad {
  canLoad(route: Route, segments: UrlSegment[]): boolean  {
        return confirm('would u like to download?')
  }
}
