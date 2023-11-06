import { NgModule } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteConfirmModalComponent } from './delete-confirm-modal/delete-confirm-modal.component';


@NgModule({
  declarations: [
    AlertModalComponent,
    DeleteConfirmModalComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    FontAwesomeModule,
  ],
  exports: [
    AlertModalComponent,
    DeleteConfirmModalComponent
  ],
  providers: [
  ],
})

export class ModalsModule { }
