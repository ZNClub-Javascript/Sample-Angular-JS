/*
Object Mapping to firestore sub-collection: brands/uid/payments or influencers/uid/payments
*/

export interface Payment {
	creditCardNumber: string,
	expiryDate: string,
	cvv: number,
	isDefault : boolean
}