import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;



  constructor(
    public router: Router,
    public authService: AuthService,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  mySubmit(email, password) {

    this.authService.register(this.email, this.password).then((res) => {
        this.flashMessagesService.show('تم التسجيل', {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['/']);
      }).catch( (err) => {
        this.flashMessagesService.show( 'التسجيل مغلق أعد المحاولة لاحقاً', {cssClass: 'alert-danger', timeout: 6000});
        this.router.navigate(['/reg']);
      });

      }

}
