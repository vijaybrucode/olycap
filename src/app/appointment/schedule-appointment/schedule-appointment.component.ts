import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepFiveComponent } from './step-five/step-five.component';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,

  ],
  templateUrl: './schedule-appointment.component.html',
  styleUrl: './schedule-appointment.component.scss'
})
export class ScheduleAppointmentComponent {
  constructor(private _formBuilder: FormBuilder) {}
  
   
  displayTimer: any;
  currentStep: number = 1;

  ngOnInit():void  {
    this.timer(10);
  }

  timer(minute:number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.displayTimer = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log("finished");
        clearInterval(timer);
      }
    }, 1000);
  }

  isActive(step: number): boolean {
    return this.currentStep === step;
  }

  isCompleted(step: number): boolean {
    if (step === 5) {
      return this.currentStep >= step;
    }
    return this.currentStep > step;
  }

  isLineActive(step: number): boolean {
    return this.currentStep > step;
  }

  nextStep():void {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  previousStep():void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getStepHeader(): string {
    switch (this.currentStep) {
      case 1:
        return 'Location Selection';
      case 2:
        return 'Date & Time of Appointment';
      case 3:
        return 'Personal Information';
      case 4:
        return 'Appointment Verification';
      case 5:
        return 'Confirmation';
      default:
        return 'Schedule An Appointment';
    }
  }
}
