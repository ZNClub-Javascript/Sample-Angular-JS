import { UtilService } from './../providers/utilService/utilService';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../config';
import { AuthProvider } from '../providers/auth/auth';
import { BrandProvider } from '../providers/dataaccess/brandProvider';
import { sharedService } from '../providers/sharedServices/sharedService';
import { ProductCategoryProvider } from '../providers/dataaccess/productCategoryProvider';
import { CampaignProvider } from '../providers/dataaccess/campaignProvider';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepopoverPage } from '../pages/others/homepopover/homepopover';
import { ComponentsModule } from '../components/components.module';
import { CampaignCreatePageModule } from '../pages/mainPages/brand/campaigns/campaign-create/campaign-create.module';
import { PostPageModule } from '../pages/mainPages/brand/post/post.module';
import { PostStatusPageModule } from '../pages/post-status/post-status.module';
import { HttpModule } from '@angular/http';
import { AccountPageModule } from '../pages/mainPages/brand/account/account.module';
import { CampaignViewInfluencerPage } from '../pages/mainPages/brand/campaigns/campaign-view-influencer/campaign-view-influencer';

import { AgGridModule } from 'ag-grid-angular';
import { Facebook } from '@ionic-native/facebook';
import { PostProvider } from '../providers/dataaccess/postProvider';
import { InfluencerProvider } from '../providers/dataaccess/influencerProvider';
import { RouterService } from '../providers/routerService/routerService';

@NgModule({
  declarations: [
    MyApp,
    HomepopoverPage,
    CampaignViewInfluencerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    CampaignCreatePageModule,
    AgGridModule.withComponents([]),
    PostPageModule,
    PostStatusPageModule,
    HttpModule,
    AccountPageModule
  ],

  bootstrap: [IonicApp ],
  entryComponents: [
    MyApp,
    HomepopoverPage,
    CampaignViewInfluencerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AuthProvider,
    Facebook,
    BrandProvider,
    InfluencerProvider,
    sharedService,
    GooglePlus,
    ProductCategoryProvider,
    CampaignProvider,
    PostProvider,
    UtilService
    // RouterService
  ]
})
export class AppModule { }
