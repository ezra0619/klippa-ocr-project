import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyAccountComponent } from './dashboard/my-account/my-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AngularFireStorageModule} from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { OcrDetailsFormComponent } from './dashboard/ocr-details-form/ocr-details-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NgAuthService } from './shared/ng-auth.service.ts.service';
import { SignUpFormComponent } from './sign-up/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './sign-in/sign-in-form/sign-in-form.component';
import { HamburgerToggleDirective } from './shared/hamburger-toggle.directive';
import { TopNavComponent } from './dashboard/top-nav/top-nav.component';
import { OcrFormComponent } from './dashboard/ocr-form/ocr-form.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent,
    MyAccountComponent,
    SettingsComponent,
    DashboardComponent,
    OcrDetailsFormComponent,
    SignInComponent,
    SignInFormComponent,
    SignUpComponent,
    SignUpFormComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HamburgerToggleDirective,
    OcrFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule
  ],
  providers: [NgAuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
