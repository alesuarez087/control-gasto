import { Respuesta } from './../models/Respuesta';
import { Marca } from './../models/Marca';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private url : string = '/api/marca/';
  private rta : Respuesta ;
  private marcas$ = new Subject<Marca[]>();

  constructor(private http : HttpClient) { 

  }
  
  getRespuesta() : Observable<Respuesta>{
    return this.http.get<Respuesta>(this.url).pipe(map(d => new Respuesta(d)))
  } 

  public getMarcas() : Observable<Marca[]> {
    var marcas : Marca[] = [];
    this.http.get<Respuesta>(this.url).subscribe(data => {
      var i : number;
      for (i = 0; i < data.data.length; i++) {
        var j = JSON.parse(JSON.stringify(data.data[i]));
        var m : Marca = new Marca(j);
        marcas.push(m);
      }
      this.marcas$.next(marcas);
    },
    err => {
      console.log(err);
    })
    
    return this.marcas$.asObservable();    
  }
  
  add(marca: Marca){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
      const body = JSON.stringify(marca, this.replacer);
      return this.http.post(this.url, body, {headers: headers});
    }
    catch (err){
      throw err;
    }
  }

  edit(marca: Marca) {
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
      return this.http.put(this.url, marca, {headers: headers});
    } 
    catch (err){
      throw err;
    }
  }

  delete(marca : Marca) {
    try{
      let headers = new HttpHeaders();  
      headers = headers.set('Content-type', 'application/json');
      return this.http.delete(this.url + marca.id, {headers:headers});
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
