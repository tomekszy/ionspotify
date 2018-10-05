import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SpotifyService {
    http: any;
    baseUrl: string;
    items: any = [];

    constructor(http: Http) {
        this.http = http;
        this.baseUrl = 'https://api.spotify.com/v1/';
    }

    getToken() {

    }

    search(searchTerm) {
        return this.http
            .get(this.baseUrl + 'search?q=' + searchTerm)
            .map(res => res.json());
    }
}