/*
Object Mapping to firestore collection: campaigns
*/
export interface SocialMediaPlatform {
    name: string,
    hashtags: Array<string>,
    mentions: Array<string>,
    // followers: number
}

interface InfluencerCampaignFilter {
    minimumAge: number,
    maximumAge: number,
    gender: any,
    regions: Array<string>,
    interests: Array<string>
}

export interface Campaign {
    brandUid: string,
    type: string,
    filter: InfluencerCampaignFilter,
    name: string,
    logoUrl: string,
    coverImageUrl: string,
    productName: string,
    productDescription: string,
    productCategory: string,
    productUrl: string,
    productMarketInformation : string,
    socialMedia: Array<SocialMediaPlatform>,
    dreamboardImageUrls: Array<string>,
    contentType: string,
    specification: string,
    dos: Array<string>,
    donts: Array<string>,
    cost: number,
    publishBriefDate: Date,
    submissionEndDate: Date
}