import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, Slides } from 'ionic-angular';
import _ from "lodash";
import { DragulaService } from 'ng2-dragula';
// import { Hammer } from 'hammerjs';

import { Card } from '../../models/card';
import { cardService } from '../../services/card.service';
import { EditModal } from './edit.modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild(Slides) slides: Slides;

  cards: Card[];
  currentSlideTitle;
  canAcess: boolean = true;

  drgagulaOptions: any = {
    removeOnSpill: false,
    revertOnSpill: true
  }

  // x: number = 0;
  // y: number = 0;
  // startX: number = 0;
  // startY: number = 0;

  // onPanStart(event: any): void {
  //   event.preventDefault();
  //   this.startX = this.x;
  //   this.startY = this.y;
  // }
  // onPan(event: any): void {
  //   event.preventDefault();
  //   this.x = this.startX + event.deltaX;
  //   this.y = this.startY + event.deltaY;
  //   console.log(this.x + ' ' + this.y );
  // }

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private dragulaService: DragulaService,
    private CardService: cardService) {

    // dragulaService.drag.subscribe((value) => {
    //   // console.log(`drag: ${value[0]}`);
    //   let [e, el] = value.slice(1);
    //   this.slides.lockSwipes(true);

    //   // var hammertime = new Hammer(e);
    //   // hammertime.on('pan', function (ev) {
    //   //   console.log(ev);
    //   // });

    // });
    // dragulaService.drop.subscribe((value) => {
    //   console.log(`drop: ${value[0]}`);
    //   console.log(value);
    //   let [e, el] = value.slice(1);
    // });
    // dragulaService.over.subscribe((value) => {
    //   // console.log(`over: ${value}`);
    //   let [e, el, container] = value.slice(1);
    // });
    // dragulaService.out.subscribe((value) => {
    //   // console.log(`out: ${value[0]}`);
    //   let [e, el, container] = value.slice(1);
    //   this.slides.lockSwipes(false);
    //   this.canAcess = false;
    //   setTimeout(() => {
    //     this.canAcess = true
    //   }, 300);
    //   var rect = e.getBoundingClientRect();
    //   // console.log(rect.top, rect.right, rect.bottom, rect.left);
    // });
  }

  slideChanged() {
    let active = this.slides.getActiveIndex();
    if (this.cards && this.cards[active] && this.cards[active].name)
      this.currentSlideTitle = this.cards[active].name;
  }

  public openConfig(card: Card, index: number) {
    if (this.canAcess) {
      let task;
      if (index) task = card.tasks[index];
      let modal = this.modalCtrl.create(EditModal, { 'task': task });
      modal.onDidDismiss(data => {
        if (data) {
          if (data !== 'Delete') {
            data.cardId = card.cardId;
            if (task) {
              this.CardService.updateTaskToServer(data)
                .subscribe(res => {
                  if (res.success && res.success === 'ok') {
                    card[index] = data;
                    // this.getCards();
                  }
                })
            }
            else this.saveNewTask(card, data);
          } else {
            this.CardService.deleteTaskFromServer(task)
              .subscribe(res => {
                if (res.success && res.success === 'ok') {
                  card.tasks.splice(index, 1);
                  // this.getCards();
                }
              })
          }
        }
      });
      modal.present();
    }
  }
  saveNewTask(card, data) {
    data.sort = card.tasks.length;
    this.CardService.saveTaskToServer(data)
      .subscribe(res => {
        if (res && res.taskId) {
          card.tasks.push(res);
          // this.sortCards(this.cards);
        }
      })
  }
  getCards() {
    this.CardService.getCardsFromServer()
      .subscribe(cards => {
        this.cards = null;
        this.sortCards(cards);
      }, error => {
        console.log(error);
      })
  }

  sortCards(cards) {
    this.cards = _.orderBy(cards, ['sort']);
    this.cards.map(card => {
      card.tasks = _.orderBy(card.tasks, ['importance', 'sort'], ['desc', 'desc']);
    });
  }

  ngOnInit() {
    this.getCards();
  }

  ionViewDidEnter() {
    this.slideChanged();
  }
}
