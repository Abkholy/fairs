import { Fair } from './../../modules/Fair';
import { Component, OnInit , Input } from '@angular/core';
import { FairsService } from '../../services/fairs.service';
import { Observable } from 'rxjs/Observable';
import {Router , ActivatedRoute , Params } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { moment } from 'ngx-bootstrap/chronos/test/chain';


@Component({
  selector: 'app-fairs',
  templateUrl: './fairs.component.html',
  styleUrls: ['./fairs.component.css']
})

export class FairsComponent implements OnInit {
 fairs$: Fair[];
// tslint:disable-next-line:no-inferrable-types
editState: boolean = false;
fairToEdit: Fair;
periods = [
  '8 - 8:30 صباحًا',
  '8:30 - 9 صباحًا',
  '9 - 9:30 صباحًا',
  '9:30 - 10 صباحًا',
  ] ;
  constructor( private fairsservice: FairsService ,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.fairsservice.getFairs().subscribe(fairs => {
this.fairs$ = fairs ;
    });

  }
  getDates(startDate, endDate) {
    const dateArray = [];
    let currentDate = moment(startDate);
    const stopDate = moment(endDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY/MM/DD') );
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;

}
  deletefair(event, fair: Fair) {
    const dates = this.getDates(fair.fromDate , fair.toDate);
    if (confirm('هل أنت متأكد من حذف المعرض')) {
      this.clearState();
      this.fairsservice.deleteFair(fair);
      this.fairsservice.deleteFairCollections(fair, dates);
      this.fairsservice.deleteperiodfromfairdates(fair, dates , this.periods );
      // tslint:disable-next-line:max-line-length
      this.flashMessagesService.show('تم حذف المعرض بنجاح', {cssClass: 'alert alert-success text-center alert-dismissible fade show ', timeout: 1000});
      this.router.navigate(['/']);
  }}
  clearState() {
    this.editState = false;
    this.fairToEdit = null;
  }

  editFair(event, fair: Fair) {
this.editState = true ;
this.fairToEdit = fair ;
  }
  updateFair(fair: Fair) {
    const dates = this.getDates(fair.fromDate , fair.toDate);
this.fairsservice.updatefair(fair);
this.fairsservice.updatefairdates(fair, dates);
this.clearState();
  }

}
