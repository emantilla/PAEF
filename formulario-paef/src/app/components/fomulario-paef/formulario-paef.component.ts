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

  competitionView: {
    id: number, end_date: string, image: string, owner: string,
    prize_description: string, start_date: string, uniq_url: string, name: string
  };

  constructor(private fb: FormBuilder, private router: Router, private service:FormularioService) { }

  ngOnInit() {
    this.initUserDetailsForm();
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
      this.validateDates();
    } else {
      this.createForm.get(field).setValue(value);
    }

  }


  create() {
    /* this.service.saveFormulario(this.setRequest()).subscribe(
      response => {
        alert('Evento creado satisfactoriamente');
        this.router.navigate(['/list-competition']);
      }, error => {
        alert('Error creando el evento, intente nuevamente');
      }
    ); */
    console.log(this.createForm)
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
        name: this.createForm.get('nameForm').value,
        uniq_url: this.createForm.get('urlIdForm').value,
        start_date: this.createForm.get('startDateForm').value,
        end_date: this.createForm.get('endDateForm').value,
        prize_description: this.createForm.get('descriptionForm').value,
        owner: parseInt(sessionStorage.getItem('pkUser'), 10)
      };
  }

  validateDates() {
    const startDate = this.createForm.get('startDateForm').value;
    const endDate = this.createForm.get('endDateForm').value;

    if (startDate !== null && startDate !== undefined && startDate !== '' &&
      endDate !== null && endDate !== undefined && endDate !== '') {
      this.hasErrorDates = new Date(startDate) > new Date(endDate);
    }

  }

}
