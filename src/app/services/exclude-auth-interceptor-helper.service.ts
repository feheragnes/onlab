import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExcludeAuthInterceptorHelper {
    static excludeAuthInterceptor = false;
}
