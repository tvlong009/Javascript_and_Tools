import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/map'
import {Observable} from "rxjs"

@Injectable()
export class GreetingService {
  constructor(private http: Http) {
  }

  getMessage(lang?: string): Observable<Greeting> {

    return Observable.from([{message: 'Hello', lang: 'en'}])
  }

  private handleError(error: any) {
    let message = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error'

    return Observable.throw(message)
  }
}
