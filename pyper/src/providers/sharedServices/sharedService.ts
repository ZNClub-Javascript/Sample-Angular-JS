import { Injectable } from "@angular/core";



@Injectable()
export class sharedService {

    public INFLUENCER_CAMPAIGN:string =  'INFLUENCER';
    public CONTENT_CAMPAIGN:string = 'CONTENT';


    // public uid: string = 'testUIDSharedService';
    public uid: string;
    public name : string;
    public photoUrl : string; 
    public email: string;
    //= 'P4b9PdfXbPTh7ylnfq5LiPnVNE22';
    public roleId: number;

    constructor(){
        this.uid = localStorage.getItem('uid');
        this.roleId = Number(localStorage.getItem('roleId'));
    }
    /*
    role = 1 --> brand
    role = 2 --> influencer
    role = 3 --> pr agency
    */

    setUid(userid: string) {
        localStorage.setItem('uid', userid);
        this.uid = userid;
    }

    setRole(role: number) {
        localStorage.setItem('roleId', role.toString());
        this.roleId = role;
    }


    resetData(){
        this.uid = 'testUIDSharedService';
        this.roleId = undefined;
        localStorage.removeItem('uid');
        localStorage.removeItem('roleId');
    }

    addUser(){
        localStorage.setItem('loggedIn', 'true');
    }

    removeUser(){
        localStorage.removeItem('loggedIn');
    }


    isLoggedIn() : boolean{
        if(localStorage.getItem('loggedIn')==='true'){
            return true;
        }else {
            return false;
        }
    }

    isUserABrand(): boolean {
        return this.roleId == 1;
    }

    isUserAnInfluencer(): boolean {
        return this.roleId == 2;
    }

}
