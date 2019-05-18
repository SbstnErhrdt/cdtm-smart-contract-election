import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./admin/home/home.component";
import { StationsComponent } from "./admin/stations/stations.component";
import { StationComponent } from "./admin/station/station.component";
import { VoteComponent } from "./user/vote/vote.component";
import { ConfirmComponent } from "./user/confirm/confirm.component";
import { LoginComponent } from "./login/login.component";
import { ResultsComponent } from "./admin/results/results.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "results", component: ResultsComponent },
      { path: "stations", component: StationsComponent },
      { path: "stations/:id", component: StationComponent },
    ],
  },
  {
    path: "user",
    component: UserComponent,
    children: [
      { path: "", component: VoteComponent },
      { path: "confirm/:uuid", component: ConfirmComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
