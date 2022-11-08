import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Measurement } from '../entity/measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private apiUrl = 'http://localhost:8080/measurement';

  constructor(private http: HttpClient) { }

  postMeasurement(measurement: Measurement): Observable<Measurement> {
    return this.http.post<Measurement>(`${this.apiUrl}/postMeasurement`, measurement);
  }

  listMeasurments(): Observable<Measurement[]> {
    const url = `${this.apiUrl}/getAllMeasurements`;
    return this.http.get<Measurement[]>(url);
  }
}
