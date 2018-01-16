import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideosContentComponent} from './videos-content.component'

const routes: Routes = [
   {
    	path:'',
    	component:VideosContentComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosContentRoutingModule { }
