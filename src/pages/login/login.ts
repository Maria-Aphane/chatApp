import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert, IonicPage, NavController, AlertController, Loading, LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  private load:Loading;
  email:string;
  password:string;

  constructor(public navCtrl: NavController, public loadCtrl:LoadingController,public alertCtrl:AlertController,private serviceAuth:AuthProvider) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  SignUp(){

    this.navCtrl.setRoot('SignupPage');
  }
  signIn(){
    if(!this.email && !this.password){
      //console.log('enter email and password')
        }
        else{
          this.serviceAuth.signIn(this.email,this.password).then(authData=>{
            this.load.dismiss().then(()=>{
              this.navCtrl.setRoot('RoomsPage');
            })
          },error=>{
             this.load.dismiss().then(()=>{
           const alert :Alert =this.alertCtrl.create({
             message:error.message,
             buttons:[{ text:'ok',role:'cancel'}]
           })
           alert.present()
          })
      })
       this.load=this.loadCtrl.create();
       this.load.present()
        }
   }
  
   forgotPassword(){
    
     this.navCtrl.setRoot('ResetPage');
     
   }
   
 
  

}
