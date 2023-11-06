
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../pipes/pipes.module';
import { ModalsModule } from './modals/modals.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PipesModule,
    ModalsModule
  ],
  exports: [

  ],
  providers: [
  ]

})

export class SharedComponentsModule { }
