import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HobbiesIconsComponent} from './hobbies-icons.component'

const routes: Routes = [
  {
    	path:'',
    	component:HobbiesIconsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HobbiesIconsRoutingModule { }
