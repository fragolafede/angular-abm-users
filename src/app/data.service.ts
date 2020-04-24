import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient, private firestore: AngularFirestore) { }

  form = new FormGroup({        
    id: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''), 
    avatar: new FormControl('')
  })

  addUser(_user) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore.collection("users").add(_user)
            .then(res => {
              //Success
              console.log("Se generó el usuario " + _user.first_name + " " + _user.last_name + " correctamente.");
              this.form.reset;
              // ---PENDING--- Ver handle de error
            }, err => reject(err));
    });
  }

  editUser(_user, uId) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore.collection("users").doc(uId).set(_user)
          .then(res => {
            //Success
            console.log("Se editó el usuario " + _user.first_name + " " + _user.last_name + " correctamente.");
            this.form.reset;
            // ---PENDING--- Ver handle de error
          }, err => reject(err));
    });
  }

  deleteUser(_user) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore.collection("users").doc(_user.payload.doc.id).delete()
          .then(res => {
            //Success
            console.log("Se borró el usuario " + _user.payload.doc.data().first_name + " " + _user.payload.doc.data().last_name + " correctamente.");
            // ---PENDING--- Ver handle de error
          }, err => reject(err));
    });  
  }

  getUsers() {
    //return this.http.get('https://reqres.in/api/users');
    return this.firestore.collection("users").snapshotChanges();  
  }
}
