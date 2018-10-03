import { Component, NgZone } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { DetailsPage } from '../details/details';

@Component({
    selector: 'scan',
    templateUrl: 'scan.html'
})
export class ScanPage {
    items;
    savedParentNativeURLs = [];

    constructor(
        public navCtrl: NavController,
        private fileNavigator: File,
        public plt: Platform,
        public ngZone: NgZone,

    ) {
        const ROOT_DIRECTORY = 'file:///storage';

        plt.ready()
            .then(() => {
                this.listDir(ROOT_DIRECTORY, '');
            })

    }

    listDir = (path, dirName) => {
        this.fileNavigator
            .listDir(path, dirName)
            .then(entries => {
                this.items = entries;
            })
            .catch(this.handleError);
    };

    handleError = error => {
        console.log("error reading,", error);
    };

    goDown = item => {
        const parentNativeURL = item.nativeURL.replace(item.name, "");
        this.savedParentNativeURLs.push(parentNativeURL);

        this.listDir(parentNativeURL, item.name);
    };

    goUp = () => {
        const parentNativeURL = this.savedParentNativeURLs.pop();

        this.listDir(parentNativeURL, "");
    };




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
