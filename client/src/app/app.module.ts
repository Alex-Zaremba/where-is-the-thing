import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardThingsComponent } from './components/board-things/board-things.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { httpInterceptorProviders } from './infrastructure/http.interceptor';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { PipesModule } from './shared/pipes/pipes.module';
import { ModalsModule } from './shared/components/modals/modals.module';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { FormModule } from './shared/form/form.module';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './api/auth.service';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { AdminGuard } from './infrastructure/guards/admin.guard';
import { EditContainerComponent } from './components/container/edit-container/edit-container.component';
import { EditThingComponent } from './components/thing/edit-thing/edit-thing.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContainerComponent } from './components/container/container/container.component';
import { MoveContainerComponent } from './components/container/move-container/move-container.component';
import { ParentChildDataService } from './shared/services/parent-child-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardThingsComponent,
    EditContainerComponent,
    EditThingComponent,
    ContainerComponent,
    MoveContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SharedComponentsModule,
    PipesModule,
    ModalsModule,
    FormModule,
    MatSnackBarModule,
    DragDropModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    ParentChildDataService,
    httpInterceptorProviders,
    provideEnvironmentNgxMask(),
    provideAnimations(),
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: false
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private modalService: BsModalService) {
    this.modalService.config.keyboard = true;
    this.modalService.config.backdrop = 'static';
    this.modalService.config.ignoreBackdropClick = true;
  }
}


