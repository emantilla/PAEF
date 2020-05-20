import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  // private URL_HOST = 'http://localhost:8000/';
  private URL_HOST = environment.urlBack + '/';

  constructor(private httpService: HttpService, private http: HttpClient) { }

  saveFormulario(data: any) {
    return this.httpService.postJSON('accounts/api/v1/rest-auth/user/', data).map(
      response => {
        return response;
      }, error => {
        return error;
      }
    );
  }
}
