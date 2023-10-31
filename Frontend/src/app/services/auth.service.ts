import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { NewUserDto } from "../models/new-user-dto.model";
import { LoginDto } from "../models/login-dto.model";
import { Observable }  from 'rxjs';
import { Router } from "@angular/router";
import { ConfigService } from "./config.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private configService: ConfigService, private http: HttpClient, private router: Router) {}

    checkEmailExists(email: string)
    {
        const queryParams = `?email=${email}`
        return this.http.get<boolean>(`${this.configService.getApiBaseUrl()}/api/users/check-email${queryParams}`)
    }

    postUser(newUserDto: NewUserDto)
    {
        return this.http.post(`${this.configService.getApiBaseUrl()}/api/users`, newUserDto);
    }

    tryToLogin(loginDto: LoginDto): Observable<any>
    {
        return this.http.post(`${this.configService.getApiBaseUrl()}/api/users/try-to-login`, loginDto);
    }

    loginSuccess() {
        this.router.navigate(['/dashboard']);
    }
}
