import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { Login } from '../../modelos/login.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [LoginService],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {


  loginForm=this.fb.group({
    email:'',
    password:''
  });

  access_token: string | null = null;

  constructor(private fb: FormBuilder, private loginService:LoginService, 
    private _router:Router){

    }

  ngOnInit(): void{
    this.access_token = localStorage.getItem('access_token');
    if (this.access_token) {
      this._router.navigate(['usuario/index']);
    }
  }


  login(){
    this.loginService.login(this.loginForm.get('email')?.value, 
      this.loginForm.get('password')?.value).subscribe( 
        data => {
          if (data!==null) {
            localStorage.setItem('access_token', data?.access_token);
            localStorage.setItem('user_id', data?.user_id);
            //this._router.navigate(['/usuario/index']);
            window.location.reload();
          }
        }, err => {
          console.log(err);
        })
  }
}
