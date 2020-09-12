import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../classes/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://dummy.restapiexample.com/api/v1';

  public getEmployees(): Promise<Employee[]> {
    const url = `${this.apiUrl}/employees`;
    return this.http
      .get(url)
      .toPromise()
      .then( (answer: {response: string; data: Employee[]}) => answer.data as  Employee[])
      .catch(this.catchError);
  }

  public getEmployeeById(id: string): Promise<Employee> {
    const url = `${this.apiUrl}/employee/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then( (answer: {response: string; data: Employee}) => answer.data as  Employee)
      .catch(this.catchError);
  }

  public deleteEmployeeById(id: string): Promise<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http
      .delete(url)
      .toPromise()
      .then( answer => answer as any)
      .catch(this.catchError);
  }

  public updateEmployee(id, employee: Employee ): Promise<any> {
    const url = `${this.apiUrl}/update/${id}`;
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http
      .put(url,employee,{ headers: headers })
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.catchError);
  }

  private catchError(error: any): Promise<any> {
    console.error('Prišlo je do napake', error);
    return Promise.reject(error.message || error);
  }

}
