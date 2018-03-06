import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule,MatExpansionModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {AdminService} from '../../shared/services/admin/admin.service'
import { PageHeaderModule } from './../../shared';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';

@NgModule({
  imports: [
    CommonModule,
    FaqRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
	FormsModule,
	MatSortModule,
	NgxPaginationModule,
	MatExpansionModule,
	MatPaginatorModule,
	MatDialogModule,
	ToastModule.forRoot(),
  ],
  declarations: [FaqComponent],
   providers:[AdminService],
})
export class FaqModule { }
