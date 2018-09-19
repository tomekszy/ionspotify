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
        this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
    }


    goToScanned(item) {
        this.navCtrl.push(DetailsPage, {
            item: item
        });
    }


}
