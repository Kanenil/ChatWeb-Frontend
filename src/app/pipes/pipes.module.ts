import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { CustomTimeAgoPipe } from './custom-time-ago.pipe';
import { MyFilterPipePipe } from './my-filter-pipe.pipe';
import { TruncatePipe } from './truncate.pipe';
import { FileSizePipe } from './file-size.pipe';



@NgModule({
    declarations: [
        CustomTimeAgoPipe,
        MyFilterPipePipe,
        TruncatePipe,
        FileSizePipe
    ],
  exports: [
    CustomTimeAgoPipe,
    MyFilterPipePipe,
    TruncatePipe,
    FileSizePipe
  ],
    imports: [
        CommonModule
    ],
  providers: [DatePipe]
})
export class PipesModule { }
