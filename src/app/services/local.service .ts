import { Respuesta } from './../models/Respuesta';
import { Local } from './../models/Local';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private url : string = '/api/local/';
  private rta : Respuesta ;
  private local$ = new Subject<Local[]>();

  constructor(private http : HttpClient) { 

  }
  
  getRespuesta() : Observable<Respuesta>{
    return this.http.get<Respuesta>(this.url).pipe(map(d => new Respuesta(d)))
  } 

  public getLocales() : Observable<Local[]> {
    var marcas : Local[] = [];
    this.http.get<Respuesta>(this.url).subscribe(data => {
      var i : number;
      for (i = 0; i < data.data.length; i++) {
        var j = JSON.parse(JSON.stringify(data.data[i]));
        var m : Local = new Local(j);
        marcas.push(m);
      }
      this.local$.next(marcas);
    },
    err => {
      console.log(err);
    })
    
    return this.local$.asObservable();    
  }

  replacer(key, value) {
    // Filtrando propiedades 
    if (value === "") {
      return undefined;
    }
    return value;
  }

}
