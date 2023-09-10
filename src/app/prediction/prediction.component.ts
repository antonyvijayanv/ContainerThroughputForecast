import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { CommonModule, DatePipe } from '@angular/common';
import { PredictionService } from '../services/prediction.service';
import { ChartInput } from '../model/chart-input.model';
import { HttpClientModule } from '@angular/common/http';
import { ChartInputComponent } from '../chart-input/chart-input.component';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    HttpClientModule,
    ChartInputComponent,
    BarChartComponent
  ],
  providers:[PredictionService,DatePipe]
})
export class PredictionComponent {

  form: FormGroup = new FormGroup({
    startDate: new FormControl('',Validators.required),
    endDate: new FormControl('',Validators.required),
    CargoType: new FormControl('',Validators.required)
  })
  public barChartLegend = true;
  public barChartPlugins = [];
  public CargoTypeList: any[] = [{ label: 'Import', value: 'I' }, { label: 'Export', value: 'E' }, { label: 'Transshipment', value: 'T' }];


  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  constructor(private predictionService: PredictionService, private datePipe: DatePipe) { }

  ngOnInit(): void {}
  
  onSearch() {
    const value = this.form.value;
    if(this.form.valid){
      let reqObj:ChartInput = {
        StartDate: this.datePipe.transform(value.startDate, 'yyyy-MM-dd'),
        EndDate: this.datePipe.transform(value.endDate, 'yyyy-MM-dd'),
        CargoType: value.CargoType
      }
      this.getDashboardData(reqObj);
    }
  }

  getDashboardData(reqObj:ChartInput) {
    this.predictionService.getPredictiondData(reqObj).subscribe(res => {
      this.barChartData.labels = Object.keys(res.ds).map((x: any) => { return this.datePipe.transform(res.ds[x], 'MM-yyyy') });
      const barChartData = Object.keys(res.yhat).map((x: any) => { return res.yhat[x] });
      const barChartObj = {
        data: barChartData,
        label: 'Series A'
      }
      this.barChartData.datasets.push(barChartObj);
      this.barChartData  = {...this.barChartData};
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
