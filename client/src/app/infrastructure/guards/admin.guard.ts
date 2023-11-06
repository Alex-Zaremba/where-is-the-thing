import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.storageService.getUser();
    const isAdmin = user.roles.includes('ROLE_ADMIN');

    this.handleIsAdmin(isAdmin)

    return isAdmin;
  }

  private handleIsAdmin(isAdmin: boolean): void {
    if (!isAdmin) {
      this.router.navigate(['things']);
    }
  }
}
