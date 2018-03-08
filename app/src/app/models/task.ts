export class Task {
    taskId: string;
    name: string;
    sort: number;
    importance: number;

    constructor(json: any){
        this.name = json.name || '';
        this.sort = json.sort || '';
        this.importance = json.importance || '';
        if(json.taskId) this.taskId = json.taskId;
    }
}