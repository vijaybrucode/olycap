import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-calendar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './custom-calendar.component.html',
  styleUrl: './custom-calendar.component.scss'
})
export class CustomCalendarComponent implements OnInit {
  
  @Output() selectedDateChange = new EventEmitter<Date>();

  currentMonth: number;
  currentYear: number;
  days: number[];
  today: Date;
  selectedDate!: Date | null;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor() {
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.days = [];
    this.selectedDate = this.today;
    setTimeout(() => {
      this.selectedDateChange.emit(this.today);
    }, 500);
  } 

  ngOnInit(): void {
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  renderCalendar(month: number, year: number): void {
    this.days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const offset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < offset; i++) {
      this.days.push(0); // 0 represents an empty cell
    }

    for (let day = 1; day <= daysInMonth; day++) {
      this.days.push(day);
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.renderCalendar(this.currentMonth, this.currentYear);
  }

  isToday(day: number): boolean {
    return day === this.today.getDate() &&
           this.currentMonth === this.today.getMonth() &&
           this.currentYear === this.today.getFullYear();
  }

  isPastDate(day: number): boolean {
    const date = new Date(this.currentYear, this.currentMonth, day);
    return date <= this.today;
  }

  isWeekend(day: number): boolean {
    const date = new Date(this.currentYear, this.currentMonth, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Sunday, 6 = Saturday
  }

  isSelected(day: number): boolean {
    if (!this.selectedDate) {
      return false;
    }
    return this.selectedDate &&
           day === this.selectedDate.getDate() &&
           this.currentMonth === this.selectedDate.getMonth() &&
           this.currentYear === this.selectedDate.getFullYear();
  }

  selectDate(day: number): void {
    if (day > 0 && !this.isPastDate(day) && !this.isWeekend(day) || this.isToday(day)) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      this.selectedDateChange.emit(this.selectedDate);

    }
  }
}
