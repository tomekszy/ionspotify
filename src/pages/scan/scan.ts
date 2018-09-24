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
    exist1: boolean;
    exist2: boolean;
    exist3: string;
    exist4: any;

    constructor(
        public navCtrl: NavController,
        private file: File
    ) { }

    ngOnInit() {
        this.createDir();
        this.listFiles();
        this.getFreeSpace();
    }

    createDir() {
        this.file.createDir(this.file.externalRootDirectory, 'mydircordova', true);
    }

    listFiles() {
        this.file.checkDir(this.file.externalRootDirectory, 'mydircordova').then(_ => {
            console.log('Directory exists');
            this.exist1 = true;
        }
        ).catch(err => {
            console.log('Directory doesn\'t exist');
            this.exist1 = false;
        });

        this.file
            .checkDir(this.file.externalRootDirectory, 'mydircordove')
            .then(result => {
                console.log(result);
                this.exist2 = result;
            }).catch((error) => {
                console.log('error ' + JSON.stringify(error));
                this.exist3 = 'error ' + JSON.stringify(error)
            });
    }

    getFreeSpace() {
        this.file.getFreeDiskSpace()
            .then(function (success) {
                console.log(success);
                this.exist4 = success;
            }, function (error) {
                console.log(error);
                this.exist4 = error;
            });
    }


    goToScanned(item) {
        this.navCtrl.push(DetailsPage, {
            item: item
        });
    }


}
