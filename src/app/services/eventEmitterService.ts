import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class EventEmitterService {

  public loginEvent = new EventEmitter();

  constructor() { }

public sendLoginEvent(data: boolean) {
    this.loginEvent.emit(data);
  }
}
