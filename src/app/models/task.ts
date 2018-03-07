export class Task {
    id: string;
    name: string;
    order: number;
    importance: number;

    constructor(json: any){
        this.name = json.name || '';
        this.order = json.order || '';
        this.importance = json.importance || '';
        if(json.id) this.id = json.id;
    }
}