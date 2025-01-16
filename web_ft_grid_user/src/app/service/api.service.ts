import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrlUsr = 'http://apiuser.test/api/v1/users';
  private apiUrlCar = 'http://apiuser.test/api/v1/cargos';
  private apiUrlDep = 'http://apiuser.test/api/v1/departamentos';
  constructor(private http: HttpClient) { }

  public getDataUsers(queryParams: string = ''): Observable<any> {
  const url = queryParams ? `${this.apiUrlUsr}?${queryParams}` : this.apiUrlUsr;
  console.log(url);
  return this.http.get<any>(url);
}

  public getDataCargos(): Observable<any> {
    return this.http.get<any>(this.apiUrlCar);
  }

  public getDataDepartamentos(): Observable<any> {
    return this.http.get<any>(this.apiUrlDep);
  }
  public createUsers(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrlUsr, data);
  }
  public updateUsers(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrlUsr + '/' + data.idUser, data);
  }

  public deleteUsers(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrlUsr + '/' + id);
  }
}
