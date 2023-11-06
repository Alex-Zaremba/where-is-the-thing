import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../api/user.service';
import { SubscriptionHandler } from 'src/app/shared/components/subscriptionHandler';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public content?: string;
  public isLoggedIn = false;
  public subscriptionHandler: SubscriptionHandler = new SubscriptionHandler();

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.subscriptionHandler.subscriptions = this.authService.isAuthenticated().subscribe(async isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });

    this.subscriptionHandler.subscriptions = this.userService.getPublicContent().subscribe((resp: any) => {
      this.content = resp.message;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribeAll();
  }
}
