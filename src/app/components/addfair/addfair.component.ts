import { SettingsService } from '../../services/settings.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FairsService } from './../../services/fairs.service';
import { Component, OnInit } from '@angular/core';
import { Fair } from '../../modules/Fair';
import {Router , ActivatedRoute , Params } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { moment } from 'ngx-bootstrap/chronos/test/chain';



@Component({
  selector: 'app-addfair',
  templateUrl: './addfair.component.html',
  styleUrls: ['./addfair.component.css']
})
export class AddfairComponent implements OnInit {
fair: Fair = {
fairName: '' ,
fromDate: new(Date),
toDate: new(Date),
Location: '',
noOfSchools: 1 ,
};

periods = [
 '8 - 8:30 صباحًا',
 '8:30 - 9 صباحًا',
 '9 - 9:30 صباحًا',
 '9:30 - 10 صباحًا',
 ] ;

// tslint:disable-next-line:no-inferrable-types
canAddFair: boolean = true ;

  constructor(private fairsservice: FairsService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public settingsService: SettingsService
  ) {}
  ngOnInit() {
    this.canAddFair = this.settingsService.getSettings().canAddFair ;

  }

  getDates(startDate, endDate) {
    const dateArray = [];
    let currentDate = moment(startDate);
    const stopDate = moment(endDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') );
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;

}

  onSubmit() {
    const  d = new Date();
if (this.fair.fairName !== '') {
  const dates = this.getDates(this.fair.fromDate , this.fair.toDate);
  this.fairsservice.addFair(this.fair);
  this.fairsservice.addfairDates(this.fair, dates );
  this.fairsservice.addperiodtofairdates(this.fair, dates , this.periods);

  this.fair.fairName = '';
  this.fair.fromDate = d;
  this.fair.toDate = d;
  this.fair.Location = '';
  this.fair.noOfSchools = 1 ;
  // tslint:disable-next-line:max-line-length
  this.flashMessagesService.show('تم إضافة المعرض بنجاح', {cssClass: 'alert alert-success text-center alert-dismissible fade show ', timeout: 4000});
this.router.navigate(['/fairs']);
}
  }
}
