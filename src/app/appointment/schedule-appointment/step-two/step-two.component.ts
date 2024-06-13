import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomCalendarComponent } from '../../../common/custom-calendar/custom-calendar.component';
 
@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CustomCalendarComponent
  ],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent {

  selectedDate: Date | null = null;
  selectedTime: string = '';
  appointmentTimes: string[] = ['08:00AM', '08:30AM', '09:00AM', '09:30AM', '10:00AM', '10:30AM', '11:00AM', '11:30AM', '12:00PM', '12:30PM', '01:00PM', '01:30PM'];

  onSelectedDateChange(date: Date): void {
    this.selectedDate = date;
  }

  onTimeSelect(time: string) {
    this.selectedTime = time;
  }

}
