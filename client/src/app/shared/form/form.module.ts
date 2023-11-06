import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TrimDirective } from '../directives/trim.directive';
import { OnlyLettersDirective } from '../directives/only-letters.directive';
import { MatNativeDateModule, } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from '../pipes/pipes.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { NameFormControlComponent } from './name-form-control/name-form-control.component';
import { NameWithDigitsFormControlComponent } from './name-with-digits-form-control/name-with-digits-form-control.component';
import { NumberFormControlComponent } from './number-form-control/number-form-control.component';
import { PasswordFormControlComponent } from './password-form-control/password-form-control.component';
import { EmailFormControlComponent } from './email-form-control/email-form-control.component';
import { DropDownFormControlComponent } from './dropdown-form-control/dropdown-form-control.component';

@NgModule({
  declarations: [
    TrimDirective,
    OnlyLettersDirective,
    NameFormControlComponent,
    NameWithDigitsFormControlComponent,
    NumberFormControlComponent,
    PasswordFormControlComponent,
    EmailFormControlComponent,
    DropDownFormControlComponent
  ],
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    PipesModule,
    FontAwesomeModule,
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  exports: [
    NameFormControlComponent,
    NameWithDigitsFormControlComponent,
    NumberFormControlComponent,
    PasswordFormControlComponent,
    EmailFormControlComponent,
    DropDownFormControlComponent
  ],
  providers: [provideNgxMask()]
})
export class FormModule { }
