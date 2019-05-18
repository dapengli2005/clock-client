import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClockModule } from './clock/clock.module';

import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';

import { AppComponent } from './app.component';

import { UserService } from './user.service';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ClockModule
  ],
  providers:[
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

