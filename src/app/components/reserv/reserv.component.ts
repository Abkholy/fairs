import { ReservationsService } from './../../services/reservations.service';
import { Reservation } from './../../modules/Reservation';
import { Component, OnInit , Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router , ActivatedRoute , Params } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-reserv',
  templateUrl: './reserv.component.html',
  styleUrls: ['./reserv.component.css']
})
export class ReservComponent implements OnInit {

  reservations$: Reservation[];
  // tslint:disable-next-line:no-inferrable-types
   editState: boolean = false;
   reserveToEdit: Reservation;

  constructor(private reservationsService: ReservationsService ,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public flashMessagesService: FlashMessagesService) {


     }

  ngOnInit() {
    this.reservationsService.getReservation().subscribe(reservations => {
this.reservations$ = reservations ;
    });

  }
  deleterservation(event, reservations$: Reservation) {
    if (confirm('هل أنت متأكد من إلغاء الزيارة!')) {
      this.clearState();
      this.reservationsService.deleteReservation(reservations$);
      // tslint:disable-next-line:max-line-length
      this.flashMessagesService.show('تم إلغاء الزيارة بنجاح', {cssClass: 'alert alert-success text-center alert-dismissible fade show ', timeout: 1000});
      this.router.navigate(['/']);
  }}
  clearState() {
    this.editState = false;
    this.reserveToEdit = null;
  }

  editReservation(event, reservations: Reservation) {
    this.editState = true ;
    this.reserveToEdit = reservations ;
      }
      updateReservaion(reservations: Reservation) {
    this.reservationsService.updateReservation(reservations);
    this.clearState();
      }
}
