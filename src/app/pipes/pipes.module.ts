import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { CustomTimeAgoPipe } from './custom-time-ago.pipe';



@NgModule({
    declarations: [
        CustomTimeAgoPipe
    ],
    exports: [
        CustomTimeAgoPipe
    ],
    imports: [
        CommonModule
    ],
  providers: [DatePipe]
})
export class PipesModule { }
