import { NgModule } from '@angular/core';
import { SafeHtml } from './safe-html.pipe';
import { DateTimePipe } from './date-time.pipe';


@NgModule({
  declarations: [
    SafeHtml,
    DateTimePipe
  ],
  imports: [
  ],
  exports: [
    SafeHtml,
    DateTimePipe
  ],
  providers: [
  ],
})
export class PipesModule { }
