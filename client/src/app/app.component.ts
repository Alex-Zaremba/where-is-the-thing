import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './shared/services/storage.service';
import { AuthService } from './api/auth.service';
import { EventBusService } from './shared/event-bus.service';
import { SubscriptionHandler } from './shared/components/subscriptionHandler';
import { SnackBarService } from './shared/services/snack-bar.service';
import { Router } from '@angular/router';
import { collections } from './shared/constants/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  public isLoggedIn = false;
  public showAdminBoard = false;
  public username?: string;
  private subscriptionHandler: SubscriptionHandler = new SubscriptionHandler();
  private eventBusSub?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private storageService: StorageService,
    private eventBusService: EventBusService
  ) { }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.subscriptionHandler.subscriptions = this.authService.isAuthenticated().subscribe(async isAuthenticated => {
      this.isLoggedIn = isAuthenticated;

      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.username = user.username;
      }
    });
  }

  public logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        this.snackBarService.show(collections.snackBar.loggedOut);
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 500);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
