import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./admin/home/home.component";
import { StationsComponent } from "./admin/stations/stations.component";
import { StationComponent } from "./admin/station/station.component";
import { ResultsComponent } from "./admin/results/results.component";
import { UserComponent } from "./user/user.component";
import { VoteComponent } from "./user/vote/vote.component";
import { ConfirmComponent } from "./user/confirm/confirm.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    StationsComponent,
    StationComponent,
    ResultsComponent,
    UserComponent,
    VoteComponent,
    ConfirmComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
