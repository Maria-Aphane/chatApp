import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    userProfile:any;
     birthDate:string;
  
    constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      private serviceProfile:ProfileProvider,private alertCtrl:AlertController) {
    }
  
    ionViewCanEnter(){
      this.serviceProfile.getUserProfile().off();
    }
  
   ionViewDidLoad(){
    this.serviceProfile.getUserProfile().on('value',userProfileSnapShot=>{
      this.userProfile=userProfileSnapShot.val();
      this.birthDate=userProfileSnapShot.val().birthDate;
    })
   }
  
    updateNames(){
  const alert:Alert=this.alertCtrl.create({
    message:"your first and last name",
    inputs:[{
      name:'firstName',
      placeholder:'first name',
   value:this.userProfile.firstName
    },{
      name:'lastName',
      placeholder:'last name',
   value:this.userProfile.lastName
  
    }],
    buttons:[{
      text:'cancel',
    },{
      text:'save',
      handler:data =>{
        this.serviceProfile.updateName(data.firstName,data.lastName)
      }
    }],
    cssClass:'alertCustomCss'
  })
  alert.present()
    }
  
  
    updatePassword(){
  
      const alert:Alert=this.alertCtrl.create({
  
        inputs:[{
          name:'oldPassword',
          placeholder:'enter old password',
       type:'password'
        },{
          name:'newPassword',
          placeholder:'enter new password',
          type:'password'
      
        }],
        buttons:[{
          text:'cancel',
        },{
          text:'save',
          handler:data =>{
            this.serviceProfile.updatePassword(data.newPassword,data.oldPassword)
            .catch(error=>{
              console.log('error message from catch',error.message)
             let newAlert:Alert=this.alertCtrl.create({
               message:error.message
             })
             newAlert.present(); 
            })
          }
        }],
        cssClass:'alertCustomCss'
      })
      alert.present()
    }
  
    updateDOB(birthDate){
      
      this.serviceProfile.updatDOB(birthDate);
    }


}
