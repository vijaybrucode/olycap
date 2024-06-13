import { Routes } from '@angular/router';
import { ScheduleAppointmentComponent } from './appointment/schedule-appointment/schedule-appointment.component';
import { LandingComponent } from './landing/landing.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'landing', component: LandingComponent },
    { path: 'schedule-appointment', component: ScheduleAppointmentComponent },
    // {path: '**', component: NotfoundPage}

];

