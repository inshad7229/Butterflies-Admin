import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent,Email } from './contact-us.component';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule} from '@angular/material';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
// import {MatDividerModule} from '@angular/material/divider';
import { Http ,Headers,RequestOptions,ResponseContentType,HttpModule} from '@angular/http';

import {AdminService} from '../../shared/services/admin/admin.service'

@NgModule({
  imports: [
    CommonModule,PageHeaderModule,
	NgxPaginationModule,
	MatPaginatorModule,
	MatDialogModule,
  ContactUsRoutingModule,ReactiveFormsModule,
	FormsModule,
  HttpModule
  ],
  declarations: [ContactUsComponent,Email],
  providers:[AdminService],
  entryComponents:[Email]
})
export class ContactUsModule { }
