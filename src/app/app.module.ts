import { AuthProvider } from './../providers/auth/auth';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatroomsProvider } from '../providers/chatrooms/chatrooms';
import { ProfileProvider } from '../providers/profile/profile';
import { ChatProvider } from '../providers/chat/chat';




@NgModule({
  declarations: [
    MyApp,
    HomePage
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ChatroomsProvider,
    ProfileProvider,
    ChatProvider,
   
  ]
})
export class AppModule {}
