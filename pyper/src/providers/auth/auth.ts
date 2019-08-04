import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import FirebaseAuthProvider = firebase.auth.AuthProvider;
import { GooglePlus } from '@ionic-native/google-plus';
import { sharedService } from '../sharedServices/sharedService';


@Injectable() //autoinject
export class AuthProvider {

  private data: any = null;

  constructor(public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public googlePlus: GooglePlus,
    public sharedService: sharedService) {
    
     
  }

  get authenticated(): boolean {
    return true;
  }

  addUserToSessionWithUID(uid : string){
    this.sharedService.setUid(uid);
    this.sharedService.addUser();
  }

  signOut() {
    this.sharedService.resetData();
    this.sharedService.removeUser();
    return this.afAuth.auth.signOut();
  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    this.data = this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password).then((credentials) => {
        this.addUserToSessionWithUID(credentials.user.uid);
      });

    return this.data;
  }


  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((response) => {
        this.addUserToSessionWithUID(response.user.uid);
      });
  }


  signInWithGoogle() {
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider())
      .then((credential) => {
        this.addUserToSessionWithUID(credential.user.uid);
        this.sharedService.name = credential.user.displayName;
        this.sharedService.email = credential.user.email;
        this.sharedService.photoUrl = credential.user.photoURL;
      });
  }

  SignInWithFacebook() {

  }

  SignInWithTwitter() {

  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  oauthSignIn(provider: FirebaseAuthProvider): any {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      //try for cordova plugin 
      return this.signInWithGoogleNative(provider);

    }
  }

  async signInWithGoogleNative(provider: FirebaseAuthProvider) {
    try {
      const res = await this.googlePlus.login({
        'webClientId': '689854604641-kdropc9jsrpdh568f73b4rc889tk77kk.apps.googleusercontent.com',
        'offline': true
      });
      const googleCredential = firebase.auth.GoogleAuthProvider
        .credential(res.idToken);
      firebase.auth().signInWithCredential(googleCredential)
        .then(response => {
          console.log("Firebase success: " + JSON.stringify(response));
        });
    }
    catch (err) {
      console.error("Error: ", err);
      //return this.signInWithGoogleRedirect(provider);
    }
  }


  async signInWithGoogleRedirect(provider: FirebaseAuthProvider) {
    await this.afAuth.auth.signInWithRedirect(provider);
    try {
      const result = await this.afAuth.auth.getRedirectResult();
      let providerId = result.credential.providerId;
      let user = result.user;
      console.log(providerId, user);
    }
    catch (error) {
      // Handle Errors here.
      alert(error.message);
    }
  }
}
