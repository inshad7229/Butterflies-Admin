import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ToastsManager , Toast} from 'ng2-toastr';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import {AdminService} from '../../shared/services/admin/admin.service'
import  {ENV} from '../../env'
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.scss'],
  animations: [routerTransition()]
})
export class EventsDetailsComponent implements OnInit {
	id
	userDetail
	imagePath
	profile_image
  req

  constructor(private adminService:AdminService,public router: Router,private route: ActivatedRoute,private toastr: ToastsManager,vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr); 
     this.req={}
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

  onStatusChange(data,flag){
   // alert('hy')
      this.req.id=data.id
      this.req.flag=flag
      this.req.name=data.usersDetails.name
      this.req.email=data.usersDetails.email
      this.req.title=data.title
     this.adminService.eventStatusChange(this.req)
        .subscribe(data=>{
            if(data.response){
                     this.userDetail.approved_status=flag
                    this.toastr.success('Events Status Updated Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});
                  //this.usersList();
              
            }else{
               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
            }
        })
  }
  // onReject(){

  // }
  // onPending(){

  // }

}
