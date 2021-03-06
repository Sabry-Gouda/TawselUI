import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from "../models/order";
import { Branches } from "../models/branches";
import { OrderData } from '../models/order-data';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = "https://localhost:44372/api"
  constructor(private http: HttpClient) { }

  getAll(): Observable<OrderData[]> {
    return this.http.get<OrderData[]>(`${this.baseUrl}/Orders`);
  }
  getAllDTo(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/OrderDetails`);
  }

  getById(id: number): Observable<OrderData> {
    return this.http.get<OrderData>(`${this.baseUrl}/Orders/${id}`);
  }

  getBySerialNumber(serialNumber: string): Observable<OrderData> {
    return this.http.get<OrderData>(`${this.baseUrl}/Orders/${serialNumber}`);
  }

  filterByStatus(statusId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/OrderDetails/ststus/${statusId}`);
  }


  insert(order: OrderData) {
    return this.http.post<OrderData>(`${this.baseUrl}/Orders`, order);
  }

  update(id: number, order: OrderData): void {
    this.http.put<Branches>(`${this.baseUrl}/orders/${id}`, order);
  }

  delete(id: number): void {
    this.http.delete<OrderData>(`${this.baseUrl}/orders/${id}`);
  }

  deleteBySerial(serial: string) {
    return this.http.delete(`${this.baseUrl}/Orders/serial/${serial}`);
  }

}
