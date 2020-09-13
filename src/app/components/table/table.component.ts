import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import { Employee} from '../../classes/employee';
import {EmployeeService} from '../../services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = [ 'name', 'salary', 'age'];
  employees: Employee[];
  dataSource = new MatTableDataSource<Employee>();
  employeesLoaded = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }

  openDialog(employee: Employee) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      employee: employee,
      action: 'edit'
    };
    dialogConfig.minWidth='350px';
    dialogConfig.minHeight='370px';

    const dialogRef = this.dialog.open(EditDialogComponent , dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if (data.action === 'update') {
        for (let i = 0;  i < this.employees.length; i++) {
          if(this.employees[i].id == data.employee.id) {
            this.employees[i] = data.employee;
            break;
          }
        }
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.dataSource.paginator = this.paginator;

      }
    });
  }
  openAlert(employee: Employee) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      employee: employee,
      action: 'delete'
    };
    dialogConfig.minWidth='300px';
    dialogConfig.minHeight='160px';

    const dialogRef = this.dialog.open(EditDialogComponent , dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if (data.action === 'deleted') {
        let emp   = new Array<Employee>(this.employees.length-1);
        let j = 0;
        for (let i = 0;  i < this.employees.length; i++) {
          if(this.employees[i].id === data.employee.id) {
            continue;
          }
         emp[j] = this.employees[i];
         j++;
        }
        this.employees = emp;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.dataSource.paginator = this.paginator;
      }
    });

  }

  openNewEmployeeWindow() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action: 'create',
      employee: {
        id: '',
        employee_name: '',
        employee_age: '',
        employee_salary: '',
        employee_image: ''
      }
    };
    dialogConfig.minWidth='350px';
    dialogConfig.minHeight='370px';
    const dialogRef = this.dialog.open(EditDialogComponent , dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if (data.action === 'added') {
        this.employees[this.employees.length] = data.employee;
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.dataSource.paginator = this.paginator;
      }
    });

  }
  ngOnInit(){
    this.employeeService.getEmployees().then(employees => {
      this.employeesLoaded = true;
      this.employees = employees;
      this.dataSource.data = this.employees;

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 5);

    }, error => {
      console.log('Error:', error);
    });
  }
  ngAfterViewInit() {}
}
