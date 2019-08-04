import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerLeaderboardPage } from './influencer-leaderboard';

@NgModule({
  declarations: [
    InfluencerLeaderboardPage,
  ],
  imports: [
    IonicPageModule.forChild(InfluencerLeaderboardPage),
  ],
})
export class InfluencerLeaderboardPageModule {}
