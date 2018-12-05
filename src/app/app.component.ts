import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from './services/eventEmitterService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public loggedInUser = "";
  constructor(private _router: Router,
    private _eventEmitter: EventEmitterService){}

  public ngOnInit(): void {
    this._eventEmitter.loginEvent.subscribe(data => this.setInitData());
    this.setInitData();
  }

  public logout(){
    this.isLoggedIn = false;
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  private setInitData(){
    
    let token = localStorage.getItem("access_token");
    if(token){
      this.isLoggedIn = true;
      this.loggedInUser = localStorage.getItem("loggedUser");
    }
  }
  
}
