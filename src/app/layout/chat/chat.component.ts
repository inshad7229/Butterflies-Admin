import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Component, OnInit,ViewChild,Inject,ViewContainerRef ,AfterViewChecked,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import {Sort} from '@angular/material';
import { ToastsManager , Toast} from 'ng2-toastr';
import { forkJoin } from "rxjs/observable/forkJoin";
import {Observable} from 'rxjs/Rx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { routerTransition } from '../../router.animations';
import {AdminService} from '../../shared/services/admin/admin.service'
import { ActivatedRoute } from '@angular/router'; 

const AVATAR_URL = 'https://api.adorable.io/avatars/285';
import { ChatService } from './chat.service';
import  {ENV} from '../../env'

@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [routerTransition()]
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe')  scrollMe: ElementRef;

   usernameFormControl = new FormControl('', [Validators.required]);
  message: string;
messages: any[] = [];
roomdetails
id
reqMessage
verifiactionForm
chat
profile_image
typingStatus:boolean=false;
unreadChats=[]
  constructor(
    private chatService:ChatService,private route: ActivatedRoute,public router: Router, private fb: FormBuilder,private adminService:AdminService,public dialog: MatDialog,vcr: ViewContainerRef,
                private toastr: ToastsManager) { 
     this.verifiactionForm = fb.group({
                'chat': [null, Validators.compose([Validators.required,Validators.maxLength(1000)])],
                
            
        }) 

   this.reqMessage={}
  this.route.params.subscribe(res => {
        console.log(res.id)
        this.id=res.id
            this.reqMessage.sender_id=0
            this.reqMessage.room_id=this.id
           this.chatService.roomJoin(this.reqMessage);

      });
       this.adminService.ChatRoomIdDetails(this.id).subscribe(data=>{
            console.log(data.result);
            this.roomdetails=data.result
            this.messages=this.roomdetails.adminRoomChats
            this.reqMessage.receiver_id=this.roomdetails.user_id
            //this.scrollToBottom()
            for (var i = 0; i<this.messages.length ; i++) {
                if (this.messages[i].sender_id !=0 && this.messages[i].check_status=='unread') {
                  this.messages[i].chatfor='admin'
                   this.chatService.readMessage(this.messages[i])
                  // code...
                }
            }
          
        })


}
      
  
    sendMessage(msg) {
    this.reqMessage.sender_id=0
    this.reqMessage.room_id=this.id
    this.reqMessage.receiver_id=this.roomdetails.user_id
    this.reqMessage.message=this.chat
    this.reqMessage.created_at=new Date()
    this.reqMessage.unique_code=this.roomdetails.user_id+ new Date().getTime()
    this.reqMessage.check_status='unread'
    this.chatService.sendMessage(this.reqMessage);
    //this.messages.push(this.reqMessage)
    this.chat=''
    this.message = '';
  }

  onKey(){
     console.log('admin typein')
    this.chatService.typeIn(this.reqMessage);
  }

  onBlur(){
     console.log('admin typeout')
    this.chatService.typeOut(this.reqMessage); 
  }

  ngOnInit() {


     this.chatService
      .getMessages()
      .subscribe((message) => {
        //console.log(message)
        message.unique_code=message.unique_code.toString()
        this.messages.push(message);
       // this.scrollToBottom();
    });

      this.chatService
      .getTypeOut()
      .subscribe((message) => {
        // console.log(message)
       if (message.sender_id !=0) {
         console.log('user typeout')
          this.typingStatus=false
        }
    });

      this.chatService
      .getTypeIn()
      .subscribe((message) => {
        // console.log(message)
        if (message.sender_id !=0) {
          this.typingStatus=true
          console.log('user typein')
        }
        //this.messages.push(message);
    });


       this.chatService
      .messagechecked()
      .subscribe((message) => {
         console.log('message resad')
         console.log(message)
         console.log(JSON.stringify(this.messages[this.messages.length-1]))
         var index = this.messages.map(function (img) { return img.unique_code; }).indexOf(message.unique_code.toString())
        // var index = this.messages.map(function(o) { return o.unique_code; }).indexOf(message.unique_code);
         console.log(index)

         this.messages[index].check_status='read'
        // if (message.sender_id !=0) {
        //   this.typingStatus=true1521701251034unique_code: "1521701251034"
        //   console.log('user typein')
        // }
        //this.messages.push(message);
    });

      this.chatService
      .getFocoused()
      .subscribe((message: string) => {
        //console.log(message)
        // message.unique_code=message.unique_code.toString()
        // this.messages.push(message);
       // this.scrollToBottom();
    });

    }


    ngOnDestroy(){
      this.chatService.roomLeave(this.reqMessage);
    }

    getClass(chat){
          if (chat.sender_id== 0) {
            return 'right clearfix'
          }else if (chat.sender_id!= 0 ) {
           return 'left clearfix'
          }
    }

    getClass2(chat){
        if (chat.sender_id== 0 ) {
            return 'pull-right'
          }else if (chat.sender_id!= 0 ) {
           return 'pull-left'
          }
    }

    getImagePath(image){
      return ENV.imgApi+"users_profile/"+image
    }

    getTime(time){
    let g=new Date().getTime()-new Date(time).getTime()
    // var n = d.toLocaleString();
    console.log(d/(1000*60))
    let c=d/(1000*60)
    let e= Math.round(c)
     var s = Math.floor(g / 1000);
     var m = Math.floor(s / 60);
     var s = s % 60;
     var h = Math.floor(m / 60);
     var m = m % 60;
     var d = Math.floor(h / 24);
     var h = h % 24;
     if (d>0) {
       return d+' Days Ago'
     }else{
         if (h>0) {
          return h+' Hours Ago'
         }else{
           if (m>0) {
            return m+' Min Ago'
           }else{

             if (s<10) {
              return 'Just now'
             }else{
                 return s+' Sec Ago'
               
             }
           }
         }
       //return d+' Days Ago'
     }
    // if (e==0) {
    //   return 'Just Now'
    // }
    // else if (e <=60) {
    //   return e+' Min Ago'
    // }
    //console.log(d/60*1000)
    // let f= new Date(n)
    // console.log(f)
    }



    //  ngAfterViewChecked() {        
    //     window.scrollTo(450,document.querySelector(".chat").scrollHeight);
    // } 

    // scrollToBottom(): void {
    //     try {
    //         this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    //     } catch(err) { }                 
    // }
   private scrollToBottom(): void {
    try {
      this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

    getId(i){
      this.scrollToBottom()
      return 'li'+(i+1)
    }


    getCurrentBookingCount(data){
     Observable.interval(2000 * 60).subscribe(x => {
       //doSomething();
     })
      // console.log(this.countDown)
    }
 }