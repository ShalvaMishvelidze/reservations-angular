import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: new FormControl('', [Validators.required]),
      checkOutDate: new FormControl('', [Validators.required]),
      guestName: new FormControl('', [Validators.required]),
      guestEmail: new FormControl('', [Validators.required, Validators.email]),
      roomNumber: new FormControl('', [Validators.required]),
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationService.getReservation(id).subscribe((res) => {
        this.reservationForm.patchValue({
          ...res,
          checkInDate: res.checkInDate
            ? new Date(res.checkInDate).toISOString().substring(0, 10)
            : '',
          checkOutDate: res.checkOutDate
            ? new Date(res.checkOutDate).toISOString().substring(0, 10)
            : '',
        });
      });
    }
  }
  onSubmit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.reservationForm.valid) {
      if (id) {
        this.reservationService
          .updateReservation(id, this.reservationForm.value)
          .subscribe(() => {
            this.router.navigate(['/list']);
          });
        return;
      }
      this.reservationService
        .addReservation(this.reservationForm.value)
        .subscribe(() => {
          this.router.navigate(['/list']);
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
