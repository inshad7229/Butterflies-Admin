import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {AdminService} from '../../shared/services/admin/admin.service'
import { PageHeaderModule } from './../../shared';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';

@NgModule({
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
	FormsModule,
	MatSortModule,
	NgxPaginationModule,
	MatPaginatorModule,
	MatDialogModule,
	ToastModule.forRoot(),
  ],
  declarations: [AboutUsComponent],
  providers:[AdminService],
})
export class AboutUsModule { }
