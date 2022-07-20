import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductData } from '../models/product-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASEURL: string = "https://localhost:44372/api"
  constructor(private http:HttpClient) { }

  private token = localStorage.getItem("token");

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  private requestOptions = { headers: this.headers };

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASEURL}/products`,this.requestOptions);
  }

  getById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.BASEURL}/products/${id}`,this.requestOptions);
  }

  insert(product:Product){

  return  this.http.post<Product>(`${this.BASEURL}/products`,product,this.requestOptions);
  }

  update(id:number,product:Product) {
    return this.http.put<Product>(`${this.BASEURL}/products/${id}`,product,this.requestOptions);
  }

  delete(id:number){
    return this.http.delete<Product>(`${this.BASEURL}/products/${id}`,this.requestOptions);
  }
}
