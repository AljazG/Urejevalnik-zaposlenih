import {AfterViewInit, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SnackbarComponent} from '../snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EmployeeService} from '../../services/employee.service';
import {MatTableDataSource} from '@angular/material/table';
import {Employee} from '../../classes/employee';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements AfterViewInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               public snackBar: MatSnackBar,
               private employeeService: EmployeeService ) { }

  message = '';
  name = (this.data.employee.employee_name).split(' ')[0];
  surname = (this.data.employee.employee_name).split(' ')[1];
  age = this.data.employee.employee_age;
  salary = this.data.employee.employee_salary;

  urediUporabnika() {
    this.employeeService.updateEmployee(this.data.employee.id, {
      id: this.data.employee.id,
      employee_age: this.age,
      employee_name: this.name + ' ' + this.surname,
      employee_salary: this.salary,
      profile_image: ''
    }).then(response => {
        this.message = 'Zaposleni uspešno posodobljen!';
        this.openSnackBar(this.message);
      },
      error => {
        this.message = 'Prišlo je do napake pri posodabljanju :(';
        this.openSnackBar(this.message);
      });
  }

  izbrisiUporabnika() {
    this.employeeService.deleteEmployeeById(this.data.employee.id).then(response => {
        this.message = 'Zaposleni uspešno izbrisan!';
        this.openSnackBar(this.message);
      },
      error => {
        this.message = 'Prišlo je do napake pri brisanju uporabnika';
        this.openSnackBar(this.message);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 10000
    });
  }

  ngAfterViewInit() {}

}
