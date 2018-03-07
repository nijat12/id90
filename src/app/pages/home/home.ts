import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NguCarousel, NguCarouselStore, NguCarouselService } from '@ngu/carousel';
import { DragulaService } from 'ng2-dragula';

import { Card } from '../../models/card';
import { cardService } from '../../services/card.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  cards: Card[];
  public carouselCards: NguCarousel;
  private carouselToken: string;

  constructor(public navCtrl: NavController,
    private carousel: NguCarouselService,
    private dragulaService: DragulaService,
    private CardService: cardService) {
      dragulaService.drag.subscribe((value) => {
        console.log(`drag: ${value[0]}`);
        this.onDrag(value.slice(1));
      });
      dragulaService.drop.subscribe((value) => {
        console.log(`drop: ${value[0]}`);
        this.onDrop(value.slice(1));
      });
      dragulaService.over.subscribe((value) => {
        console.log(`over: ${value[0]}`);
        this.onOver(value.slice(1));
      });
      dragulaService.out.subscribe((value) => {
        console.log(`out: ${value[0]}`);
        this.onOut(value.slice(1));
      });
  }
  private onDrag(args) {
    let [e, el] = args;
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

  initDataFn(key: NguCarouselStore) {
    this.carouselToken = key.token;
  }

  tilesMoved(event: NguCarouselStore) {
    console.log(event.currentSlide);
  }

  ngOnInit() {
    this.CardService.getCardsFromServer()
      .subscribe(cards => {
        this.cards = cards;
        console.log(cards);
      }, error => {
        console.log(error);
      })

    this.carouselCards = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true,
        pointStyles: `
                  .ngucarouselPoint {
                    list-style-type: none;
                    text-align: center;
                    padding: 12px;
                    margin: 0;
                    white-space: nowrap;
                    overflow: auto;
                    position: absolute;
                    width: 100%;
                    top: 0;
                    box-sizing: border-box;
                  }
                  .ngucarouselPoint li {
                    display: inline-block;
                    border-radius: 999px;
                    background: #444444;
                    width: 10px;
                    height: 10px;
                    padding: 5px;
                    margin: 2.5px 3px;
                    transition: .2s ease all;
                  }
                  .ngucarouselPoint li.active {
                      background: white;
                      width: 15px;
                      height: 15px;
                      margin: 0px 3px;
                      border: 0.5px solid #444444;
                  }
                `
      },
      load: 2,
      touch: true,
      custom: 'banner',
      easing: 'cubic-bezier(0, 0, 0.2, 1)'
    }
  }
}
