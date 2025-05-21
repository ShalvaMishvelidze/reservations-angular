import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];
  getReservations(): Reservation[] {
    return this.reservations;
  }
  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }
  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }
  deleteReservation(id: string): void {
    const index = this.reservations.findIndex((res) => res.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }
  }
  updateReservation(updatedReservation: Reservation): void {
    const index = this.reservations.findIndex(
      (res) => res.id === updatedReservation.id
    );
    if (index !== -1) {
      this.reservations[index] = updatedReservation;
    }
  }
}
