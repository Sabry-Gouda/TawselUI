import { Page } from './../models/page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private BASEURL: string = "https://localhost:44372/api";

  constructor(private http: HttpClient) { }

  private token = localStorage.getItem("token");

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  private requestOptions = { headers: this.headers };

  getAll(): Observable<Page[]> {
    return this.http.get<Page[]>(`${this.BASEURL}/Pages`, this.requestOptions);
  }
}
