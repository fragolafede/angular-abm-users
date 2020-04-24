import { Component, OnInit } from '@angular/core';
import { UserService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: Object;
  showForm: boolean = false;
  formAction: string = "";
  uId = "";

  constructor(public dataService: UserService) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe(data => {
        this.users = data
        //console.log(this.users);
      }
    );
  }

  getUsers = () =>
  this.dataService
    .getUsers()
    .subscribe(res => (this.users = res));

  addNewUser () {
    //Mostrar formulario de usuario - función agregar
    this.formAction = "A";
    this.showForm = true;
  }

  submitForm() {
    //---PENDING--- Agregar acá las validaciones al form

    if (this.formAction == "A") {
      if (this.dataService.addUser(this.dataService.form.value)) {
        //Si salió bien
        this.cancelForm();
      } else {
        //Si hubo error. Se podría subscribir al err de la función.
      };
    } else {
      if (this.dataService.editUser(this.dataService.form.value, this.uId)) {
        //Si salió bien
        this.cancelForm();
      } else {
        //Si hubo error. Se podría subscribir al err de la función.
      };
    }
  }

  cancelForm() {
    this.resetForm();
    this.formAction = "";
    this.uId = "";
    this.showForm = false;
  }

  resetForm() {
    this.dataService.form.reset();
  }

  displayUser(_user){
    //console.log("Clickeaste en mostrar a " + _user.payload.doc.data().first_name);
  }

  editUser(_user) {
    console.log();
    //Mostrar formulario de usuario - función editar
    this.formAction = "E";
    this.uId = _user.payload.doc.id;
    this.dataService.form.setValue(_user.payload.doc.data());
    this.showForm = true;
    console.log("Clickeaste en editar a " + _user.payload.doc.data().first_name);
  }

  deleteUser(_user) {
    if (confirm("¿Borrar usuario " + _user.payload.doc.data().first_name + " " + _user.payload.doc.data().last_name + "?")){
      if (this.dataService.deleteUser(_user)) {
        return true;
      }
    }
  }

  refreshUsers() {
    this.getUsers ();
  }

  onUserClick(_user) {
    /**
     *     
    if (confirm("¿Agregar usuario " + _user.payload.doc.data().first_name + " " + _user.payload.doc.data().last_name + "?")){
      this.dataService.addUser(_user);
    }
     */
    console.log("Clickeaste en " + _user.payload.doc.data().first_name);
  }

}
