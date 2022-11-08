import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../entity/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = 'http://localhost:8080/devices';

  constructor(private http: HttpClient) {}

  getAllDevices(): Observable<Device[]> {
    const url = `${this.apiUrl}/getAllDevices`;
    return this.http.get<Device[]>(url);
  }

  getAllDevicesById(id: number): Observable<Device[]> {
    const url = `${this.apiUrl}/getDevicesById/${id}`;
    return this.http.get<Device[]>(url);
  }

  getDevice(id: number): Observable<Device> {
    const url = `${this.apiUrl}/getDevice/${id}`;
    return this.http.get<Device>(url);
  }

  addDevice(device: Device, id: number): Observable<Device> {
    return this.http.post<Device>(`${this.apiUrl}/addDevice/${id}`, device);
  }

  updateDevice(device: Device, id: number): Observable<Device> {
    const url = `${this.apiUrl}/updateDevice/${id}`;
    return this.http.post<Device>(url, device);
  }

  deleteDevice(id: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/deleteDevice/${id}/${userId}`;
    return this.http.delete(url);
  }
}
