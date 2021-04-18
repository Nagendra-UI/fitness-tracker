import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { MaterialShareModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { HeaderComponent } from './navigation/header/header.component';
import { TrainingModule } from './training/training.module';
import { AuthGuard } from './auth/auth.guard';
import { appReducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SideNavComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialShareModule,
    FlexLayoutModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    TrainingModule,
    AuthModule,
    StoreModule.forRoot(appReducers)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
