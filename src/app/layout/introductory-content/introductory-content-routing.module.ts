import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IntroductoryContentComponent} from './introductory-content.component'

const routes: Routes = [
   {
    	path:'',
    	component:IntroductoryContentComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroductoryContentRoutingModule { }
