import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private BASEURL: string = "https://localhost:44372/api";

  constructor(private http: HttpClient) { }

  private token = localStorage.getItem("token");

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  private requestOptions = { headers: this.headers };

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.BASEURL}/Roles`, this.requestOptions);
  }


}
