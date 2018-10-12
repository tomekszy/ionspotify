import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpotifyService } from '../../app/services/spotify.service';
import { DetailsPage } from '../details/details';

@Component({
    selector: 'search',
    templateUrl: 'search.html'
})
export class SearchPage {
    tracks: any;

    constructor(
        public navCtrl: NavController,
        private spotifyService: SpotifyService) {

    }

    getToken() {
        this.spotifyService.getToken();
    }

    getSearch(searchTerm) {
        this.spotifyService.search(searchTerm)
            .subscribe(response => {
                this.tracks = response.tracks.items
            });
    }

    viewItem(item) {
        this.navCtrl.push(DetailsPage, {
            item: item
        });
    }


}
