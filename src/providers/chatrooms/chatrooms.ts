import { Injectable } from '@angular/core';
import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


@Injectable()
export class ChatroomsProvider {
  private chatRoomlistRef:firebase.database.Reference;
  constructor() {
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.chatRoomlistRef=firebase.database().ref(`/userProfile/chatRooms`);
        
      }
    })
  }
  createRoom(name:string):firebase.database.ThenableReference{
     return this.chatRoomlistRef.push({
       chatRoomName:name
     }) 
    
  }
  getChatRoomList():firebase.database.Reference{
    return this.chatRoomlistRef; 
  }
}
