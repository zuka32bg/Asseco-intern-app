import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PfmComponent } from './pfm/pfm.component';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PfmComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatBadgeModule,
    MatFormFieldModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
