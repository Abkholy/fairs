import { Fair } from './../modules/Fair';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class FairsService {
  fairsColl: AngularFirestoreCollection<{ any }>;
  fairs: Observable<any>;
  fairDoc: AngularFirestoreDocument<Fair>;
  datecoll: AngularFirestoreCollection<any>;
  datesobs: Observable<any[]>;
  dateDoc: AngularFirestoreDocument<any>;
  periodcoll: AngularFirestoreCollection<any>;
  periodobs: Observable<any[]>;
periodDoc: AngularFirestoreDocument<any>;

  constructor(public afs: AngularFirestore ) {}

  getFairs() {
    this.fairsColl = this.afs.collection('Fairs', ref =>
    ref.orderBy('fromDate', 'desc')
  );
  this.fairs = this.afs
    .collection('Fairs')
    .snapshotChanges()
    .map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Fair;
        data.id = a.payload.doc.id;
        return data;
      });
    });

    return this.fairs;
  }

  getfairsDates(fair) {
    this.datecoll = this.afs
    .collection(`Fairs`)
    .doc(fair)
    .collection(`dates`);
  this.datesobs = this.afs
    .collection(`Fairs`)
    .doc(fair)
    .collection(`dates`)
    .snapshotChanges()
    .map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Fair;
        data.id = a.payload.doc.id;
        return data;
      });
    });

  return this.datesobs;
  }
  addFair(fairs$: Fair) {
    this.fairsColl = this.afs.collection('Fairs', ref =>
      ref.orderBy('fromDate', 'desc')
    );
    this.fairs = this.afs
      .collection('Fairs')
        .snapshotChanges()
        .map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Fair;
            data.id = a.payload.doc.id;
            return data;
          });
        });
    this.fairsColl.doc(`${fairs$.fairName}`).set(fairs$);

    return fairs$.fairName;
  }



  addfairDates(fair: Fair, dates) {
    this.datecoll = this.afs
      .collection(`Fairs`)
      .doc(`${fair.fairName}`)
      .collection(`dates`);
    this.datesobs = this.afs
      .collection(`Fairs`)
      .doc(`${fair.fairName}`)
      .collection(`dates`)
      .valueChanges();
    for (let i = 0; i < dates.length; i++) {
      this.datecoll.doc(`${dates[i] }`).set({
        date: dates[i]
      });
    }
  }

  addperiodtofairdates(fair: Fair, dates, periods) {
    for (let i = 0; i < dates.length; i++) {
      this.datecoll = this.afs
        .collection(`Fairs`)
        .doc(`${fair.fairName}`)
        .collection(`dates`)
        .doc(`${dates[i]}`)
        .collection(`periods`);
      this.datesobs = this.afs
        .collection(`Fairs`)
        .doc(`${fair.fairName}`)
        .collection(`dates`)
        .doc(`${dates[i]}`)
        .collection(`periods`)
        .valueChanges();
      this.datecoll.doc(`${periods[0]}`).set({ period: periods[0] , availablePlaces: fair.noOfSchools});
      this.datecoll.doc(`${periods[1]}`).set({ period: periods[1]  , availablePlaces: fair.noOfSchools});
      this.datecoll.doc(`${periods[2]}`).set({ period: periods[2]  , availablePlaces: fair.noOfSchools});
      this.datecoll.doc(`${periods[3]}`).set({ period: periods[3]  , availablePlaces: fair.noOfSchools});
    }
  }





  getDatesPeriods(fair: Fair, date) {
      this.datecoll = this.afs
        .collection(`Fairs`)
        .doc(`${fair.fairName}`)
        .collection(`dates`)
        .doc(`${date}`)
        .collection(`periods`);
      this.datesobs = this.afs
        .collection(`Fairs`)
        .doc(`${fair.fairName}`)
        .collection(`dates`)
        .doc(`${date}`)
        .collection(`periods`)
        .snapshotChanges()
        .map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Fair;
            data.id = a.payload.doc.id;
            return data;
          });
        });
        return this.datesobs;
  }

  deleteFair(fair: Fair) {
    this.fairsColl = this.afs.collection('Fairs', ref =>
      ref.orderBy('fromDate', 'desc')
    );
    this.fairs = this.afs
      .collection('Fairs')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Fair;
          data.id = a.payload.doc.id;
          return data;
        });
      });
    this.fairDoc = this.afs.doc(`Fairs/${fair.id}`);
    this.fairDoc.delete();
  }


  deleteFairCollections(fair: Fair , dates) {
    this.datecoll = this.afs
    .collection(`Fairs`)
    .doc(`${fair.fairName}`)
    .collection(`dates`);
  this.datesobs = this.afs
    .collection(`Fairs`)
    .doc(`${fair.fairName}`)
    .collection(`dates`)
    .valueChanges();
  for (let i = 0; i < dates.length; i++) {
    this.dateDoc = this.afs.doc(`Fairs/${fair.fairName}/dates/${dates[i]}`);
    this.dateDoc.delete();
  }
  }
  deleteperiodfromfairdates(fair: Fair, dates, periods) {
    for (let i = 0; i < dates.length; i++) {
      this.datecoll = this.afs
        .collection(`Fairs`)
        .doc(`${fair.fairName}`)
        .collection(`dates`)
        .doc(`${dates[i]}`)
        .collection(`periods`);
      this.datesobs = this.afs
        .collection(`Fairs`)
        .doc(`${fair.fairName}`)
        .collection(`dates`)
        .doc(`${dates[i]}`)
        .collection(`periods`)
        .valueChanges();
        this.periodDoc = this.afs.doc(`Fairs/${fair.fairName}/dates/${dates[i]}/periods/${periods[0]}`);
      this.periodDoc.delete();
      this.periodDoc = this.afs.doc(`Fairs/${fair.fairName}/dates/${dates[i]}/periods/${periods[1]}`);
      this.periodDoc.delete();
      this.periodDoc = this.afs.doc(`Fairs/${fair.fairName}/dates/${dates[i]}/periods/${periods[2]}`);
      this.periodDoc.delete();
      this.periodDoc = this.afs.doc(`Fairs/${fair.fairName}/dates/${dates[i]}/periods/${periods[3]}`);
      this.periodDoc.delete();
    }
  }
  updatefair(fair: Fair) {
    this.fairsColl = this.afs.collection('Fairs', ref =>
      ref.orderBy('fromDate', 'desc')
    );
    this.fairs = this.afs
      .collection('Fairs')
      .snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Fair;
          data.id = a.payload.doc.id;
          return data;
        });
      });

    this.fairDoc = this.afs.doc(`Fairs/${fair.id}`);
    this.fairDoc.update(fair);
  }
  updatefairdates(fair: Fair, dates) {

    this.datecoll = this.afs
    .collection(`Fairs`)
    .doc(`${fair.fairName}`)
    .collection(`dates`);
  this.datesobs = this.afs
    .collection(`Fairs`)
    .doc(`${fair.fairName}`)
    .collection(`dates`)
    .valueChanges();
  for (let i = 0; i < dates.length; i++) {
    this.dateDoc = this.afs.doc(`Fairs/${fair.fairName}/dates/${dates[i]}`);
    this.dateDoc.update(dates[i]);
  }
  }
}
