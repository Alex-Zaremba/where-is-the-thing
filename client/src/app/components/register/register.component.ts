import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/auth.service';
import { FormGroup } from '@angular/forms';
import { NameWithDigitsFormControl } from 'src/app/shared/form/name-with-digits-form-control/name-with-digits-form-control';
import { PasswordFormControl } from 'src/app/shared/form/password-form-control/password-form-control';
import { EmailFormControl } from 'src/app/shared/form/email-form-control/email-form-control';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { collections } from 'src/app/shared/constants/collections';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public isSuccessful = false;

  private userNameFormControl: NameWithDigitsFormControl;
  private emailFormControl: EmailFormControl;
  private passwordFormControl: PasswordFormControl;

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.initNewFormGroup();
    this.initControls();
  }

  initNewFormGroup(): void {
    this.form = new FormGroup({
      userName: new NameWithDigitsFormControl(true, false),
      email: new EmailFormControl(true, false),
      password: new PasswordFormControl(true, false)
    });
  }

  initControls(): void {
    this.userNameFormControl = this.form.get('userName') as NameWithDigitsFormControl;
    this.emailFormControl = this.form.get('email') as EmailFormControl;
    this.passwordFormControl = this.form.get('password') as PasswordFormControl;
  }

  onSubmit(): void {
    this.authService.register(this.userNameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.snackBarService.show(collections.snackBar.successfulRegistration);
      },
      error: err => {
        this.isSuccessful = false;
      }
    });
  }

  get isFormDisabled(): boolean {
    return this.form.invalid;
  }
}
