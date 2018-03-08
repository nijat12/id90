import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { endPoints } from '../resources/endPoints';
import { Card } from '../models/card';
import { Task } from '../models/task';
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

    saveTaskToServer(task: Task): Observable<any>{
        return this.http.post(this.url + endPoints.cards, JSON.stringify(task), { headers: this.headers })
            .map(res => {
                let data = res.json();
                if (data.errorCode && data.errorCode !== 0) throw new Err(data);
                else return data;
            });
    }
    
    updateTaskToServer(task: Task): Observable<any> {
        return this.http.put(this.url + endPoints.cards, JSON.stringify(task), { headers: this.headers })
            .map(res => {
                let data = res.json();
                if (data.errorCode && data.errorCode !== 0) throw new Err(data);
                else return data;
            });
    }

    updateAllTasks(tasks: Task[]): Observable<any> {
        return this.http.put(this.url + endPoints.allTasksInCard, JSON.stringify(tasks), { headers: this.headers })
            .map(res => {
                let data = res.json();
                if (data.errorCode && data.errorCode !== 0) throw new Err(data);
                else return data;
            });
    }

    deleteTaskFromServer(task: Task): Observable<any> {
        let search = new URLSearchParams();
        search.set('taskId', task.taskId);

        return this.http.delete(this.url + endPoints.cards, {search})
            .map(res => {
                let data = res.json();
                if (data.errorCode && data.errorCode !== 0) throw new Err(data);
                else return data;
            });
    }
}