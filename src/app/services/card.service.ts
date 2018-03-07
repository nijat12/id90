import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { endPoints } from '../resources/endPoints';
import { Card } from '../models/card';
import { Err } from '../models/error';

@Injectable()
export class cardService {
    private url = endPoints.apiUrl;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    private cards: Card[];

    constructor(private http: Http) { }

    // private handleError(error: any): Promise<any> {
    //     console.error('An error occured', error.status);
    //     return Promise.reject(error.message || error);
    // }

    //To use as Singletons across the App
    get cardsFromMemory():Card[] {return this.cards};
    setCardsToMemory(cards) {this.cards = cards};

    getCardsFromServer(): Observable<Card[]> {
        if(this.cardsFromMemory){
            return Observable.of(this.cardsFromMemory);
        } else {
            return this.http.get(this.url + endPoints.cards)
            .map(res => {
                let data = res.json();
                if (data.errorCode && data.errorCode !== 0) throw new Err(data);
                else {
                    this.setCardsToMemory(data.map((c: any)=> new Card(c)));
                    return this.cardsFromMemory;
                }
            });
        }
        
    }

    saveCardsToServer(card: Card): Observable<any>{
        return this.http.post(this.url + endPoints.cards, JSON.stringify(card), { headers: this.headers })
            .map(res => {
                let data = res.json();
                if (data.errorCode && data.errorCode !== 0) throw new Err(data);
                else return data;
            });
    }
    
}