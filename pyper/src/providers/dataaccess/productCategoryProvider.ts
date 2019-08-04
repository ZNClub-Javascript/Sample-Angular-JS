/*
Provider responsible for DAO operations of Product Category interface
*/

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from 'angularfire2/firestore';
import { ProductCategory } from '../../interfaces/productCategory';

@Injectable()
export class ProductCategoryProvider{

    private productCategory: ProductCategory;
    private productCategoryRef : any;
    
	constructor( public afs: AngularFirestore) {
     
    }
    
    // TODO : refactor to getter
    public getProductCategory() : Observable<ProductCategory> {
        const uid = 'list';
        return this.afs.doc<ProductCategory>(`product_categories/${uid}`)
        .valueChanges();
    ;
    }
    
}