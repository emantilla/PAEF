import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private URL_HOST = environment.urlBack + '/';

  constructor(private httpService: HttpService, private http: HttpClient) { }

  saveFormulario(data: any) {
    return this.httpService.postJSON('save-formulario', data).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }
  public getCiudades(): Observable<any> {
    return this.http.get('.../../../assets/json/divipola_Final.json');
  }
  public getDepartamentos(): Observable<any> {
    return this.http.get('../../../assets/json/divipola_depto.json');

  }
  public getCiuu(): Observable<any> {
    return this.http.get('.../../../assets/json/ciuu.json');

  }

}
