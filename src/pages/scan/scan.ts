import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { DetailsPage } from '../details/details';

@Component({
    selector: 'scan',
    templateUrl: 'scan.html'
})
export class ScanPage {
    tracks: any;

    constructor(
        public navCtrl: NavController,
        private file: File
    ) { }

    ngOnInit() {
        this.listFiles();
    }

    listFiles() {
        this.file.checkDir(this.file.dataDirectory, '../../app').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));

        this.file
            .checkDir('www/assets/', 'data')
            .then(result => {
                console.log(result);
            }).catch((error) => {
                console.log('error ' + JSON.stringify(error));
            });
    }


    goToScanned(item) {
        this.navCtrl.push(DetailsPage, {
            item: item
        });
    }


}
