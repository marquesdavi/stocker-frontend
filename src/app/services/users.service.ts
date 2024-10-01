import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { UpdateUserStatus } from "../enums/status.enum";

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
            status: UpdateUserStatus.ACTIVE
        };

        return this.http.post(`${environment.apiUrl}/user/`, body, { headers });
    }

    public updateUserStatus(userId: string, updatedClient: any, token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        
        return this.http.patch(`${environment.apiUrl}/user/${userId}`, updatedClient, { headers });
    }

    public updateUserImage(userId: string, file: File, token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        const formData = new FormData();
        formData.append('file', file);

        return this.http.patch(`${environment.apiUrl}/user/upload/${userId}`, formData, { headers });
    }

    public getCurrentUser(token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get(`${environment.apiUrl}/user/current`, { headers });
    }
}