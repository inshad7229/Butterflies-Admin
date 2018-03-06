import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserdetailComponent} from './userdetail.component'

const routes: Routes = [ {
    	path:'',
    	component:UserdetailComponent
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdetailRoutingModule { }
