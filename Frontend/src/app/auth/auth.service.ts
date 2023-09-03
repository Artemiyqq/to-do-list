import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { NewUserDto } from "../models/new-user-dto.model";
import { LoginDto } from "../models/login-dto.model";
import { Observable }  from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiBaseurl = '';

    constructor(private http: HttpClient) {}

    checkEmailExists(email: string)
    {
        const queryParams = `?email=${email}`
        return this.http.get<boolean>(`${this.apiBaseurl}/api/users/check-email${queryParams}`)
    }

    postUser(newUserDto: NewUserDto)
    {
        return this.http.post(`${this.apiBaseurl}/api/users`, newUserDto);
    }

    tryToLogin(loginDto: LoginDto): Observable<any>
    {
        return this.http.post(`${this.apiBaseurl}/api/users/try-to-login`, loginDto);
    }
}
