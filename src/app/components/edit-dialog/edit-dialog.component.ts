import {AfterViewInit, Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackbarComponent} from '../snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EmployeeService} from '../../services/employee.service';
import {MatTableDataSource} from '@angular/material/table';
import {Employee} from '../../classes/employee';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar/snack-bar-config';



@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements AfterViewInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               public snackBar: MatSnackBar,
               private employeeService: EmployeeService,
               public dialogRef: MatDialogRef<EditDialogComponent>
               ) { }

  message = '';
  name = (this.data.employee.employee_name).split(' ')[0];
  surname = (this.data.employee.employee_name).split(' ')[1];
  age = this.data.employee.employee_age;
  salary = this.data.employee.employee_salary;
  spinner = false;


  urediZaposlenega() {

    const employee = {
      id: this.data.employee.id,
      employee_age: this.age,
      employee_name: this.name + ' ' + this.surname,
      employee_salary: this.salary,
      profile_image: ''
    };
    this.spinner = true;
    this.employeeService.updateEmployee(this.data.employee.id, employee ).then(response => {
        this.spinner= false;
        this.message = 'Zaposleni uspešno posodobljen!';
        this.openSnackBar(this.message);
        this.dialogRef.close({action:'update', employee});
      },
      error => {
        this.spinner= false;
        this.message = 'Prišlo je do napake pri posodabljanju :(';
        this.openSnackBar(this.message);
        this.dialogRef.close({event:'closed'});
      });
  }

  dodajZaposlenega() {
    if (this.name === '' || this.surname === '' || this.age === '' || this.salary === '') {
      this.message = 'Izpolnite vsa polja!';
      this.openSnackBar(this.message);
      return;
    }
    this.spinner = true;
    this.employeeService.createEmployee( {
      id: this.data.employee.id,
      employee_age: this.age,
      employee_name: this.name + ' ' + this.surname,
      employee_salary: this.salary,
      profile_image: ''
    }).then(response => {
        this.spinner= false;
        this.message = 'Zaposleni uspešno dodan!';
        this.openSnackBar(this.message);
        this.dialogRef.close({
            action:'added',
            employee: {
              id: this.data.employee.id,
              employee_age: this.age,
              employee_name: this.name + ' ' + this.surname,
              employee_salary: this.salary,
              profile_image: ''
            }
        });
      },
      error => {
        this.spinner= false;
        this.message = 'Prišlo je do napake pri dodajanju zaposlenega :(';
        this.openSnackBar(this.message);
        this.dialogRef.close({action:'closed'});
      });
  }

  izbrisiUporabnika() {
    this.spinner = true;
    this.employeeService.deleteEmployeeById(this.data.employee.id).then(response => {
        this.spinner = false;
        this.message = 'Zaposleni uspešno izbrisan!';
        this.openSnackBar(this.message);
        this.dialogRef.close({action:'deleted', employee: { id: this.data.employee.id}});
      },
      error => {
        this.spinner = false;
        this.message = 'Prišlo je do napake pri brisanju uporabnika';
        this.openSnackBar(this.message);
        this.dialogRef.close({action:'closed'});
      });
  }

  openSnackBar(message: string) {


    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  ngAfterViewInit() {}

}
