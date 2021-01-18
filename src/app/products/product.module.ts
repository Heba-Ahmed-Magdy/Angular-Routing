import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductEditResolver } from './resolvers/product-edit.resolver';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../user/guards/auth.guard';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
     {
      path:'Products',
      canActivate:[AuthGuard],
      children:[
          {path:'',component:ProductListComponent,resolve:{products:ProductResolver}},
          {path:':id',component:ProductDetailComponent},
          {path:':id/Edit',
           component:ProductEditComponent,
           resolve:{product:ProductEditResolver},
           children:
              [
                {path:'',redirectTo:'info',pathMatch:'full'},
                {path:'info',component:ProductEditInfoComponent},
                {path:'tags',component:ProductEditTagsComponent}
              ]
          }
      ]
     }
   ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule { }
