export class Task {
    taskId: string;
    name: string = '';
    sort: number;
    importance: string  = '1';
    description: string = '';
    dueDate: Date;
    cardId: string;

    constructor(json: any){
        this.name = json.name || '';
        this.sort = json.sort || '';
        this.importance = json.importance || '1';
        this.description = json.description || '';
        if(json.taskId) this.taskId = json.taskId;
        if(json.cardId) this.cardId = json.cardId;
        if(json.dueDate) this.dueDate = json.dueDate;
    }
}