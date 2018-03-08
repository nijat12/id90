import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula';

import { DirectivesModule } from '../directives/directives.module';

import { MyApp } from './app.component';
import { HomePage } from './pages/home/home';
import { EditModal } from './pages/home/edit.modal';
import { cardService } from './services/card.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditModal
  ],
  imports: [
    BrowserModule,
    DirectivesModule,
    DragulaModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    cardService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
