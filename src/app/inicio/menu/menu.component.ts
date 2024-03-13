import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [LoginService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  access_token: string | null = null;

  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(){
    this.getAccess_token();
  }

  getAccess_token(): void {
    this.access_token = localStorage.getItem('access_token');
  }

  logout() {
    this.authService.logout(localStorage.getItem('access_token')).subscribe(
      () => {
        window.location.reload();
        //this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error during logout:', error);
      }
    );
  }
}
