import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './dashboard/my-account/my-account.component';
import { OcrDetailsFormComponent } from './dashboard/ocr-details-form/ocr-details-form.component';
import { OcrFormComponent } from './dashboard/ocr-form/ocr-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './shared/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'my-account', pathMatch: 'full'},
    {path: 'my-account', component: MyAccountComponent},
    {path: 'scan-documents', component: OcrFormComponent}
  ]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'email-verification', component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
