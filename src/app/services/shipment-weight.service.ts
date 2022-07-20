import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ShipmentWeight } from '../models/shipment-weight';

@Injectable({
  providedIn: 'root'
})
export class ShipmentWeightService {

  private BASEURL: string = "https://localhost:44372/api";

  constructor(private http: HttpClient) { }

  private token = localStorage.getItem("token");

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  private requestOptions = { headers: this.headers };

  getById(id: number) : Observable<ShipmentWeight> {
    return this.http.get<ShipmentWeight>(`${this.BASEURL}/ShipmentWeights/${id}`, this.requestOptions);
  }

  update(id: number, newValue: ShipmentWeight): void {
    this.http.put(`${this.BASEURL}/ShipmentWeights`, newValue, this.requestOptions)
  }
}
