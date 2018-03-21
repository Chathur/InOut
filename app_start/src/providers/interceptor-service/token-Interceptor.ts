import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../auth-service/auth-service';

export abstract class ConfigurableHttpInterceptor implements HttpInterceptor {
  public pathMatch: RegExp;

  constructor(pathMatch: RegExp = null) {
    this.pathMatch = pathMatch;
  }

  private isPathMatching(path: string): boolean {
    return !this.pathMatch || this.pathMatch.test(path);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return (!this.isPathMatching(req.urlWithParams)) ? next.handle(req) :  this._intercept(req, next);
  }

  protected abstract _intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}

/*
  Generated class for the InterceptorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TokenInterceptor extends ConfigurableHttpInterceptor {
  constructor(public injector: Injector) {
    super(/^((?!token).)*$/i);
  }

  protected _intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.create((observer: any) => {
      setTimeout(() => {
        const authService = this.injector.get(AuthServiceProvider)
        observer.next(authService.getToken())
        observer.complete()
      })
    })
    .mergeMap((token: string) =>{
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` 
        }
      });
  
      return next.handle(request);
    })

  }

}
