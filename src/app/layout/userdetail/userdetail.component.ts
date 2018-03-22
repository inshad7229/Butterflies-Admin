import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ToastsManager , Toast} from 'ng2-toastr';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import {AdminService} from '../../shared/services/admin/admin.service'
import  {ENV} from '../../env'

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
	id
  req
	userDetail
	imagePath
	profile_image

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
	  this.adminService.userDetailsAdmin(this.id).subscribe(data=>{
	         this.userDetail=data.result;
	         this.profile_image=this.imagePath+"users_profile/"+data.result.profile_image
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
   onPicStatusChange(data,flag){
   // alert('hy')
    this.req.id=data.id
    this.req.flag=flag
    this.req.name=data.name
    this.req.email=data.email
     this.adminService.userPicStatusChange(this.req)
        .subscribe(data=>{
            if(data.response){
                     this.userDetail.profile_pic_status=flag
                    this.toastr.success('Events Status Updated Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});
                  //this.usersList();
              
            }else{
               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
            }
        })
  }
}
