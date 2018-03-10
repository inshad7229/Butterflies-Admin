import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {AdminService} from '../../shared/services/admin/admin.service'

import { EventsDetailsRoutingModule } from './events-details-routing.module';
import { EventsDetailsComponent } from './events-details.component';

@NgModule({
  imports: [
    CommonModule,
    EventsDetailsRoutingModule,
    PageHeaderModule
  ],
  declarations: [EventsDetailsComponent],
   providers:[AdminService]
})
export class EventsDetailsModule { }
