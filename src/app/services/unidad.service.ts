import { Unidad } from './../models/Unidad';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';
import { Respuesta } from '../models/Respuesta';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private url : string = '/api/unidad/';
  private rta : Respuesta ;
  private unidad$ = new Subject<Unidad[]>();
  constructor(private http : HttpClient) { 

  }

  getRespuesta() : Observable<Respuesta>{
    return this.http.get<Respuesta>(this.url).pipe(map(d => new Respuesta(d)));
  }

  public getUnidades() : Observable<Unidad[]> {
    var unidades : Unidad[] = [];
    this.http.get<Respuesta>(this.url).subscribe(data => {
      var i : number;
      for (i = 0; i < data.data.length; i++) {
        var j = JSON.parse(JSON.stringify(data.data[i]));
        var m : Unidad = new Unidad(j);
        unidades.push(m);
      }
      this.unidad$.next(unidades);
    },
    err => {
      console.log(err);
    })
    
    return this.unidad$.asObservable();    
  }
  
  add(unidad : Unidad){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
      const body = JSON.stringify(unidad, this.replacer);
      return this.http.post(this.url, body, {headers: headers});
    }
    catch (err){
      throw err;
    }
  }

  edit(unidad : Unidad) {
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
      return this.http.put(this.url, unidad, {headers: headers});
    } 
    catch (err){
      throw err;
    }
  }

  delete(unidad : Unidad) {
    try{
      let headers = new HttpHeaders();  
      headers = headers.set('Content-type', 'application/json');
      return this.http.delete(this.url + unidad.id, {headers:headers});
    }
    catch (err){
      throw err;
    }
  }

  replacer(key, value) {
    // Filtrando propiedades 
    if (value === "") {
      return undefined;
    }
    return value;
  }


}
