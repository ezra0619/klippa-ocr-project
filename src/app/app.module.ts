import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './dashboard/my-account/my-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login/login-form/login-form.component';

import { AngularFireStorageModule} from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire';

import { environment } from 'src/environments/environment';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { OcrDetailsFormComponent } from './dashboard/ocr-details-form/ocr-details-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountFormComponent } from './login/create-account-form/create-account-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    MyAccountComponent,
    SettingsComponent,
    DashboardComponent,
    LoginFormComponent,
    OcrDetailsFormComponent,
    CreateAccountFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
