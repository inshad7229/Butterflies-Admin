import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsDetailsComponent} from './events-details.component'

const routes: Routes = [ {
    	path:'',
    	component:EventsDetailsComponent
    }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsDetailsRoutingModule { }
