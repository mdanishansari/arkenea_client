import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    url: string;

    constructor(
        private http: HttpClient
    ) {
        this.url = 'http://localhost:3000'
    }

    adduser(obj: any): Observable<any> {
        return this.http.post<any>
            (
                `${this.url}/user/add`,
                obj
            )
    }

    getAllUser(): Observable<any> {
        return this.http.get<any>
            (
                `${this.url}/user/list`
            )
    }

    getUserbyId(id: any): Observable<any> {
        return this.http.get<any>
            (
                `${this.url}/user/userinfo/${id}`
            )
    }

    deleteUser(id: any): Observable<any> {
        return this.http.delete<any>
            (
                `${this.url}/user/delete/${id}`
            )
    }

    updateUser(id: any, obj: any): Observable<any> {
        return this.http.put<any>
            (
                `${this.url}/user/update/${id}`,
                obj
            )
    }
}