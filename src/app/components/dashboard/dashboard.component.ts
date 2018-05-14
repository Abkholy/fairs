import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLogIn: boolean;
  isUserLogin: string;
  enableRegister: boolean;
  canAddFair = true;
  isRegisterOpen = true;
  constructor(public router: Router,
    public authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    public settingsService: SettingsService
) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
          this.isLogIn = true ;
          this.isUserLogin = auth.email ;
      } else {
        this.isLogIn = false ;
      }
    });
    this.canAddFair = this.settingsService.getSettings().canAddFair;
    this.isRegisterOpen = this.settingsService.getSettings().isRegisterOpen;
  }

}
