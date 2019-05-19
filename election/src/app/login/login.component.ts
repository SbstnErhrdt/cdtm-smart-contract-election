import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  users = { user1: "password1" };

  username = "";
  password = "";

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("authenticated") === "true")
      this.router.navigate(["/user"]);
  }

  authenticate() {
    if (this.users[this.username] === this.password) {
      console.log("here");
      localStorage.setItem("authenticated", "true");
      this.router.navigate(["/user"]);
    } else alert("Good guess, but ... No!");
  }
}
