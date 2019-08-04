/*
Object Mapping to firestore collection: influencers
*/

export interface Influencer {
	email: string,
	influencerUid: string,
	name:string,
	photoUrl:string;
	age: number,
	gender: string,
	interests: Array<string>,
	regions: Array<string>
}