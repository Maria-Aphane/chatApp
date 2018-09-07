import { HomePage } from './../home/home';
import { ChatroomsProvider } from './../../providers/chatrooms/chatrooms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, Content } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {
  name:string;
  chatRoomList:Array<any>;
 
  userProfile:any;
 
   constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private chatRoomsPro:ChatroomsProvider,
      private alertCtrl:AlertController,private authPro:AuthProvider,private profileService:ProfileProvider) {
 
   }
  ionViewCanEnter(){
   this.chatRoomsPro.getChatRoomList().off();
  }
 
  ionViewWillEnter(){
   
 
   this.chatRoomsPro.getChatRoomList().on('value',chatRoomsElistSnapShot=>{
     this.chatRoomList=[];
   
     chatRoomsElistSnapShot.forEach(snap=>{
       this.chatRoomList.push({
         id:snap.key,
         name:snap.val().chatRoomName
       });
       return false;
     })
      })
   this.profileService.getUserProfile().on('value',userProfileSnapShot=>{
     this.userProfile=userProfileSnapShot.val();
   console.log("profile",this.userProfile)
   })
      
     }
 
 
  joinRoom(key){
 console.log(this.userProfile)
 
 if (!this.userProfile.hasOwnProperty('firstName') || !this.userProfile.hasOwnProperty('lastName')){
   console.log('does not contain firstname')
   let alert:Alert=this.alertCtrl.create({
   
     message:"update profile before you enter a chatroom",
   
     buttons:[{
       text:'cancel',
       role:'cancel'
     },{
       text:'update profile',
       handler:data =>{
         this.navCtrl.push('ProfilePage')
       }
     }]
   })
   alert.present()
     } else{//you go to the chatroom
   this.navCtrl.setRoot(HomePage,{'key':key,'userProfile':this.userProfile});
 }
   
  }
  
 createRoom()
 {
   let alert:Alert=this.alertCtrl.create({
     message:"please enter chat room?",
     inputs: [
       {
         name: 'roomName',
         placeholder: 'room name'
       } ],
     buttons: [{
         text: 'Cancel',
        role:'cancel',
       },
       {
         text: 'create room',
         handler:data=>{
           console.log(data.roomName);
           this.chatRoomsPro.createRoom(data.roomName)
           .then(newchatRoom=>{
             console.log(newchatRoom);
         })
       }
       }],
       cssClass:'alertCustomCss'
     })
     alert.present();
   }
   logOut(){
     this.authPro.signOut().then(()=>{
       this.navCtrl.setRoot('LoginPage');
     })
   }
   gotoProfile(){
     this.navCtrl.push('ProfilePage');
   }

   showPrompt() {
    const prompt = this.alertCtrl.create({
      
      message: "Enter your name to order coffee",

      inputs: [
        {
          name: 'name',
          type:'text',
          placeholder: 'Enter you name '
        },
      ],
      buttons: [
        {
          text: 'GO',
        }

      ],  
      cssClass: 'alertCustomCss'
    });
  
    prompt.present();
  }
 }
 
 
 
 