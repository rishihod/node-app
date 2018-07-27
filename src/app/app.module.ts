import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import * as $ from 'jquery';
//import{HttpClient} from '@angular/common/http';
import { AppComponent } from './app.component';
import { PromoComponent } from './promo/promo.component';
import { BookComponent } from './book/book.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from './/app-routing.module';
import { BookingComponent } from './booking/booking.component';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryService }  from './in-memory.service';

@NgModule({
  declarations: [
    AppComponent,
    PromoComponent,
    BookComponent,
    ReportViewerComponent,
    IndexComponent,
    BookingComponent,
    
   
    //HttpClient
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryService, { dataEncapsulation: false }
    // ),
    // HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA ]
})
export class AppModule { }
