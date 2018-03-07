import { Task } from './task';

export class Card {
    id: string;
    name: string;
    order: number;
    tasks: Task[];

    constructor(json: any){
        this.id = json.id;
        this.name = json.name;
        if(json.tasks) this.tasks = json.tasks.map((t: any)=> new Task(t));
    }
}