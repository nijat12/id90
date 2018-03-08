import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Task } from '../../models/task';

@Component({
    selector: 'edit-modal',
    templateUrl: './edit.modal.html'
})
export class EditModal {
    myParam: Task;

    constructor(
        public viewCtrl: ViewController,
        private params: NavParams) {
            if(params.get('task')) this.myParam = new Task(params.get('task'));
            else this.myParam = new Task({});
    }

    dismiss() {
        this.viewCtrl.dismiss(null);
    }

    save() {
        this.viewCtrl.dismiss(this.myParam);
    }

    deleteTask() {
        this.viewCtrl.dismiss('Delete');
    }
}