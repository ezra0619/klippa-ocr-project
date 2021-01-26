import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AngularFireStorageModule} from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NgAuthService } from './shared/authentication/ng-auth.service';
import { SignUpFormComponent } from './sign-up/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './sign-in/sign-in-form/sign-in-form.component';
import { TopNavComponent } from './dashboard/top-nav/top-nav.component';
import { OcrFormComponent } from './dashboard/ocr-form/ocr-form.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDocumentsComponent } from './dashboard/my-documents/my-documents.component';
import { DashboardPageNotFoundComponent } from './dashboard/dashboard-page-not-found/dashboard-page-not-found.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NiceLookingKeyPipe } from './shared/pipes/nice-looking-key.pipe';
import { FirestoreDatePipe } from './shared/pipes/firestore-date.pipe';
import { TwoDecimalSumStrPipe } from './shared/pipes/two-decimal-sum-str.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TopNavComponent,
    DashboardComponent,
    MyDocumentsComponent,
    SignInComponent,
    SignInFormComponent,
    SignUpComponent,
    SignUpFormComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    OcrFormComponent,
    FirestoreDatePipe,
    NiceLookingKeyPipe,
    TwoDecimalSumStrPipe,
    DashboardPageNotFoundComponent,
    PageNotFoundComponent
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
    MatSliderModule,
    MatRadioModule
  ],
  providers: [NgAuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
