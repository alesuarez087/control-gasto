import { Precio } from '../models/Precio';
import { ConsultaProductoFecha, Producto } from './../models/Producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Respuesta } from '../models/Respuesta';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url : string = '/api/producto/';
  private urlPrecio : string = '/api/precio/';
  private rta : Respuesta ;
  private productos$ = new Subject<Producto[]>();
  private producto$ = new Subject<Producto>();
  private precio$ = new Subject<Precio[]>();

  constructor(private http : HttpClient){
    
  }

  getRespuesta() : Observable<Respuesta>{
    return this.http.get<Respuesta>(this.url).pipe(map(d => new Respuesta(d)));
  }

  public getProductos() : Observable<Producto[]> {
    var productos : Producto[] = [];
    this.http.get<Respuesta>(this.url).subscribe(data => {      
      var i : number;
      for (i = 0; i < data.data.length; i++) {
        var j = JSON.parse(JSON.stringify(data.data[i]));
        var m : Producto = new Producto(j);
        productos.push(m);
      }
      
      this.productos$.next(productos);
    },
    err => {
      console.log(err);
    })
    
    return this.productos$.asObservable();    
  }

  public getProductosFecha(con: ConsultaProductoFecha) : Observable<Producto[]> {
    var productos : Producto[] = [];
    this.productos$ = new Subject<Producto[]>();
    this.http.get<Respuesta>(this.url+con.fecha.toDateString()+"/"+con.idLocal).subscribe(data => {      
      var i : number;
      for (i = 0; i < data.data.length; i++) {
        var j = JSON.parse(JSON.stringify(data.data[i]));
        var m : Producto = new Producto(j);
        productos.push(m);
      }
      
      this.productos$.next(productos);
    },
    err => {
      console.log(err);
    })
    
    return this.productos$.asObservable();    
  }

  public getHistorialPrecios(id: number) : Observable<Precio[]> {
    var precios : Precio[] = [];
    this.http.get<Respuesta>(this.urlPrecio + id).subscribe(data => {      
      var i : number;
      for (i = 0; i < data.data.length; i++) {
        var j = JSON.parse(JSON.stringify(data.data[i]));
        var m : Precio = new Precio(j);
        precios.push(m);
      }
      
      this.precio$.next(precios);
    },
    err => {
      console.log(err);
    })
    
    return this.precio$.asObservable();    
  }


  edit(producto : Producto) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    const body = JSON.stringify(producto);
    return this.http.put(this.url, body, {headers: headers});
  }

  editPrice(precio : Precio) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    const body = JSON.stringify(precio);
    return this.http.post(this.urlPrecio, body, {headers: headers});
  }

  add(producto : Producto) {
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
      const body = JSON.stringify(producto, this.replacer);
      return this.http.post(this.url, body, {headers: headers})
          
    }
    catch (err){
      throw err;
    }
  }

  
  delete(tipo : Producto) {
    try{
      let headers = new HttpHeaders();  
      headers = headers.set('Content-type', 'application/json');
      return this.http.delete(this.url + tipo.id, {headers:headers});
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
