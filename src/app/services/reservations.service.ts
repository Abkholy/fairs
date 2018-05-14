import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Reservation } from '../modules/Reservation';

@Injectable()
export class ReservationsService {

  reservcollection: AngularFirestoreCollection<Reservation> ;
  reservatios: Observable<Reservation[]>;
    reserveDoc: AngularFirestoreDocument<any>;
  constructor(public afs: AngularFirestore) {
    this.reservcollection = this.afs.collection('reservations' , ref => ref.orderBy('visitDate', 'desc'));
        this.reservatios = this.afs.collection('reservations').snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Reservation ;
    data.id = a.payload.doc.id;
    return data;
          });
        });
      }
      getReservation() {
        this.reservcollection = this.afs.collection('reservations' , ref => ref.orderBy('visitDate', 'desc'));
        this.reservatios = this.afs.collection('reservations').snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Reservation ;
    data.id = a.payload.doc.id;
    return data;
          });
        });
        return this.reservatios;
      }

      addReservation(reservation: Reservation) {
        this.reservcollection.add(reservation);
      }


      deleteReservation(reservation: Reservation) {
        this.reservcollection = this.afs.collection('reservations' , ref => ref.orderBy('visitDate', 'desc'));
        this.reservatios = this.afs.collection('reservations').snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Reservation ;
    data.id = a.payload.doc.id;
    return data;
          });
        });
        this.reserveDoc = this.afs.doc(`reservations/${reservation.id}`);
        this.reserveDoc.delete();
      }

      updateReservation(reservation: Reservation) {
        this.reserveDoc = this.afs.doc(`reservations/${reservation.id}`);
        this.reserveDoc.update(reservation);
      }

}
