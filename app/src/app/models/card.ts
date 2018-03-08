import { Task } from './task';

export class Card {
    id: string;
    name: string;
    sort: number;
    tasks: Task[];

    constructor(json: any){
        this.id = json.cardId;
        this.name = json.name;
        this.sort = json.sort;
        if(json.tasks) this.tasks = json.tasks.map((t: any)=> new Task(t));
    }
}