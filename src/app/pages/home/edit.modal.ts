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
        this.myParam = params.get('task');
    }

    dismiss() {
        this.viewCtrl.dismiss(null);
    }

    save() {
        this.viewCtrl.dismiss(this.myParam);
    }
}