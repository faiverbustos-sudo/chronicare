import { ChangeDetectorRef, Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { Paciente, PacienteService } from '../../services/paciente.service';
import { ActivatedRoute } from '@angular/router';
  import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-riesgo-detalle',
  imports: [
    BreadcrumbModule,
    ChartModule
  ],
  templateUrl: './riesgo-detalle.html',
  styleUrl: './riesgo-detalle.css',
})
export class RiesgoDetalle {

  idPaciente: string = '';
  paciente: Paciente | null = null;
  registros: any[] = [];
  alertas: any[] = [];
  
  breadcrumbItems: MenuItem[] | undefined;
  home: MenuItem | undefined;

  dataPresion: any;
  dataGlucosa: any;

  options: any;

  platformId = inject(PLATFORM_ID);

  constructor(private _pacienteService: PacienteService, private _route: ActivatedRoute, private cd: ChangeDetectorRef) {
    
    this.breadcrumbItems = [
        { label: 'Detalle riesgo' }
    ];

    this.home = { icon: 'pi pi-exclamation-triangle', label: 'Panel de riesgo', routerLink: '/panel-riesgo' };
  }

  ngOnInit() {
    // Aquí puedes cargar los detalles del riesgo del paciente usando el servicio
    this._route.paramMap.subscribe(params => {
      this.idPaciente = params.get('idPaciente') || '';
      this.getRiesgoDetails();
    });    
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.dataPresion = {
          labels: this.registros.map(m => new Date(m.fechaRegistro).toLocaleDateString()),
          datasets: [
              {
                  label: 'Sistólica',
                  data: this.registros.map(m => m.valorSistolica),
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                  tension: 0.4
              },
              {
                  label: 'Diastólica',
                  data: this.registros.map(m => m.valorDiastolica),
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                  tension: 0.4
              }
          ]
      };

      this.dataGlucosa = {
          labels: this.registros.map(m => new Date(m.fechaRegistro).toLocaleDateString()),
          datasets: [
            {
              label: 'Glucosa',
              data: this.registros.map(m => m.valorNumerico),
              fill: false,
              borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
              tension: 0.4
            }
          ]
      };
    }   
  }

  getRiesgoDetails() {
    // Lógica para obtener los detalles del riesgo del paciente
    this._pacienteService.getRiesgoDetallePaciente(this.idPaciente).subscribe({
      next: (data: any) => {
        this.paciente = data.result.paciente;
        this.registros = data.result.registros;
        this.alertas = data.result.alertas;
        this.initChart();
        console.log('Detalle riesgo paciente:', data);
      },
      error: (err: any) => {
        console.error('Error al obtener detalle riesgo paciente:', err);
      }
    });
  }
}
