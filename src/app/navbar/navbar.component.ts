import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {

  private userSubscription  : Subscription;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !user? false : true;
      console.log(this.isAuthenticated);
      console.log(this.isAuthenticated+' ikinci router');
      
    })
// this.isAuthenticated=false;
    
  }
  // ngOnDestroy(): void {
  //   this.userSub.unsubscribe();
  // }
 
}
