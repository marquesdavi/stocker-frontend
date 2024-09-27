import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    users:any;
    headers = { 'AccessToken': 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzdG9ja2VyLWF1dGgiLCJzdWIiOiJjNzMwNzk5ZS1lNTY0LTQzNTktYTBmMy1hYWU3NzBmOTMzMjQiLCJleHAiOjE3Mjc0NjQzNDksImlhdCI6MTcyNzQ2MDc0OSwic2NvcGUiOiJVU0VSIiwicm9sZXMiOlsiVVNFUiJdfQ.gkEF-qZqfiob0YLi3vIBBDB0cIj3J1pixgExMFUWDDvtuzNvzLazvQb0lPsilrsB4uA4mWNA8PFe13s7l4xgqxAvbBbF1UnW9GkU263gR1ISu_W25Nv7-Qf46WP-nswq3IPwjBq1Oq5Z0oaJsmD-XGTib73rejDLRxynS3gGieyUpt5qyBkTMzofMfExhqZKUHgeikxEXjEAk0kw-yS2qp52MzY6__nOqVeUg-f4nymgH587_1-z29aZ1ERj86P6S9zuIEsBoHIskSXs9CqEy50_mH17MSIIIcSpm31I7urE1u660nmnRAhdNVkTBVhwBf4YHPC0XzZ6QErcIJ9NJQ'}
    constructor(
        private http: HttpClient
    ) {}

    public getUsers(): Observable<any> {
        return this.http.get('http://localhost:8080/user/', { headers: this.headers });
    }

    public createUser(newUser: any): Observable<any> {
        const body = {
            name: newUser.name,
            email: newUser.email,
            cpf: newUser.cpf,
            password: newUser.password,
            status: true
        }
        return this.http.post('http://localhost:8080/user/', body, { headers: this.headers });
    }
}