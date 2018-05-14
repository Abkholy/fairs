import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: string;
password: string;
  constructor(
    public router: Router,
    public flashmessagesservice: FlashMessagesService ,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  mySubmit(email: string , password: string) {
this.authService.login(this.email, this.password)
.then((res) => {
    this.flashmessagesservice.show('تم الدخول !' , {cssClass: 'alert-success' , timeout: 2000} );
    this.router.navigate(['/']);
  })
  .catch( (err) => {
    this.flashmessagesservice.show( 'خطأ في اسم المستخدم أو كلمة السر' , {cssClass: 'alert-danger' , timeout: 2000} );
    this.router.navigate(['/login']);
  }

  );
  }
}
