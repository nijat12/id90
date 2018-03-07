import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';

import { Task } from '../../models/task';

@Component({
    selector: 'edit-modal',
    templateUrl: './edit.modal.html'
})
export class EditModal {
    myParam: Task;
    editForm: FormGroup;

    constructor(
        public viewCtrl: ViewController,
        private params: NavParams,
        private fb: FormBuilder) {
        this.myParam = params.get('task');

        this.editForm = fb.group({
            'name': [this.myParam.name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
            'urgency': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
        });
    }

    dismiss() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }

    save() {

    }
}