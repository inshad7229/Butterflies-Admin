import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import {AdminService} from '../../shared/services/admin/admin.service'
import  {ENV} from '../../env'


@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.scss']
})
export class EventsDetailsComponent implements OnInit {
	id
	userDetail
	imagePath
	profile_image

  constructor(private adminService:AdminService,public router: Router,private route: ActivatedRoute) 
  {
  	this.route.params.subscribe(res => {
	  		console.log(res.id)
	  		this.id=res.id
	  	});
  }

  ngOnInit() {
  	this.userDetailsAdmin();
  	console.log(ENV.imgApi);
  	this.imagePath=ENV.imgApi
  }

  userDetailsAdmin(){
	  this.adminService.eventDetailsAdmin(this.id).subscribe(data=>{
	         this.userDetail=data.data;
	         this.profile_image=this.imagePath+"user_events/"+data.data.attachement
	             console.log(data);
	         },err=>{
	             console.log(err);
	         })
  }

  onImage(data){
  	return this.imagePath+"users_images/"+data.image_url
  }

  onvideo(data){
  	console.log(data)
  	return this.imagePath+"users_videos/"+data.video_url
  }

  onApproved(){
    
  }
  onReject(){

  }
  onPending(){

  }

}
