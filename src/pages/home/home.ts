import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { ProfileProvider } from './../../providers/profile/profile';
import 'firebase/database'
import firebase from 'firebase/app';


@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content:Content;
  message:string;
  userProfile;
  firstName:string;
  email:string;
  roomkey:string;
  offStatus:boolean=false;
  chatRef:firebase.database.Reference;
  firebaseRef:firebase.database.Reference;
  chats=[];
  data={
    type:'',
    message:''
  }
  joinData={};

  constructor(public navCtrl: NavController, private navParams: NavParams, private serviceProfile:ProfileProvider, private ServiceAuth:AuthProvider) {
     this.roomkey=this.navParams.get('key') as string;
     this.userProfile=this.navParams.get('userProfile');
     this.chatRef=firebase.database().ref(`/userProfile/chatRooms/${this.roomkey}/chats`).push();
     this.data.type='message';
     let joinData={
       type:'join',
       user:this.userProfile.firstName,
       message:this.userProfile.firstName +' has joined this room',
       sentDate:Date()
     }
     this.chatRef.set(joinData);
     this.data.message='';
     firebase.database().ref(`/userProfile/chatRooms/${this.roomkey}/chats`).on('value',resp=>{
       this.chats=[];
       this.chats=snapShotToArray(resp);
       setTimeout(()=>{
         if(this.offStatus===false){
           this.content.scrollToBottom(300)
         }
       }),1000
     })
     console.log("chats array",this.chats)
   
  }
  ionViewCanEnter(){
    this.serviceProfile.getUserProfile().off;
  }
  ionViewDidLoad() {
    this.serviceProfile.getUserProfile().on('value',userprofileSnapShot=>{
      this.userProfile=userprofileSnapShot.val();
      this.firstName=userprofileSnapShot.val().firstName;
      this.email=userprofileSnapShot.val().email;
    })
  }
 

  signOut(){
    this.ServiceAuth.signOut().then(()=>{
       this.navCtrl.setRoot('LoginPage');
    });
    
  }
  gotoRooms(){
     this.navCtrl.setRoot('RoomsPage'); 
  }
  profile(){
    
    this.navCtrl.setRoot('ProfilePage'); 
  }
  exitChat(){
      let exitData=firebase.database().ref(`/userProfile/chatRooms/${this.roomkey}/chats`).push().set({
        type:'exit',
        user:this.userProfile.firstName,
        sentDate:Date(),
        message:this.userProfile.firstName+' has exited the room'
      });
      this.signOut();
  }
  getChats(){
    return this.chats
  }
  sendMessage(){
    firebase.database().ref(`/userProfile/chatRooms/${this.roomkey}/chats`).push().set({
      type:this.data.type,
      user:this.userProfile.firstName,
      message:this.data.message,
      sentDate:Date()
    });
    this.message='';
  }
}
export const snapShotToArray=shapShot=>{
  let returnArr=[];
  shapShot.forEach(childSnapshot=>{
    let item=childSnapshot.val();
    returnArr.push(item);
  });
  console.log('array',returnArr)
  return returnArr;
}





