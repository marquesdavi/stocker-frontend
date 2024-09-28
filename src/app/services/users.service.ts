import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    users: any;
    constructor(
        private http: HttpClient,
    ) { }

    public getUsers(token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get(`${environment.apiUrl}/user/`, { headers });
    }

    public createUser(newUser: any, token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const body = {
            name: newUser.name,
            email: newUser.email,
            cpf: newUser.cpf,
            password: newUser.password,
            status: true
        }
        return this.http.post(`${environment.apiUrl}/user/`, body, { headers });
    }

    public getCurrentUser(token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get(`${environment.apiUrl}/user/current`, { headers });
    }
}