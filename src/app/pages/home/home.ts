import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';

import { Card } from '../../models/card';
import { cardService } from '../../services/card.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  cards: Card[];

  constructor(public navCtrl: NavController,
    private dragulaService: DragulaService,
    private CardService: cardService) {
      dragulaService.drag.subscribe((value) => {
        // console.log(`drag: ${value[0]}`);
        this.onDrag(value.slice(1));
      });
      dragulaService.drop.subscribe((value) => {
        // console.log(`drop: ${value[0]}`);
        this.onDrop(value.slice(1));
      });
      dragulaService.over.subscribe((value) => {
        // console.log(`over: ${value[0]}`);
        this.onOver(value.slice(1));
      });
      dragulaService.out.subscribe((value) => {
        // console.log(`out: ${value[0]}`);
        this.onOut(value.slice(1));
      });
  }
  private onDrag(args) {
    let [e, el] = args;
    console.log(args);
    // do something
  }
  
  private onDrop(args) {
    let [e, el] = args;
    // do something
  }
  
  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }
  
  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }

  ngOnInit() {
    this.CardService.getCardsFromServer()
      .subscribe(cards => {
        this.cards = cards;
        console.log(cards);
      }, error => {
        console.log(error);
      })
  }
}
