import { Payment } from "./payment";

/*
Object Mapping to firestore collection: brands
*/

export interface Brand {
	brandUid: string,
	name: string,
	logoUrl: string,
	rating: number,
	aboutUs: string,
	uniqueFact: string,
	products: Array<string>,
	geographies: Array<string>,
	payments: Array<Payment>,
	contact_number?: number,
	address?: string,
	representative_first_name?: string,
	rep_last_name?: string,
	aadharFileUrl: string,
	gstUrl: string,
	panUrl: string
}