import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  users = { 
    a1: true, 
    b2: true, 
    c3: true, 
  };

  security = "";

  currentStation = null;

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('station')) {
      this.currentStation = localStorage.getItem('station');
    } else {
      this.currentStation = 'Please select a station in the admin area';
    }
  }

  authenticate() {
    console.log("login")
    if (this.users[this.security]) {
      this.router.navigate(["/user"]);
    } else {
      alert("Good guess, but ... No!");
    }
  }
}
