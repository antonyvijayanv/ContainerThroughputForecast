import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chart-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './chart-input.component.html',
  styleUrls: ['./chart-input.component.scss']
})
export class ChartInputComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({});
  @Input() pageType: string = "";
  @Input() CargoTypeList :any[] =[];
  @Output() searchEmitter = new EventEmitter<any>();
  @Output() clearEmitter = new EventEmitter<any>();
  years: number[] = [];

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let i = (currentYear - 7); i <= (currentYear + 1); i++) {
      this.years.push(i);
    };
  }

  onSearch() {
    this.searchEmitter.emit();
  }

  onClear() {
    this.clearEmitter.emit();
  }
}
