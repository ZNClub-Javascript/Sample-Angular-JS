import { NgModule } from '@angular/core';
import { LogoComponent } from './logo/logo';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { PyperNavbarComponent } from './pyper-navbar/pyper-navbar';
import { PyperMenuComponent } from './pyper-menu/pyper-menu';
import { PyperCampaignBreadcrumbComponent } from './pyper-campaign-breadcrumb/pyper-campaign-breadcrumb';
import { PyperBulletComponent } from './pyper-bullet/pyper-bullet';
import { PyperInfoComponent } from './pyper-info/pyper-info';
import { HomeBrandComponent } from './home-brand/home-brand';
import { HomeDefaultComponent } from './home-default/home-default';
import { HomeInfluencerComponent } from './home-influencer/home-influencer';
import { PyperBulletListComponent } from './pyper-bullet-list/pyper-bullet-list';
import { PyperFileinputComponent } from './pyper-fileinput/pyper-fileinput';
import { PyperImageSelectComponent } from './pyper-image-select/pyper-image-select';
import { PyperImageSelectListComponent } from './pyper-image-select-list/pyper-image-select-list';
import { PyperHoverImageComponent } from './pyper-hover-image/pyper-hover-image';
import { PyperPaymentCardComponent } from './pyper-payment-card/pyper-payment-card';
import { PyperFooterComponent } from './pyper-footer/pyper-footer';
import { CampaignActionRenderer } from './ag-grid-renderer/campaign-action-renderer/campaign-action-renderer';
import { PyperCardsComponent } from './pyper-cards/pyper-cards';
import { PyperCardComponent } from './pyper-card/pyper-card';
import { PyperCampaignCardsComponent } from './pyper-campaign-cards/pyper-campaign-cards';
import { PyperPostCardsComponent } from './pyper-post-cards/pyper-post-cards';
import { PyperHoverImageSquareComponent } from './pyper-hover-image-square/pyper-hover-image-square';
import { PyperLikeComponent } from './pyper-like/pyper-like';
// import { PyperNavbarComponent } from './pyper-navbar/pyper-navbar';
@NgModule({
	declarations: [LogoComponent, PyperNavbarComponent,
    PyperMenuComponent,
    PyperCampaignBreadcrumbComponent,
    PyperBulletComponent,
    PyperInfoComponent,
    PyperBulletListComponent,
    PyperFileinputComponent,
    PyperImageSelectComponent,
    PyperImageSelectListComponent,
    PyperHoverImageComponent,
    PyperPaymentCardComponent,
    HomeBrandComponent,
    HomeDefaultComponent,
    HomeInfluencerComponent,
    PyperFooterComponent,
    CampaignActionRenderer,
    PyperCardsComponent,
    PyperCardComponent,
    PyperCampaignCardsComponent,
    PyperCardsComponent,
    PyperPostCardsComponent,
    PyperHoverImageSquareComponent,
    PyperLikeComponent,
    ],
	imports: [IonicModule, CommonModule],
	exports: [LogoComponent, PyperNavbarComponent,
    PyperMenuComponent,
    PyperCampaignBreadcrumbComponent,
    PyperBulletComponent,
    PyperInfoComponent,
    PyperBulletListComponent,
    PyperFileinputComponent,
    PyperImageSelectComponent,
    PyperImageSelectListComponent,
    PyperHoverImageComponent,
    PyperPaymentCardComponent,
    HomeBrandComponent,
    HomeDefaultComponent,
    HomeInfluencerComponent,
    PyperFooterComponent,
    CampaignActionRenderer,
    PyperCardsComponent,
    PyperCardComponent,
    PyperCampaignCardsComponent,
    PyperCardsComponent,
    PyperPostCardsComponent,
    PyperHoverImageSquareComponent,
    PyperLikeComponent,
    ],
    entryComponents: [CampaignActionRenderer]
})
export class ComponentsModule { }
