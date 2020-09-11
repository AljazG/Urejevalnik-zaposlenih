import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  /*public updateEmployee(id, employee: Employee ): Promise<any> {
    const url = `${this.apiUrl}/akcije/${idAkcije}/programi/${idPrograma}`;
    console.log(url);
    return this.http
      .put(url, program)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }*/

  private catchError(error: any): Promise<any> {
    console.error('Prišlo je do napake', error);
    return Promise.reject(error.message || error);
  }

}
