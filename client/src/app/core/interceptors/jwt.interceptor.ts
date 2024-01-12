import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { UserModel } from '../models/job.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private service:AdminService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.service.currentUser$.pipe(take(1)).subscribe({
        next:(user:UserModel | null) => {
        if(user) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`
            }
          })
        }
      }
    })

    return next.handle(request);
  }
}
