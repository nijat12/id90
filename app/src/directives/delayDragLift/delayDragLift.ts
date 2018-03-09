import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[delayDragLift]' })
export class DelayDragLiftDirective {

    dragDelay: number = 200; // milliseconds
    draggable: boolean = false;
    touchTimeout: any;
    lastX;

    @HostListener('touchmove', ['$event'])
    // @HostListener('mousemove', ['$event'])
    onMove(e: Event) {
        var currentX = e['touches'][0].clientX;

        if (this.lastX+20< currentX || this.lastX-20> currentX) {
            // Movement is Horizantal
        } else {
            if (!this.draggable) {
                e.stopPropagation();
                clearTimeout(this.touchTimeout);
            }
        }
        this.lastX = e['touches'][0].clientX;
    }

    @HostListener('touchstart', ['$event'])
    // @HostListener('mousedown', ['$event'])
    onDown(e: Event) {
        this.touchTimeout = setTimeout(() => {
            this.draggable = true;
        }, this.dragDelay);
    }

    @HostListener('touchend', ['$event'])
    // @HostListener('mouseup', ['$event'])
    onUp(e: Event) {
        clearTimeout(this.touchTimeout);
        this.draggable = false;
    }

    constructor(private el: ElementRef) { }
}