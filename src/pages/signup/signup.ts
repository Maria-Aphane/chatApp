import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert, IonicPage, NavController, Loading, LoadingController, AlertController, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private load:Loading;
  email:string;
  password:string;

  constructor(public navCtrl: NavController,public loadCtrl:LoadingController,public alertCtrl:AlertController,public viewCtrl:ViewController,private service:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
 signUp(){
  if(!this.email && !this.password){
  console.log('Enter email and address')
  }else{
    this.service.signUp(this.email, this.password)
    .then(authData=>{
      this.load.dismiss().then(()=>{
    this.navCtrl.setRoot('RoomsPage');
      })
    },error=>{
      this.load.dismiss().then(()=>{
        const alert :Alert = this.alertCtrl.create({
          message:error.message,
          buttons:[{text:'ok',role: 'cancel'}]
        })
        alert.present();
      })
    })
    this.load=this.loadCtrl.create();
    this.load.present()
    }
    }


    back(){
      this.navCtrl.push('LoginPage');
    }

}
