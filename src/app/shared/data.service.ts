import { Injectable } from '@angular/core';
import { Update } from '../model/update';
import {AngularFirestore} from "@angular/fire/compat/firestore"

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs:AngularFirestore) { }


  // create update
  createUpdate(update:Update) {
    console.log(update)
    update.id = this.afs.createId()
    return this.afs.collection('/Updates').add(update)
  }

  //  get all updates

  getAllUpdates() {
    return this.afs.collection('/Updates').snapshotChanges();
  }

  // delete update

  deleteUpdate(update: Update) {
    return this.afs.doc('/Updates/'+update.id).delete()
  }
  // change update
  
  changeUpdate(update: Update) {
    this.deleteUpdate(update);
    this.createUpdate(update)
  }


}
