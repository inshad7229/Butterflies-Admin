import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {AdminService} from '../../shared/services/admin/admin.service'
import { PageHeaderModule } from './../../shared';

import { HobbiesIconsRoutingModule } from './hobbies-icons-routing.module';
import { HobbiesIconsComponent,HobbiesConfirmation } from './hobbies-icons.component';

@NgModule({
  imports: [
    CommonModule,
    HobbiesIconsRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
	FormsModule,
	MatSortModule,
	NgxPaginationModule,
	MatPaginatorModule,
	MatDialogModule,
	ToastModule.forRoot(),
  ],
  declarations: [HobbiesIconsComponent,HobbiesConfirmation],
   providers:[AdminService],
  entryComponents:[HobbiesConfirmation]
})
export class HobbiesIconsModule { }
