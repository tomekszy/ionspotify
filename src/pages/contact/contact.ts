import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
    providers: [FilePath, Transfer, TransferObject, File]
})
export class ContactPage {

    storageDirectory: string = '';

    constructor(public navCtrl: NavController, private filePath: FilePath, public platform: Platform, private transfer: Transfer, private file: File) {

        this.platform.ready().then(() => {
            file.listDir(file.externalDataDirectory, '').then((result) => {
                console.log(result);
                /*result will have an array of file objects with 
                file details or if its a directory*/
                for (let file of result) {
                    if (file.isDirectory == true && file.name != '.' && file.name != '..') {
                        // Code if its a folder
                    } else if (file.isFile == true) {
                        // Code if its a file
                        let name = file.name // File name
                        let path = file.toURL // File path
                        file.getMetadata(function (metadata) {
                            let size = metadata.size; // Get file size
                        })
                    }
                }
            })

        }
    }
}
