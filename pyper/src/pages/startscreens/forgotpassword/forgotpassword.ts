import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthProvider } from '../../../providers/auth/auth';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  private forgotpasswordTemplate: any;
  private forgotpasswordError: any;

  private forgotpasswordForm: FormGroup;
  private email: FormControl;
  private password: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.createForm();

    this.forgotpasswordTemplate = {
      "logo": "assets/imgs/main.png",
      "txtemail": "email",
      "btnforgotpassword": "Send link",
      "txtLogin": "Already have an account?",
      "btnLogin": "Login",
      "txtSignupnow":"Dont have an account",
      "btnSignupnow":"Sign up now",
      "title": "Reset Your Password",
      "errorUser": "email can't be empty.",
    };
  }

  createForm(){
    this.createFormControls();
    this.forgotpasswordForm = new FormGroup({
      email : this.email,
      password: this.password
    })
  }

  createFormControls(){
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
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

  goToLoginPage(){
    this.navCtrl.setRoot('LoginPage');
  }

  goToSignUpPage(){
    this.navCtrl.push('SignUpPage');
  }

  resetPassword(){
    this.auth.resetPassword(this.email.value).then(
      () => this.navCtrl.setRoot('SignUpPage'),
      error => console.log(error)
    )
  }
}
