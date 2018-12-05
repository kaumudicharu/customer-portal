import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import { CustomerComponent } from './customers/customers.component';
import { EventEmitterService } from './services/eventEmitterService';
import { AuthGuardService } from './services/authGuardservice';
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomerComponent, canActivate: [AuthGuardService]  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes)
  ],
  providers: [EventEmitterService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
