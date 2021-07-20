import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { mergeMap, switchMap, share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Iv2Service {
  summary : Observable<any>;
  image   : Observable<any>;
  

  constructor(private http : HttpClient) { 
    this.summary = interval(1000).pipe(mergeMap(()=>this.http.get('/tray-cam/info/summary.json')), share());
  }
  
  getSummary() : Observable<any> { 
    return this.summary;
  }
  getImage():Observable<any>{
    //console.log('image requested');
    return this.summary.pipe(switchMap(x=>this.http.get(`/tray-cam/liveimage.jpg?uniq_no_hi=${x.UniqNoHi}&uniq_no_low=${x.UniqNoLow}&op=${Date.now()}`, {responseType: 'blob'})),
      mergeMap(x=>this.convertImage(x)));
  }

  private convertImage(image : Blob) : Observable<any>{
    return new Observable((observer)=>{
      let reader : FileReader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend=()=>{
        //console.log('converted');
        observer.next(reader.result);
      }
    });
  }
}
