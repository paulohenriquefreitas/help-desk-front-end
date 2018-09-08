import { CurrentUser } from './../../../model/current.user.model';
import { UserService } from './../../../services/user.service';
import { SharedService } from './../../../services/shared.service';
import { User } from './../../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user = new User('','','','');
  shared : SharedService;
  message: string;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }
  
  login() {
    this.message = '';
    this.userService.loging(this.user).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token;
      this.shared.user = userAuthentication.user;
      this.shared.user.profile = this.shared.user.profile.substring(5);
      this.shared.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err => {
      this.shared.token = null;
      this.shared.user = null;
      this.message = "Erro";
      this.shared.showTemplate.emit(false);
      
    });
  }

  cancelLogin(){
    this.message = '';
    this.user = new User('','','','');
    window.location.href = '/login';
    window.location.reload();
  }
}
