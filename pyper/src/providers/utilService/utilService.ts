import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { storage } from 'firebase';
import firebase from 'firebase';
import * as moment from 'moment';

/*
  Use this to store all the utility functions
*/
@Injectable()
export class UtilService {

    /**
     * 
     * @param custom object 
     * 
     * @returns object (JSON format)
     */
    public getObject(object) {
        return JSON.parse(JSON.stringify(object));
    }

    uploadImage(folder: string, path: string, image, appendedText: string): Promise<string> {
        if (!appendedText) {
            appendedText = '';
        }
        const img = image;
        console.log('Attempting to upload image' + JSON.stringify(img));
        const logoStorage = storage().ref();
        const storagePathName = folder + '/' + path + '/' + appendedText;
        let uploadTask = logoStorage.child(storagePathName).put(img);

        let promise = new Promise<string>((resolve, reject) =>
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    // upload in progress
                    console.log(snapshot);
                },
                (error) => {
                    // upload failed
                    console.log(error);
                    reject(error);
                },
                () => {
                    // upload success
                    console.log('COMPLETED');
                    resolve(storagePathName);
                }
            ));

        return promise;
    }

    formatDateTime(timestamp: any) {
        return moment(timestamp.toMillis())
            .format('YYYY/MM/DD');
    }

    //TODO UTILITY
    readImage(storagePathName)  {
        // Create a reference to the file we want to download
       return  storage().ref().child(storagePathName).getDownloadURL()
            
    }

    getAllInterests(){
        return [
            {
                title: 'Animal',
                image: 'assets/categories/animal.jpg'
            },
            {
                title: 'Automative',
                image: 'assets/categories/automative.jpg'
            },
            {
                title: 'Beauty and Personal Care',
                image: 'assets/categories/beauty_and_personal_care.jpg'
            },
            {
                title: 'Business Finance and Insurance',
                image: 'assets/categories/business_finance_and_insurance.jpg'
            },
            {
                title: 'Children and Family',
                image: 'assets/categories/children_and_family.jpg'
            },
            {
                title: 'Education and Books',
                image: 'assets/categories/education_and_books.jpg'
            },
            {
                title: 'Entertainment and Movies',
                image: 'assets/categories/entertainment_and_movies.jpg'
            },
            {
                title: 'Fashion',
                image: 'assets/categories/fashion.jpg'
            },
            {
                title: 'Food and Drinks',
                image: 'assets/categories/food_and_drinks.jpg'
            },
            {
                title: 'Health, Fitness and Sports',
                image: 'assets/categories/health_fitness_and_sport.jpg'
            },
            {
                title: 'Home and Garden',
                image: 'assets/categories/home_and_garden.jpg'
            },
            {
                title: 'Photography, Arts and Dance',
                image: 'assets/categories/photography_art_and_design.jpg'
            },
            {
                title: 'Restaurants, Bar and Hotel',
                image: 'assets/categories/restaurant_bar_and_hotel.jpg'
            },
            {
                title: 'Social Media Web and Technology',
                image: 'assets/categories/social_media_web_and_technology.jpg'
            },
            {
                title: 'Technology Products',
                image: 'assets/categories/technology_products.jpg'
            },
            {
                title: 'Travel',
                image: 'assets/categories/travel.jpg'
            },

        ]
    }
}
