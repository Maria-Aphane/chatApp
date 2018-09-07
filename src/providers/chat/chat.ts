import { Injectable } from '@angular/core';
import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class ChatProvider {
chatRef:firebase.database.Reference
  constructor() {
    firebase.auth().onAuthStateChanged(user=>{
      if (user){
        this.chatRef=firebase.database().ref(`/userProfile/${user.uid}/chatRooms`).push()
      }
     
    })
  }
startChat(data){

this.chatRef.set(data)
}
getChats():firebase.database.Reference{
  return this.chatRef;
}


}
