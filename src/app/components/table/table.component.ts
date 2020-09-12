import {Component, AfterViewInit, ViewChild} from '@angular/core';
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
export class TableComponent implements AfterViewInit{

  displayedColumns: string[] = [ 'name', 'salary', 'age'];
  employees: Employee[];
  dataSource = new MatTableDataSource<Employee>([]);
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

    this.dialog.open(EditDialogComponent , dialogConfig);
  }

  openAlert(employee: Employee) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      employee: employee,
      action: 'delete'
    };
    dialogConfig.minWidth='350px';
    dialogConfig.minHeight='100px';

    this.dialog.open(EditDialogComponent , dialogConfig);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.employeeService.getEmployees().then(employees => {
      this.employeesLoaded= true;
      setTimeout(()=> {
        this.employees = employees;
        this.dataSource = new MatTableDataSource<Employee>(employees);
        this.dataSource.paginator = this.paginator;
      }, 10);

    }, error => {
      console.log('Error:', error);
    });

  }
}
