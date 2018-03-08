import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';
import _ from "lodash";
// import { Hammer } from 'hammerjs';

import { Card } from '../../models/card';
import { Task } from '../../models/task';
import { cardService } from '../../services/card.service';
import { EditModal } from './edit.modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  cards: Card[];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    // private dragulaService: DragulaService,
    private CardService: cardService) {

    // dragulaService.drag.subscribe((value) => {
    //   // console.log(`drag: ${value[0]}`);
    //   this.onDrag(value.slice(1));
    // });
    // dragulaService.drop.subscribe((value) => {
    //   // console.log(`drop: ${value[0]}`);
    //   this.onDrop(value.slice(1));
    // });
    // dragulaService.over.subscribe((value) => {
    //   // console.log(`over: ${value}`);
    //   this.onOver(value.slice(1));
    // });
    // dragulaService.out.subscribe((value) => {
    //   // console.log(`out: ${value[0]}`);
    //   this.onOut(value.slice(1));
    // });
  }
  // private onDrag(args) {
  //   let [e, el] = args;
  //   // do something
  // }

  // private onDrop(args) {
  //   let [e, el] = args;
  //   // do something
  // }

  // private onOver(args) {
  //   let [e, el, container] = args;
  //   // do something
  // }

  // private onOut(args) {
  //   let [e, el, container] = args;
  //   console.log(args);
  //   // let hammer = new Hammer(e);
  //   // do something
  // }

  public openConfig(card: Card, index: number) {
    let task = card.tasks[index];
    let modal = this.modalCtrl.create(EditModal, { 'task': task });
    modal.onDidDismiss(data => {
      if (data) {
        if (data !== 'Delete') {
          data.cardId = card.cardId;
          if (task) {
            this.CardService.updateTaskToServer(data)
              .subscribe(res => {
                if (res.success && res.success === 'ok') {
                  task = data;
                  this.getCards();
                }
              })
          }
          else this.saveNewTask(card, data);
        } else {
          this.CardService.deleteTaskFromServer(task)
            .subscribe(res => {
              if (res.success && res.success === 'ok') {
                card.tasks.splice(index, 1);
                this.getCards();
              }
            })
        }
      }
    });
    modal.present();
  }
  saveNewTask(card, data) {
    data.sort = card.tasks.length;
    this.CardService.saveTaskToServer(data)
      .subscribe(res => {
        if (res && res.taskId) {
          card.tasks.push(res);
        }
      })
  }
  getCards() {
    this.CardService.getCardsFromServer()
      .subscribe(cards => {
        this.cards = null;
        this.cards = _.orderBy(cards, ['sort']);
        this.cards.map(card => {
          card.tasks = _.orderBy(card.tasks, ['importance', 'sort'], ['desc', 'desc']);
        })
        console.log(cards);
      }, error => {
        console.log(error);
      })
  }

  ngOnInit() {
    this.getCards();
  }
}
