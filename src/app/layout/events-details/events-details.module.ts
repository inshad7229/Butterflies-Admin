import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {AdminService} from '../../shared/services/admin/admin.service'
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { EventsDetailsRoutingModule } from './events-details-routing.module';
import { EventsDetailsComponent } from './events-details.component';

@NgModule({
  imports: [
    CommonModule,
    EventsDetailsRoutingModule,
    PageHeaderModule,
    ToastModule.forRoot(),
  ],
  declarations: [EventsDetailsComponent],
   providers:[AdminService]
})
export class EventsDetailsModule { }
