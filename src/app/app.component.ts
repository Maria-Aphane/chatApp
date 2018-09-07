import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase'


const  config = {
      apiKey: "AIzaSyD1CQvNkrxx83pR9xHfpA2XlwLWT4VGjRE",
      authDomain: "myfisrtfirebaseproject.firebaseapp.com",
      databaseURL: "https://myfisrtfirebaseproject.firebaseio.com",
      projectId: "myfisrtfirebaseproject",
      storageBucket: "myfisrtfirebaseproject.appspot.com",
      messagingSenderId: "404596592682"
};
@Component({
  templateUrl:'app.html'
})
export class MyApp {
  
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
     
      statusBar.styleDefault();
      splashScreen.hide();
    
    });
    firebase.initializeApp(config);
    const unsubscribe= firebase.auth().onAuthStateChanged(user=>{
      if(!user){
        this.rootPage='LoginPage';
        unsubscribe();
      } else{
        this.rootPage='RoomsPage';
        unsubscribe();
      }
    })
    
  }
}

