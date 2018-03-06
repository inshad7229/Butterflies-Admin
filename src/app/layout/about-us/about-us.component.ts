import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Component, OnInit,ViewChild,Inject,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {Sort} from '@angular/material';
import { ToastsManager , Toast} from 'ng2-toastr';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { routerTransition } from '../../router.animations';
import {AdminService} from '../../shared/services/admin/admin.service'
import {PageEvent} from '@angular/material';
import {ENV} from '../../env'

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [routerTransition()]
})
export class AboutUsComponent implements OnInit {
verifiactionForm:FormGroup
  AboutUSlist
  sortedData
  users=[];
  listIndex=1;
  listSize=10
  pageIndex=0  
  pageSize=1
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  datamodel
  editStatus:boolean=false
  icon
  icons_selected

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  constructor(public router: Router, private fb: FormBuilder,private adminService:AdminService,public dialog: MatDialog,vcr: ViewContainerRef,
                private toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(vcr);
    this.datamodel={}
    this.verifiactionForm = fb.group({
                'para_one': [null, Validators.compose([Validators.required,Validators.maxLength(1000)])],
                'para_two': [null, Validators.compose([Validators.required,Validators.maxLength(1000)])],
            
        }) }

  ngOnInit() {
    this.onGetList()    
  }
  onGetList(){
     this.datamodel={}
      this.users=[]
    this.adminService.getAboutUsAdmin()
        .subscribe(data=>{
            if(data.response){;
              this.AboutUSlist=data.result
              this.toastr.success('About Us' ,'Success',{toastLife: 2000, showCloseButton: true});
              //this.sortedData=data.result 
             if (this.AboutUSlist.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.AboutUSlist.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.AboutUSlist[i])
                 this.sortedData = this.users.slice();

                }
            }else{
              this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true});    
            }
        })
  }
  getClass(i){
    if (i%2==0) {
     return 'table-success'
    }else{
      return 'table-info'
    }
  }
  sortData(sort: Sort) {
    const data =this.users.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name.trim(), b.name.trim(), isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }

   pageoption(event){
      this.pageSize=event.pageSize
      this.pageIndex=event.pageIndex
      this.users=[]
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
          if(i==this.AboutUSlist.length){
            break;
          }else{
              this.users.push(this.AboutUSlist[i])
                 this.sortedData = this.users.slice();

            }
     }
     
}

onEdit(country){
  this.datamodel=Object.assign({}, country)
}
onReset(){
  this.datamodel={}
  this.datamodel.imge=''
   this.datamodel.image_url=''
}
onSubmit(){
  if (this.datamodel.id) {
      this.adminService.editintAboutUsContent(this.datamodel)
        .subscribe(data=>{
            if(data.response){;
             //  let index=this.AboutUSlist.map(function (img) { return img.id; }).indexOf(this.datamodel.id)
             //  this.toastr.success('Hobbies Edited' ,'Success',{toastLife: 2000, showCloseButton: true});
             //  this.AboutUSlist[index].name=this.datamodel.name;
             // if (this.AboutUSlist.length>5){
             //      this.pageSize=5
             //    }else{
             //      this.pageSize=this.AboutUSlist.length  
             //    }
             //    for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
             //     this.users.push(this.AboutUSlist[i])
             //     this.sortedData = this.users.slice();

             //    }
             this.onGetList()
            }else{
              this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true});  
            }
        })
  }else{
      // this.adminService.addHobbies(this.datamodel)
      //   .subscribe(data=>{
      //       if(data.response){;
      //        this.onGetList()
      //         this.toastr.success('Hobbies Added Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});

      //       }else{
      //          this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
      //       }
      //   })
  }
}
onChange(data){
this.adminService.updateHobbiesStatus(data)
        .subscribe(data=>{
            if(data.response){;
            // this.onGetList()
              this.toastr.success('Hobbies updated Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});

            }else{
               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
            }
        })
}
//this.customersList.map(function (img) { return img.customer_id; }).indexOf(this.appointMents[i].customer_id)==-1
onDelete(id){
    this.adminService.oneDeleteHobbies(id)
        .subscribe(data=>{
            if(data.response){;
              this.AboutUSlist=this.AboutUSlist.filter(arg=>arg.id!=id)
              this.toastr.success('Hobbies deleted' ,'Success',{toastLife: 2000, showCloseButton: true});
              this.users=[]
             if (this.AboutUSlist.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.AboutUSlist.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.AboutUSlist[i])
                 this.sortedData = this.users.slice();

                }
            }else{
                
            }
        })

}


opendelete(data): void {
        let dialogRef = this.dialog.open(HobbiesConfirmation, {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => {
         if (result) {
           this.onDelete(data.id)
         }
        });
    }

 getImagePath(path){
   if (path.indexOf('base64')==-1) {
      return ENV.img+'about_us/'+path
     // code...
   }else{
     return path
   }
 }

   onunselectedImageUpload(evt: any,i){
     if (!evt.target) {
            return;
        }
        if (!evt.target.files) {
            return;
        }
        if (evt.target.files.length !== 1) {
            return;
        }
        const file = evt.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
            return;
        }
        const fr = new FileReader();
        fr.onloadend = (loadEvent) => {
            //this.saloonImage[i].image= fr.result;
            this.datamodel.image_url=fr.result
            //console.log(this.saloonImage[i].image)
            
        };
        fr.readAsDataURL(file);
    
}


  onselectedImageUpload(evt: any,i){
     if (!evt.target) {
            return;
        }
        if (!evt.target.files) {
            return;
        }
        if (evt.target.files.length !== 1) {
            return;
        }
        const file = evt.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
            return;
        }
        const fr = new FileReader();
        fr.onloadend = (loadEvent) => {
            //this.saloonImage[i].image= fr.result;
            this.datamodel.icons_selected=fr.result
            //console.log(this.saloonImage[i].image)
            
        };
        fr.readAsDataURL(file);
    
}

onRemoveImageunselected(){
   this.datamodel.image_url=''
}
onRemoveImageselected(){
  this.datamodel.icons_selected=''
}

}


function compare(a, b, isAsc) {
  if(a&&isNaN(a)){
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  }else{
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}



@Component({
  selector: 'hobbies-confirmation-dialog',
  templateUrl: 'confirmation.html',
  animations: [routerTransition()]
})

export class HobbiesConfirmation {
   

  constructor(
    public dialogRef: MatDialogRef<HobbiesConfirmation>,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private adminService: AdminService,
        public dialog: MatDialog) {
       }

  onYesClick(): void {
    this.dialogRef.close('yes');
    // this.homePage.onDelete(this.data.admin)
  }
   onNoClick(): void {
    this.dialogRef.close();
  }


 

}