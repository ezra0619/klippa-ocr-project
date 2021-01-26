import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageNotFoundComponent } from './dashboard/dashboard-page-not-found/dashboard-page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyDocumentsComponent } from './dashboard/my-documents/my-documents.component';
import { OcrFormComponent } from './dashboard/ocr-form/ocr-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/authentication/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'my-documents', pathMatch: 'full'},
    {path: 'my-documents', component: MyDocumentsComponent},
    {path: 'scan-documents', component: OcrFormComponent},
    {path: 'page-not-found', component: DashboardPageNotFoundComponent},
    {path: '**', redirectTo: 'page-not-found'},
  ]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'email-verification', component: VerifyEmailComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
