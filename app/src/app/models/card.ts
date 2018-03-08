import { Task } from './task';

export class Card {
    cardId: string;
    name: string;
    sort: number;
    tasks: Task[];

    constructor(json: any){
        this.cardId = json.cardId;
        this.name = json.name;
        this.sort = json.sort;
        if(json.tasks) this.tasks = json.tasks.map((t: any)=> new Task(t));
    }
}