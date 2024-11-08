import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesModule } from './pages/pages.module';

import { AppRoutingModule } from './app-routing.module';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';

@NgModule({
    declarations: [AppComponent, NotPageFoundComponent],
    imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule],
    providers: [
    provideCharts(withDefaultRegisterables())
  ],
    bootstrap: [AppComponent],
})
export class AppModule {}
