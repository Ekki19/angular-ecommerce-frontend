import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { Observable } from 'rxjs';
import { LoginResponse } from '../common/login-response';
import { LoginRequest } from '../common/login-request';


const API_URL = "http://localhost:8080/api/auth/login"


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(request: LoginRequest):Observable<LoginResponse> {
    console.log('REQUEST LOGIN: ' + JSON.stringify(request));
    return this.http.post<LoginResponse>(API_URL, request);
  }
}
