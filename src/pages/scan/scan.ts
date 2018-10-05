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
                this.listDir(ROOT_DIRECTORY, '');
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
        const parentNativeURL = this.savedParentNativeURLs.pop();

        this.listDir(parentNativeURL, "");
    };

    selectDirectory() {
        this.selectedDirectory = (this.parentNativeURL + this.item.name);
        // this.spotifyService.items.push(this.items);
        this.items.forEach(item => {
            if (item.isDirectory) {
                console.log("ścieżka " + this.parentNativeURL + this.item.name + '//' + item.name);
                this.spotifyService.items.push(this.listDir(this.parentNativeURL, this.item.name + '//' + item.name));
            } else {
                this.spotifyService.items.push(item);
            }
            console.log("lista po każdym przebiegu " + this.spotifyService.items);
        });

        // this.spotifyService.items = this.items;

    }



    // ngOnInit() {
    // this.createDir();
    // this.listFiles();
    // this.getFreeSpace();
    // }

    // createDir() {
    //     this.file.createDir(this.file.externalRootDirectory, 'mydircordova', true);
    // }

    // listFiles() {
    //     this.file.checkDir(this.file.externalRootDirectory, 'mydircordova').then(_ => {
    //         console.log('Directory exists');
    //         this.exist1 = true;
    //     }
    //     ).catch(err => {
    //         console.log('Directory doesn\'t exist');
    //         this.exist1 = false;
    //     });

    //     this.file
    //         .checkDir(this.file.externalRootDirectory, 'mydircordove')
    //         .then(result => {
    //             console.log(result);
    //             this.exist2 = result;
    //         }).catch((error) => {
    //             console.log('error ' + JSON.stringify(error));
    //             this.exist3 = 'error ' + JSON.stringify(error)
    //         });
    // }

    // getFreeSpace() {
    //     this.file.getFreeDiskSpace()
    //         .then(function (success) {
    //             console.log(success);
    //             this.exist4 = success;
    //         }, function (error) {
    //             console.log(error);
    //             this.exist4 = error;
    //         });
    // }

    goToScanned(item) {
        this.navCtrl.push(DetailsPage, {
            item: item
        });
    }



}
