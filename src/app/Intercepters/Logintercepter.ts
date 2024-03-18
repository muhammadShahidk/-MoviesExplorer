import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { inject } from "@angular/core";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  
    req = req.clone({
     
    });

  console.count("Auth Interceptor");
  console.log(req.method);
  console.log(req.url);
  
    return next(req);
  }