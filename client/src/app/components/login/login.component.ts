import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../api/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { FormGroup } from '@angular/forms';
import { NameWithDigitsFormControl } from 'src/app/shared/form/name-with-digits-form-control/name-with-digits-form-control';
import { PasswordFormControl } from 'src/app/shared/form/password-form-control/password-form-control';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { Router } from '@angular/router';
import { SubscriptionHandler } from 'src/app/shared/components/subscriptionHandler';
import { collections } from 'src/app/shared/constants/collections';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public isLoggedIn = false;
  public roles: string[] = [];

  private userNameFormControl: NameWithDigitsFormControl;
  private passwordFormControl: PasswordFormControl;
  private subscriptionHandler: SubscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.initNewFormGroup();
    this.initControls();
    this.initSubscriptions();
  }

  initNewFormGroup(): void {
    this.form = new FormGroup({
      userName: new NameWithDigitsFormControl(true, false),
      password: new PasswordFormControl(true, false)
    });
  }

  private initSubscriptions(): void {
    this.subscriptionHandler.subscriptions = this.authService.isAuthenticated().subscribe(async isAuthenticated => {
      this.isLoggedIn = isAuthenticated;

      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;
      }
    });
  }

  initControls(): void {
    this.userNameFormControl = this.form.get('userName') as NameWithDigitsFormControl;
    this.passwordFormControl = this.form.get('password') as PasswordFormControl;
  }

  onSubmit(): void {
    this.authService.login(this.userNameFormControl.value, this.passwordFormControl.value).subscribe({
      next: data => {
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.snackBarService.show(collections.snackBar.loggedIn + this.roles);
        this.router.navigate(['home']);
      },
      error: err => {
        this.isLoggedIn = false;
      }
    });
  }

  get isFormDisabled(): boolean {
    return this.form.invalid;
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }
}
