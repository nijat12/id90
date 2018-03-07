export class Err {
    code: string;
    description: string;

    constructor(json: any){
        this.code = json.errorCode;
        this.description = json.errorString;

    }
}