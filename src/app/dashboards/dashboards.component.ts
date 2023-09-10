import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ChartInputComponent } from '../chart-input/chart-input.component';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { DashboardRequest } from '../model/chart-input.model';
import { PredictionComponent } from '../prediction/prediction.component';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    HttpClientModule,
    NgChartsModule,
    MatButtonModule,
    ChartInputComponent,
    PredictionComponent,
    BarChartComponent
  ],
  providers: [DashboardService, DatePipe]
})
export class DashboardsComponent implements OnInit {
  now = new Date();
  form: FormGroup = new FormGroup({
    ucid: new FormControl('001484'),
    cargoYear: new FormControl(this.now.getFullYear(),Validators.required),
    CargoType: new FormControl('CONT',Validators.required)
  })
  public barChartLegend = true;
  public barChartPlugins = [];
  public CargoTypeList: any[] = [{ label: 'Container', value: 'CONT' }];


  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) { }

  ngOnInit(): void {}

  onSearch() {
    const value = this.form.value;
    if(this.form.valid){
      let reqObj:DashboardRequest = {
        ucid:value?.ucid,
        CargoYear:value.cargoYear,
        CargoType: value.CargoType
      }
      this.getDashboardData(reqObj);
    }
  }

    getDashboardData(reqObj:DashboardRequest) {
    this.dashboardService.getDashbaordData(reqObj).subscribe(res => {
      const parsedData = JSON.parse(res.Template)
      parsedData?.datasets.forEach((x:any)=>x.barPercentage = 2)
      this.barChartData.labels = parsedData?.labels
      this.barChartData.datasets =parsedData?.datasets;
      this.barChartData = { ...this.barChartData};
    })
  }

  onClear() {
    this.form.reset();
    this.barChartData = {
      labels: [],
      datasets: []
    };
  }

}
