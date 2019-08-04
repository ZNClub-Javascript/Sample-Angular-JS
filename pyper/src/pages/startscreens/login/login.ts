import { Component, createPlatformFactory , Input} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthProvider } from '../../../providers/auth/auth';
import { sharedService } from '../../../providers/sharedServices/sharedService';
import { Facebook , FacebookLoginResponse } from '@ionic-native/facebook';
import { InfluencerProvider } from '../../../providers/dataaccess/influencerProvider';
import _ from 'lodash';
import { Influencer } from '../../../interfaces/influencer';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginTemplate: any;

  private loginForm: FormGroup;
  private email: FormControl;
  private password: FormControl;

  slideImgs: Array<string>;
  userData: any;
  instaData: any;

  pageIndex: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private sharedService: sharedService , public platform: Platform , private facebook: Facebook, private influencerProvider: InfluencerProvider) {
      this.pageIndex = 1;   
  }

  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      var accessToken = response.authResponse.accessToken;
     // console.log("Access Token  "+ accessToken);

      this.facebook.api('me?fields=accounts{instagram_business_account,id}', []).then(profileAccount => {
       
        var InstaID = profileAccount.accounts.data[0].instagram_business_account.id;
        console.log('Instagram ID  '+InstaID);
        this.facebook.api(InstaID+'?fields=biography,followers_count,follows_count,name,profile_picture_url,media_count,media{caption,media_type,media_url,like_count,comments}', []).then(profile => {
          
          console.log("response with Dynamic insta response    "+JSON.stringify(profile));
          console.log('Follower Count   '+profile.followers_count);
          console.log('Following Count   '+profile.follows_count);
        });

      });

     

      this.facebook.api('17841410068616647?fields=biography,followers_count,follows_count,name,profile_picture_url,media_count,media{caption,media_type,media_url,like_count,comments}', []).then(profile => {
        var account = profile.instagram_business_account;
        console.log("response with hardcoded insta id   "+JSON.stringify(profile));
      });
    });
    
   // this.navCtrl.push('InfluencerHomePage');
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.createForm();

    this.loginTemplate = {
      "logo": "assets/imgs/logo.jpg",
      "btnLogin": "Login",
      "txtemail": "Email",
      "txtPassword": "Password",
      "txtForgotPassword": "Forgot password?",
      "btnForgotPassword": "Reset your password",
      "txtSignupnow": "Don't have an account?",
      "btnSignupnow": "Signup now",
      "title": "Welcome ",
      "errorUser": "email can't be empty.",
      "errorPassword": "Password can't be empty.",
      "errorPasswordLength": "Password must be atleast 8 characters",
      "btnGoogleSignIn":"Sign In",
      "btnFacebookSignIn":"Sign In",
      "btnTwitterSignIn":"Sign In"
    };
  }

  createForm(){
    
    this.createFormControls();
    this.loginForm = new FormGroup({
      email : this.email,
      password: this.password
    })
  }

  createFormControls(){
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
  }

  isemailValid(){
    return this.email.valid || this.email.pristine;
  }

  isPasswordRequiredValid (){
    return this.password.invalid && this.password.errors.required;
  }

  isPasswordMinlengthValid(){
    return this.password.errors!=null && this.password.errors.minLength && !this.password.errors.required || this.password.pristine;
  }

  logIn(){
    let data = this.loginForm.value;
    if(!data.email){
      console.log("No Email");
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    }

    this.auth.signInWithEmail(credentials).then(
      ()=> this.managePostSignIn(),
      error => console.log(error.message)      
    );
  }

  signInWithGoogle(){
    this.auth.signInWithGoogle().then(
      () => this.managePostSignIn(),
      error => console.log(error)
    )
  }

  signInWithFacebook(){
    this.auth.SignInWithFacebook();
  }

  signInWithTwitter(){
    this.auth.SignInWithTwitter();
  }

  //TODO move to shared service
  managePostSignIn() {
    localStorage.setItem('loggedIn','true');
    this.goToUserHomePage();
  }

  goToUserHomePage() {
    if (this.sharedService.isUserABrand()) {
      //brand
      this.navCtrl.setRoot('HomePage');

    } else if (this.sharedService.isUserAnInfluencer()) {
      //influencer
      //get the influencer
      this.influencerProvider.getInfluencerById(this.sharedService.uid)
      .subscribe( influencers => {
        /**
         * if there are no influncers, try to create one 
         */
        if(_.isEmpty(influencers)){
          console.log('Creating an influencer');
          this.influencerProvider.createNewInfluencer().then(
            (res) =>{
              this.goToUserHomePage();
            }
          )
          // this.navCtrl.setRoot('InfluencerMainPage');
        } else {
          //check if the influencer has age, gender, interests
          let influencer = influencers[0];
          if(!this.influencerProvider.hasBasicDetails(influencer)){
            this.influencerProvider.influencer = influencer;
            this.navCtrl.setRoot('InfluencerBasicDetails', influencer);
          }else{
            this.navCtrl.setRoot('InfluencerMainPage');            
          }
          
        }
      }, () => {
        console.error('Error: Could not retrieve influencer details.');
        this.navCtrl.setRoot('InfluencerMainPage');
      });
      // this.navCtrl.setRoot('InfluencerHomePage');
    }
  }

  goToSignUpPage(){
    this.navCtrl.push('SignUpPage');
  }
  
  goToForgotpasswordPage(){
    this.navCtrl.push('ForgotpasswordPage');
  }

  
  
  canDisplay(){
    return this.sharedService.roleId && this.sharedService.roleId != 1;
  }


  isVisible(num) {
    if (num === this.pageIndex)
      return true;
    else
      return false;
  }

  onClick(num: number) {
    console.log('clicked');
    this.pageIndex = num;
  }

  isPageActive(num: number){
      return this.pageIndex === num;
  }

  childClick($event) {
    this.pageIndex = $event;
  }

  isBrowser(){
    let value = this.platform.is('core') && !this.platform.is('mobile') && !this.platform.is('mobileweb') && (this.platform.width() > 500);
    return value;
  }

  getActiveName(){
    return this.navCtrl.getActive().name;
  }

  
}
