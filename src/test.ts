import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; //firestore
import {CalendarModule} from 'primeng/calendar';//date picker
import { DatePipe } from '@angular/common'; //date filter
import {FairService}from'../../services/fair.service';
import {Fair}from'../../models/Fair';
import {Period}from'../../models/period';
import { Observable } from '@firebase/util';
@Component({
  selector: 'app-resform',
  templateUrl: './resform.component.html',
  styleUrls: ['./resform.component.css']
})


export class ResformComponent implements OnInit {

//ReservationData
slectedfair:string=" ";
slecteddate:string=" ";
slectedinterval:string;
selectedSchoolName:string;
selectedEDULevel:string;
selectedOffice:string;
selectedSchoolPhone:string;
selectedSupervisor:string;
selectedSupervisorPhone:string;
selectedStudentsNumber:number;

//selected fair date
mindate:Date=new Date(1999,8,9);
maxdate:Date=new Date(1999,8,9);

//periods
periods:Observable<Period>;

//date value
en:any; //date picker localizer
value:Fair;
dates:any;


//***firestore observables***//
faircollection:AngularFirestoreCollection<any>=this.afs.collection('FairsTest');
fiarobs=this.faircollection.valueChanges();

periodcollection:AngularFirestoreCollection<any>=this.afs.collection("FairsTest")
.doc(" ").collection("dates").doc(" ").collection("periods");
periodobs=this.periodcollection.valueChanges();
 
//        fe decleration el class fo2

reservationcollection:AngularFirestoreCollection<any>=this.afs.collection("reservationsTest");
reservationobs=this.reservationcollection.valueChanges();


//********//



constructor(private afs:AngularFirestore ,private fairService:FairService, private datePipe: DatePipe) {}



    ngOnInit() {
        this.en = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: 'Today',
            clear: 'Clear'
        };



      


    }



   getdates(event){
    
  console.log(this.mindate);
  console.log(this.maxdate);

if(this.slectedfair == "قائمة المعارض"){
  this.mindate=new Date(1999,8,9);
  this.maxdate=new Date(1999,8,9);
  this.slecteddate=" ";
  this.periodcollection=this.afs.collection("FairsTest")
  .doc(" ").collection("dates").doc(" ").collection("periods");
  this.periodobs=this.periodcollection.valueChanges();
  
  }else
      {
        this.fairService.getFairDates(this.slectedfair).subscribe(fiarobs=>{this.value=fiarobs;
          this.mindate=new Date(this.value.fromDate);  this.maxdate=new Date(this.value.toDate); });
      }

  }

   getperiods(event){
    
    this.slecteddate=this.datePipe.transform(this.slecteddate, 'yyyy-MM-dd');

    this.periodcollection=this.afs.collection("FairsTest")
    .doc(this.slectedfair).collection("dates").doc(this.slecteddate).collection("periods");
    this.periodobs=this.periodcollection.valueChanges();

   }






  AddReservation(){
    
    this.reservationcollection.doc("زيارة "+this.selectedSchoolName+" ل "+this.slectedfair).set({

      eduLevel: this.selectedEDULevel,
      eduOffice: this.selectedOffice,
      schoolName: this.selectedSchoolName,
      schoolPhone: this.selectedSchoolPhone,
      studentNumber: this.selectedStudentsNumber,
      teacherName: this.selectedSupervisor,
      teacherPhone: this.selectedSupervisorPhone,
      visitDate: this.slecteddate,
      visitTime: this.slectedinterval}).catch((err)=>{console.log(err);})


  }
    // this.prodcollection.doc(this.prodname).set({
    //   productname:this.prodname,
    //   productdesc:this.proddesc
    // }).catch((err)=>{console.log(err);})
  
  



  update(){

    // this.datecollection.doc("date0").update({
    //   date0:this.slecteddate,
    // }).then(()=>{console.log('doneeeeeeeeee');
    // })

  }



  deleteperiod(){
    // this.prodcollection.doc(prodname).delete().then(()=>{console.log('donaaaaaaaa');
    // })
  }


}