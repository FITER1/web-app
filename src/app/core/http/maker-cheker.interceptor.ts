import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class MakerChekerInterceptor implements HttpInterceptor {

  constructor(private router : Router, private route : ActivatedRoute) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.method === 'GET'){
      return next.handle(request);
    }
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          if(event.body && event.body.commandId){
            if (event.url.indexOf('makercheckers/') > 0) {
              //return response for maker checker actions(approve or delete)
              return event;
            } else {
              //redirect if maker checker is enabled
              this.router.navigate(['checker-inbox-and-tasks/viewMakerCheckerTask', event.body.commandId], {relativeTo: this.route})
              
            }
          }else{
             //when no maker checker enabled
            return event;
          }
      }
     // return event;
  }));
  }
}
