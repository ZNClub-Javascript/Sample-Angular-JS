/*
Object Mapping to firestore collection: posts
*/
export interface Post {
    brandUid: string;
    campaignUid: string;
    influencerUid: string;
    imageUrl: string;
    caption: string;
    reach: number;
    createdDate: Date;
    approvedOrDeclinedDate:Date;
    publishedDate:Date;
    status:number;
    /**
     * status = 1 --> Pending
     *          2 --> Approved
     *          3 --> Declined
     *          4 --> Published
     * 
     */

    
}