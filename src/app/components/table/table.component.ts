import {Component, AfterViewInit, ViewChild} from '@angular/core';
import { Employee} from '../../classes/employee';
import {EmployeeService} from '../../services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit{

  displayedColumns: string[] = [ 'name', 'salary', 'age'];
  employees: Employee[];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private employeeService: EmployeeService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.employeeService.getEmployees().then(employees => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource<Employee>(employees);
      this.dataSource.paginator = this.paginator;

    }, error => {
      console.log('Error:', error);
    });

  }
}
