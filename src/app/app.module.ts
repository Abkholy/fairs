import { SettingsService } from './services/settings.service';
import { AuthService } from './services/auth.service';
import { FairsService } from './services/fairs.service';
import { FairsComponent } from './components/fairs/fairs.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddfairComponent } from './components/addfair/addfair.component';
import { ReservComponent } from './components/reserv/reserv.component';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { MembersComponent } from './components/members/members.component';
import { ReservationsService } from './services/reservations.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddresComponent } from './components/addres/addres.component';
import { ResdetComponent } from './components/resdet/resdet.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
defineLocale('de', deLocale);

const appRoute: Routes = [
{ path: '' , component : DashboardComponent , canActivate: [AuthGuard] },
{ path: 'fairs' , component : FairsComponent  , canActivate: [AuthGuard] },
{ path: 'addfair' , component : AddfairComponent , canActivate: [AuthGuard] },
{ path: 'res' , component : ReservComponent  , canActivate: [AuthGuard] },
{ path: 'login' , component : LoginComponent   },
{ path: 'reg' , component : RegisterComponent  },
{ path: 'addres' , component : AddresComponent  , canActivate: [AuthGuard]  },
{ path: 'resdet' , component : ResdetComponent  , canActivate: [AuthGuard] },
// { path: 'settttttings' , component : SettingsComponent  , canActivate: [AuthGuard] },
{path: '**', component: PageNotFoundComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    FairsComponent,
    NavbarComponent,
    DashboardComponent,
    AddfairComponent,
    ReservComponent,
    MembersComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    SettingsComponent,
    AddresComponent,
    ResdetComponent

  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    RouterModule.forRoot(appRoute),
    FlashMessagesModule.forRoot(),
    BsDatepickerModule.forRoot()

       ] ,
  providers: [

    FairsService,
    ReservationsService,
    AuthService,
    AngularFireAuth,
    AuthGuard,
    RegisterGuard,
    SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
