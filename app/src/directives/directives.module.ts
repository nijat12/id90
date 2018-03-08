import { NgModule } from '@angular/core';
import { Autosize } from './autosize/autosize';
import { DelayDragLiftDirective } from './delayDragLift/delayDragLift';
@NgModule({
	declarations: [Autosize, DelayDragLiftDirective],
	imports: [],
	exports: [Autosize, DelayDragLiftDirective]
})
export class DirectivesModule {}
