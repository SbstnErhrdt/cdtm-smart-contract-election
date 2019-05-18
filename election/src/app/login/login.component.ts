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

  ngOnInit() {}

  authenticate() {
    if (this.users[this.username] === this.password)
      this.router.navigate(["/user"]);
    else alert("Good guess, but ... No!");
  }
}
