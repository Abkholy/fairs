

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Settings } from '../modules/settings';


@Injectable()
export class SettingsService {
settingsColl: AngularFirestoreCollection<any>;
settingsObs: Observable<any>;
settingsDoc: AngularFirestoreDocument<any>;

settings: Settings = {
  isRegisterOpen: true,
  canAddFair: false,
};

constructor() {
  if (localStorage.getItem('settings') != null) {
    this.settings = JSON.parse(localStorage.getItem('settings'));
  }
}

getSettings() {
  return this.settings;
}


changeSettings(settings: Settings) {
   localStorage.setItem('settings', JSON.stringify(settings));
}



}
