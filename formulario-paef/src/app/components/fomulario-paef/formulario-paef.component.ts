import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormularioService } from 'src/app/services/formulario-service/formulario.service';

@Component({
  selector: 'app-formulario-paef',
  templateUrl: './formulario-paef.component.html',
  styleUrls: ['./formulario-paef.component.css']
})
export class FormularioPaefComponent implements OnInit {

  createForm: FormGroup;
  activeBtn = false;
  showDate = false;
  startDatePlaceholder = '';
  endDatePlaceholder = '';
  hasErrorDates = false;
  url = environment.urlBack;
  captchaKey = environment.CaptchaKey;
  departamentos: Array<any>;
  ciudades: Array<any>;
  actividadesEconomica: Array<any>;

  competitionView: {
    id: number, end_date: string, image: string, owner: string,
    prize_description: string, start_date: string, uniq_url: string, name: string
  };

  constructor(private fb: FormBuilder, private router: Router, private service: FormularioService) { }

  ngOnInit() {
    this.initUserDetailsForm();
    this.service.getDepartamentos().subscribe(data => {
      this.departamentos = data;
    });

    this.service.getCiudades().subscribe(data => {
      this.ciudades = data;
    });

    this.service.getCiuu().subscribe(data => {
      this.actividadesEconomica = data;
    });
  }

  private initUserDetailsForm() {
    this.createForm = this.fb.group({
      nombreEmpresa: ['', Validators.compose([Validators.required])],
      solicitud: ['', Validators.compose([Validators.required])],
      razonSocial: ['', Validators.compose([Validators.required])],
      tipoPersona: ['', Validators.compose([Validators.required])],
      tipoIdPersona: [''],
      numeroEmpresa: ['', Validators.compose([Validators.required])],
      direccionEmpresa: ['', Validators.compose([Validators.required])],
      departamento: ['', Validators.compose([Validators.required])],
      ciudad: ['', Validators.compose([Validators.required])],
      telefonoFijo: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.required])],
      correoElectronico: ['', Validators.compose([Validators.required, Validators.email])],
      ciuu: ['', Validators.compose([Validators.required])],
      entidadFinaciera: ['', Validators.compose([Validators.required])],
      tipoCuenta: ['', Validators.compose([Validators.required])],
      numeroCuenta: ['', Validators.compose([Validators.required])],
      nombres: ['', Validators.compose([Validators.required])],
      apellidos: ['', Validators.compose([Validators.required])],
      tipoIdentificacionRep: ['', Validators.compose([Validators.required])],
      numeroDocumentoRep: ['', Validators.compose([Validators.required])],
      correoElectronicoRep: ['', Validators.compose([Validators.required, Validators.email])],
      celularRep: ['', Validators.compose([Validators.required])],
      prFng: ['', Validators.compose([Validators.required])],
      prDeposito: ['', Validators.compose([Validators.required])],
      prConstitucion: ['', Validators.compose([Validators.required])],
      prDisminucionAno: ['', Validators.compose([Validators.required])],
      prDisminucion: ['', Validators.compose([Validators.required])],
      prParticipacion: ['', Validators.compose([Validators.required])],
      prSolicitud: ['', Validators.compose([Validators.required])],
      prCumplimiento: ['', Validators.compose([Validators.required])],
      documentosUnion: [''],
      prEmpleados: ['', Validators.compose([Validators.required])],
      prPEP: [''],
      plAbril: [''],
      plMayo: [''],
      plJunio: ['']
    });
  }

  setValueField(field, value) {
    if (field === 'startDateForm' || field === 'endDateForm') {
      const month = value.value.getMonth() + 1;
      const day = value.value.getDate();
      this.createForm.get(field).setValue(value.value.getFullYear() + '-' +
        (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day));
      this.refreshPlaceholder(field);
    } else {
      this.createForm.get(field).setValue(value);
    }

  }


  create() {
    this.service.saveFormulario(this.setRequest()).subscribe(
      response => {
        alert('Registro creado satisfactoriamente');
        this.showPdf();
      }, error => {
        alert('Error creando el registro, intente nuevamente');
      }
    );
    console.log(this.createForm);
  }

  refreshPlaceholder(field) {
    if (field === 'startDateForm') {
      this.startDatePlaceholder = '';
    } else if (field === 'endDateForm') {
      this.endDatePlaceholder = '';
    }
  }

  setRequest(): any {
    let data = null;

    data = {
      estadoSolicitud: true,
      solicitud: 1,
      numeroEmpresa: '123123',
      nombreEmpresa: 'Mi casa ya',
      direccionEmpresa: 'Calle cerquita',
      departamento: '11',
      departamentoDesc: 'Bogota DC',
      ciudad: '1111',
      ciudadDesc: 'Bogota',
      telefonoFijo: '6570161',
      telefonoCelular: 3005740292,
      correoElectronico: 'elkinmantilla',
      ciiu: '111',
      entidadCuenta: 'BAVV',
      entidadCuentaDesc: 'Banco Av Villas',
      numeroCuenta: '12345678',
      nombres: 'nombre rep',
      apellidos: 'apellido rep',
      tipoIdentificacion: 'SC',
      numeroIdentificacion: '12345678',
      correoRep: 'asdasd',
      celularRep: 3005740292,
      prProductoDeposito: true,
      actividadEconomica: 'Agricultura',
      prConstitucion: true,
      prDisminucionAno: true,
      prParticipacion: true,
      prSolicitud: true,
      prCumpliento: true,
      prEmpleados: true,
      prPEP: true,
      tipoPersona: '2',
      prDisminucion: true
    };
  }

  showPdf() {
    const pdfInBase64 = 'JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==\n';
    const newBlob = new Blob([pdfInBase64], { type: 'application/pdf' });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
    } else {
      const byteArray = new Uint8Array(atob(pdfInBase64).split('').map(char => char.charCodeAt(0)));
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      document.querySelector('iframe').src = url;
    }


  }

}
