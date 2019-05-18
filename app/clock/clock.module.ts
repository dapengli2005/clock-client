import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { ClockInOutComponent } from './containers/clock-in-out/clock-in-out.component';
import { ClockEntryHistoryComponent } from './containers/clock-entry-history/clock-entry-history.component';
import { EditClockEntryComponent } from './containers/edit-clock-entry/edit-clock-entry.component';
import { NewClockEntryComponent } from './containers/new-clock-entry/new-clock-entry.component';

// components
import { ClockEntryFormComponent } from './components/clock-entry-form.component';

// service
import { ClockService } from './clock.service';

const routes: Routes = [
  {
    path: 'clock',
    children: [
     { path: '', component: ClockInOutComponent },
     { path: 'history', component: ClockEntryHistoryComponent },
     { path: 'new', component: NewClockEntryComponent },
     { path: 'edit/:id', component: EditClockEntryComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ClockInOutComponent,
    ClockEntryHistoryComponent,
    EditClockEntryComponent,
    NewClockEntryComponent,
    ClockEntryFormComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ClockService
  ]
})
export class ClockModule {}

