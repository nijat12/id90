import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, Slides } from 'ionic-angular';
import _ from "lodash";
import { DragulaService } from 'ng2-dragula';
import 'rxjs/add/operator/map';
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
  @ViewChild(Slides) slides: Slides;

  cards: Card[];
  currentSlideTitle;
  currentSlideIndex;
  otherSlides: String[] = [];
  canAcess: boolean = true;
  dragging: boolean = false;

  toBin = {
  }

  drgagulaOptions: any = {
    removeOnSpill: false,
    revertOnSpill: true
  }

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private dragulaService: DragulaService,
    private CardService: cardService) {

    this.dragulaService.drag.subscribe((value) => {
      this.slides.lockSwipes(true);
      this.dragging = true;
    });
    this.dragulaService.drop.subscribe((value) => {
      let [e, el, content] = value.slice(1);
      this.moveTaskToBin();
      this.figureSorting(content);
    });
    this.dragulaService.dragend.subscribe((value) => {
      this.dragging = false;
    })
    this.dragulaService.out.subscribe((value) => {
      this.slides.lockSwipes(false);
      this.canAcess = false;
      setTimeout(() => {
        this.canAcess = true
      }, 300);
    });
  }

  moveTaskToBin() {
    for (let bin in this.toBin) {
      this.cards.forEach(c => {
        if (c.name === this.toBin[bin].name && this.toBin[bin].values.length > 0) {
          let task: Task = this.toBin[bin].values[0];
          task.cardId = c.cardId;
          this.updateTask(task).subscribe(task => {
            c.tasks.push(task);
            this.assignSorting(c);
            this.toBin[bin].values = [];
          });
        }
      })
    }
  }

  assignSorting (card: Card){
    card.tasks.forEach((task, i) => {
      task.sort = i+1;
      task.cardId = card.cardId;
    });
    this.updateSorting(card);
  };

  figureSorting(container) {
    let elements = Array.from(container.children);
    let map = {}
    elements.forEach((e, i) => {
      map[e['id']] = i + 1;
    });
    this.cards[this.currentSlideIndex].tasks.forEach(task => {
      task.sort = map[task.taskId];
      task.cardId = this.cards[this.currentSlideIndex].cardId;
    })
    this.updateSorting(this.cards[this.currentSlideIndex]);
  }

  updateSorting(card: Card) {
    this.CardService.updateAllTasks(card.tasks)
      .subscribe(data => {
      })
  }

  ifWithinADay(task) {
    let rtnVal = false;
    if (task && task.dueDate !== undefined) {
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDay()) + 1;
      let due = new Date(task.dueDate);
      due.setDate(due.getDay()) + 1;
      if (tomorrow > due) {
        rtnVal = true;
      }
    } 
    return rtnVal;
  }

  slideChanged() {
    this.currentSlideIndex = this.slides.getActiveIndex();
    if (this.cards && this.cards[this.currentSlideIndex] && this.cards[this.currentSlideIndex].name) {
      this.otherSlides = [];
      this.cards.map((c, i) => {
        this.toBin[c.name] = { name: c.name, values: [] };
        if (i === this.currentSlideIndex) {
          this.currentSlideTitle = this.cards[this.currentSlideIndex].name;
        }
        else {
          this.otherSlides.push(c.name);
        }
      })
    }
  }

  public openConfig(card: Card, index: number) {
    if (this.canAcess) {
      let task;
      if (index!==null) task = card.tasks[index];
      let modal = this.modalCtrl.create(EditModal, { 'task': task });
      modal.onDidDismiss(data => {
        if (data) {
          if (data !== 'Delete') {
            data.cardId = card.cardId;
            if (task) {
              this.updateTask(data).subscribe(task => {
                card.tasks[index] = task
              });
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

  updateTask(task) {
    return this.CardService.updateTaskToServer(task)
      .map(res => {
        if (res.success && res.success === 'ok') {
          return task;
          // this.getCards();
        }
      })
  }

  saveNewTask(card, data) {
    data.sort = card.tasks.length+1;
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
      card.tasks = _.orderBy(card.tasks, ['sort'], ['asc']);
    });
  }

  ngOnInit() {
    this.getCards();
  }

  ionViewDidEnter() {
    this.slideChanged();
  }
}
