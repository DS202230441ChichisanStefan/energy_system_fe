import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/getAllUsers');
  }

  getAllUserClient(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + '/getAllClients');
  }

  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/getUser/{id}`;
    return this.http.get<User>(url);
  }

  getUserByUsername(username: string): Observable<User> {
    let params = new HttpParams().set('username', username);
    return this.http.get<User>(this.apiUrl + '/getUserByUsername', {params: params});
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/addUser', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/updateUser', user);
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/deleteUser/${user.id}`;
    return this.http.delete<User>(url);
  }
}
