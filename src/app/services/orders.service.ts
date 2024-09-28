import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  
  constructor(
    private http: HttpClient,
  ) {}

  public getOrders(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    return this.http.get<any[]>(`${environment.apiUrl}/movements/`, { headers });
  }

  public createOrder(order: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    return this.http.post<any>(`${environment.apiUrl}/movements/`, order, { headers });
  }
}
