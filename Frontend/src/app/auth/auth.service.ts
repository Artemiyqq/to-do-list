import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { NewUserDto } from "../models/new-user-dto.model";

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
}
