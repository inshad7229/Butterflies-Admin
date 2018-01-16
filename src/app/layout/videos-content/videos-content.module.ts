import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {AdminService} from '../../shared/services/admin/admin.service'
import { PageHeaderModule } from './../../shared';

import { VideosContentRoutingModule } from './videos-content-routing.module';
import { VideosContentComponent,VideoContentConfirmation} from './videos-content.component';

@NgModule({
  imports: [
    CommonModule,
    VideosContentRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
	FormsModule,
	MatSortModule,
	NgxPaginationModule,
	MatPaginatorModule,
	MatDialogModule,
	ToastModule.forRoot(),
  ],
  declarations: [VideosContentComponent,VideoContentConfirmation],
  providers:[AdminService],
  entryComponents:[VideoContentConfirmation]
})
export class VideosContentModule { }
