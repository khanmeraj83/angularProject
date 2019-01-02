import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ProfileComponent } from './profile/profile.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/user.reducer';
import { authReducer } from './reducers/auth.reducer';
//import { reducers } from '../app/store';
import { ReadComponent } from './read/read.component';
import { CreateComponent } from './create/create.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { UserEffects } from './effects/user.effects';
import { AuthEffects } from './effects/auth.effects';
import { ServiceWorkerModule } from '@angular/service-worker';

export const effects = [UserEffects, AuthEffects]
//export const reducers = []

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    ReadComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: reducer,
      auth: authReducer
    }),
    EffectsModule.forRoot(effects),
    //StoreModule.forFeature('products', reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
        // whitelistedDomains: ['example.com'],
        // blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
