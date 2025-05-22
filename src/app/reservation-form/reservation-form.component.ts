import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: new FormControl('', [Validators.required]),
      checkOutDate: new FormControl('', [Validators.required]),
      guestName: new FormControl('', [Validators.required]),
      guestEmail: new FormControl('', [Validators.required, Validators.email]),
      roomNumber: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.reservationForm.valid) {
      this.reservationService.addReservation(this.reservationForm.value);
      this.router.navigate(['/list']);
    } else {
      console.error('Form is invalid');
    }
  }
}
