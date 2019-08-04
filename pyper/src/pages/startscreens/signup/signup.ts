import { Component, createPlatformFactory } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../../providers/auth/auth';
import { HomePage } from '../../home/home';
import { sharedService } from '../../../providers/sharedServices/sharedService';
import { BrandProvider } from '../../../providers/dataaccess/brandProvider';

/**
 * Generated class for the signupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignUpPage {

  private signupTemplate: any;
  private signUpError: any;

  private signupForm: FormGroup;
  private email: FormControl;
  private password: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private sharedService: sharedService, private brandProvider: BrandProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad signupPage');

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.createForm();

    this.signupTemplate = {
      "logo": "assets/imgs/main.png",
      "btnsignup": "signup",
      "txtemail": "email",
      "txtPassword": "Password",
      "txtForgotPassword": "Forgot password?",
      "btnResetYourPassword": "Reset your password",
      "txtLogin": "Already have an account?",
      "btnLogin": "Login",
      "title": "Create an account",
      "errorUser": "email can't be empty.",
      "errorPassword": "Password can't be empty.",
      "errorPasswordLength": "Password must be atleast 8 characters"
    };
  }

  createForm() {
    this.createFormControls();
    this.signupForm = new FormGroup({
      email: this.email,
      password: this.password
    })
  }

  createFormControls() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }



  isemailValid() {
    return this.email.valid || this.email.pristine;
  }

  isPasswordRequiredValid() {
    return this.password.invalid && this.password.errors.required;
  }

  isPasswordMinlengthValid() {
    return this.password.errors != null && this.password.errors.minLength && !this.password.errors.required || this.password.pristine;
  }

  goToLoginPage() {
    this.navCtrl.push('LoginPage');
  }

  goToForgotpasswordPage() {
    this.navCtrl.push('ForgotpasswordPage');
  }

  signUp() {
    let data = this.signupForm.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials).then(
      () => {
        this.navigate();
      },
      error => this.signUpError = error.message
    );
  }

  navigate() {
    if (this.sharedService.roleId == 1) {

      this.brandProvider.save(this.brandProvider.createEmptyBrand(), this.sharedService.uid)
        .then(() => this.navCtrl.setRoot('AccountPage'),
          (error) => console.error("Could not create brand due to " + error)
        );

    } else {
      this.navCtrl.setRoot('HomePage')
    }
  }
}
