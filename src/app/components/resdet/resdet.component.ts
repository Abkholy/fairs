import { Fair } from './../../modules/Fair';
import { Component, OnInit , Input } from '@angular/core';
import { FairsService } from '../../services/fairs.service';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
defineLocale('de', deLocale);

@Component({
  selector: 'app-resdet',
  templateUrl: './resdet.component.html',
  styleUrls: ['./resdet.component.css']
})
export class ResdetComponent implements OnInit {

  datepickerModel: Date;
  selectedinterval: any;
  values = '';
  fairs$: Fair;
  dates: any;
  periods: any;
selectedFair: Fair ;
minDate: Date;
maxDate: Date;
  constructor(public fairservice: FairsService) {
    // this.minDate = new Date();
    // this.maxDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() - 1);
    // this.maxDate.setDate(this.maxDate.getDate() + 7);
  }



  ngOnInit() { this.fairservice.getFairs().subscribe(fairs => {
    this.fairs$ = fairs ;
        });
      }

      onChange(periods) {
console.log(periods) ;
      }

  onFairSelected(event) {
    this.fairservice.getfairsDates(event).subscribe(dates => {
      this.dates = dates ;
    });
 const last_Date = this.dates[this.dates.length - 1];
 const first_Date = this.dates[0];
this.maxDate = new Date(last_Date.id) ;
this.minDate = new Date (first_Date.id) ;

  }
  getperiods(event) {
    console.log(event);
  }

}



