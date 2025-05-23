import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private api_url = 'http://localhost:3000';
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api_url + '/reservations');
  }
  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.api_url + '/reservation/' + id);
  }
  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.api_url + '/reservation', reservation);
  }
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.api_url + '/reservation/' + id);
  }
  updateReservation(
    id: string,
    updatedReservation: Reservation
  ): Observable<void> {
    return this.http.put<void>(
      this.api_url + '/reservation/' + id,
      updatedReservation
    );
  }
}
