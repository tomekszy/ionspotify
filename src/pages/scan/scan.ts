import { Component, NgZone } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { DetailsPage } from '../details/details';
import { SpotifyService } from '../../app/services/spotify.service';

@Component({
    selector: 'scan',
    templateUrl: 'scan.html'
})
export class ScanPage {
    items = [];
    savedParentNativeURLs = [];
    selectedDirectory: string;
    parentNativeURL: string;
    item: any;

    constructor(
        public navCtrl: NavController,
        private fileNavigator: File,
        public plt: Platform,
        public ngZone: NgZone,
        public spotifyService: SpotifyService

    ) {
        const ROOT_DIRECTORY = 'file:///';

        plt.ready()
            .then(() => {
                this.listDir(ROOT_DIRECTORY, 'sdcard');
            })

    }

    listDir(path, dirName) {
        this.fileNavigator
            .listDir(path, dirName)
            .then(entries => {
                this.items = entries;
            })
            .catch(this.handleError);
        return this.items;

    };

    handleError(error) {
        console.log("error reading,", error);
    };

    goDown(item) {
        const parentNativeURL = item.nativeURL.replace(item.name, "");
        this.savedParentNativeURLs.push(parentNativeURL);
        this.parentNativeURL = parentNativeURL;
        this.item = item;
        this.listDir(parentNativeURL, item.name);
    };

    goUp() {
        // const parentNativeURL = this.savedParentNativeURLs.pop();
        // this.listDir(parentNativeURL, "");
        const ROOT_DIRECTORY = 'file:///';
        this.listDir(ROOT_DIRECTORY, 'sdcard');
    };

    selectDirectory() {
        this.spotifyService.items = [];
        this.selectedDirectory = (this.parentNativeURL + this.item.name);
        this.items.forEach(item => {
            if (item.isDirectory) {
                console.log("ścieżka " + this.parentNativeURL + this.item.name + '//' + item.name);
                this.spotifyService.items.push(this.listDir(this.parentNativeURL, this.item.name + '//' + item.name));
            } else {
                this.spotifyService.items.push(item);
            }
            console.log("lista po każdym przebiegu " + this.spotifyService.items);
        });
    }

    goToScanned(item) {
        this.navCtrl.push(DetailsPage, {
            item: item
        });
    }

}
