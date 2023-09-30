import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable,catchError } from "rxjs";
import { User } from "../types/User";
import { selectIsAuth , selectUser } from "../store/selectors/user.selectors";
import { Injectable, Provider } from "@angular/core";
import { ErrActions } from "../store/actions/err.actions";
import { environment } from "src/environments/environment";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    user : User | {} = {} ;
    isAuth : boolean  = false;

    constructor(private store : Store<{user : User , err : string}>){
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.store.select(selectUser).subscribe(res =>  {
            this.user = res; 
        })  
        this.store.select(selectIsAuth).subscribe(res => {
            this.isAuth = res; 
        })
        let request = req; 
        if(this.isAuth && req.url.startsWith(environment.KEY_API)){
            this.store.dispatch(ErrActions.remove());
            const HcmToken = (this.user as User).HcmToken ;
            
            request = req.clone ({
              setHeaders: {
                HcmToken: HcmToken
            }
        })}
        
      return  next.handle(request).pipe(
        catchError((err) => {
            this.store.dispatch(ErrActions.add({ err : err.error.error})); 
            console.log(err);
          return [err];
        })
      )
    }
}

export const authInterseptorProvider:Provider = {
    provide : HTTP_INTERCEPTORS ,
    multi : true , 
    useClass : AuthInterceptor,
} 
