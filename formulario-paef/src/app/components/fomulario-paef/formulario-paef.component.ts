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
  showPersona = false;
  showConsorcio = false;
  startDatePlaceholder = '';
  endDatePlaceholder = '';
  hasErrorDates = false;
  url = environment.urlBack;
  captchaKey = environment.CaptchaKey;
  departamentos: Array<any>;
  ciudades: Array<any>;
  actividadesEconomica: Array<any>;
  showRut = false;
  showNit = false;
  showCities = false;

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

    this.service.getCiuu().subscribe(data => {
      this.actividadesEconomica = data;
    });
  }

  private initUserDetailsForm() {
    this.createForm = this.fb.group({
      nombreEmpresa: ['', Validators.compose([Validators.required, Validators.maxLength(150)])],
      solicitud: ['', Validators.compose([Validators.required])],
      razonSocial: ['', Validators.compose([Validators.required])],
      tipoPersona: ['', Validators.compose([Validators.required])],
      tipoIdPersona: [''],
      numeroEmpresa: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]$'), Validators.maxLength(13)])],
      direccionEmpresa: ['', Validators.compose([Validators.required, Validators.maxLength(150)])],
      departamento: ['', Validators.compose([Validators.required])],
      ciudad: ['', Validators.compose([Validators.required])],
      telefonoFijo: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]$'), Validators.maxLength(7)])],
      celular: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]$'), Validators.maxLength(10)])],
      correoElectronico: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(150)])],
      ciuu: ['', Validators.compose([Validators.required])],
      entidadFinaciera: ['', Validators.compose([Validators.required])],
      tipoCuenta: ['', Validators.compose([Validators.required])],
      numeroCuenta: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]$')])],
      nombres: ['', Validators.compose([Validators.required, Validators.maxLength(75)])],
      apellidos: ['', Validators.compose([Validators.required, Validators.maxLength(75)])],
      tipoIdentificacionRep: ['', Validators.compose([Validators.required])],
      numeroDocumentoRep: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]$'), Validators.maxLength(13)])],
      correoElectronicoRep: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(150)])],
      celularRep: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]$'), Validators.maxLength(10)])],
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
      plJunio: [''],
      recaptcha: ['', Validators.compose([Validators.required])]
    });
  }

  setValueField(field, value) {
    if (field === 'tipoPersona') {
      if (value === 'personaJuridica') {
        this.showNit = true;
        this.showRut = false;
      } else {
        this.showNit = false;
        this.showRut = true;
      }
    }
    if (field === 'departamento') {
      this.getCities();
    }

    console.log(field, ' -> ', value);
    this.createForm.get(field).setValue(value);
    console.log('estado -> ', this.createForm.status);
    console.log('estado -> ', this.createForm);

  }


  create() {
    this.service.saveFormulario(this.setRequest()).subscribe(
      data => {
        alert('Registro creado satisfactoriamente');
        this.showPdf('');
      }, error => {
        alert('Error guardando formulario');
        console.log('error: ', error);
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

  showPdf(file: string) {
    window.open('data:application/pdf;base64,' + file);
  }

  getCities() {
    const idDep = this.createForm.get('departamento').value.split(',');
    console.log('aqui', idDep[0]);
    this.showCities = true;
    this.service.getCiudades().subscribe(data => {
      this.ciudades = data;
      const filter = this.ciudades.forEach(x =>
        {
          x.idDepartamento === idDep
          this
        });
      console.log('filter ', filter);
    });
  }

}
