import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { CustomTimeAgoPipe } from './custom-time-ago.pipe';
import { MyFilterPipePipe } from './my-filter-pipe.pipe';
import { TruncatePipe } from './truncate.pipe';



@NgModule({
    declarations: [
        CustomTimeAgoPipe,
        MyFilterPipePipe,
        TruncatePipe
    ],
    exports: [
        CustomTimeAgoPipe,
        MyFilterPipePipe,
        TruncatePipe
    ],
    imports: [
        CommonModule
    ],
  providers: [DatePipe]
})
export class PipesModule { }
