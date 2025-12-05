import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  userDate: any;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.userDate = this.getUserData();
  }

  getUserData() {
    return this._authService.getUserData()
  }
}
