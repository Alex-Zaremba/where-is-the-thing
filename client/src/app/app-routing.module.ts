import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardThingsComponent } from './components/board-things/board-things.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { AdminGuard } from './infrastructure/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'things',
    component: BoardThingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: BoardAdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
