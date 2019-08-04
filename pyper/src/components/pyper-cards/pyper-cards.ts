import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PyperCardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-cards',
  templateUrl: 'pyper-cards.html'
})
export class PyperCardsComponent implements OnChanges{

  @Input('displayLike') displayLike : boolean = false;
  @Input('data') data : any[];
  @Output() tapped = new EventEmitter<string>();
  filteredData : any[];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  goToCampaignDetail(campaign: any) {
    this.navCtrl.push('InfluencerDetailPage', campaign);
  }

  filterItems(event: any) {
    let searchText = event.target.value;
    
    if (searchText && searchText.trim() !== '') {
      this.filteredData = this.data.filter(element =>
        element.title.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredData = this.data;
    }
  }

  ngOnChanges(){
    this.filteredData = this.data;
  }

  OnTap(id : string){
    this.tapped.emit(id);
  }
}
