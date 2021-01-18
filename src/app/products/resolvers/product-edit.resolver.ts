import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { ProductResolved } from '../product';
import { ProductService } from '../product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductEditResolver implements Resolve<ProductResolved> {
  constructor(private productService: ProductService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    let id= route.paramMap.get('id');

    if(isNaN(+id)){
      return of({error:'nooooo'} as ProductResolved)
    }
    return this.productService.getProduct(+id)
    .pipe(
      map(products=>({product:products})),
      catchError(error=>(of({error:'nooooo'} as ProductResolved)))
    );
  }
}
