import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'urejevalnik-zaposlenih';
  constructor(private employeeService: EmployeeService){}
  ngOnInit(){
    this.employeeService.getEmployees().then(employees => {
      console.log(employees);
    }, error => {
      console.log('Error:', error);
    });
  }
}
