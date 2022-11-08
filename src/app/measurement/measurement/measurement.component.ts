import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Device } from 'src/app/entity/device';
import { Measurement } from 'src/app/entity/measurement';
import { DeviceService } from 'src/app/services/device.service';
import { MeasurementService } from 'src/app/services/measurement.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss'],
})
export class MeasurementComponent implements OnInit {
  measurementDetail!: FormGroup;
  measurementList: Measurement[] = [];
  deviceList: Device[] = [];
  selectDevice!: Device;

  constructor(
    private formBuilder: FormBuilder,
    private measurementService: MeasurementService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.measurementService.listMeasurments().subscribe((res) => {
      this.measurementList = res;
    });

    this.deviceService.getAllDevices().subscribe((res) => {
      this.deviceList = res;
      console.log(res);
      this.selectDevice = res[0];
    })

    this.measurementDetail = this.formBuilder.group({
      id: [''],
      timestamp: [''],
      energyConsumption: [''],
      device:['']
    });
  }

  addMeasurement() {
    const measurement = new Measurement(
      undefined,
      undefined,
      this.measurementDetail.value.energyConsumption,
      this.selectDevice
    );

    console.log(measurement);
    this.measurementDetail.value.id = null;
    this.measurementService.postMeasurement(measurement).subscribe((res) => {
      console.log(res);
      this.measurementService.listMeasurments().subscribe((res) => {
        this.measurementList = res;
      });
    },
    (err) => {
      console.log(err);
    });
  }

  resetForm() {
    this.measurementDetail.controls['id'].setValue('');
    this.measurementDetail.controls['timestamp'].setValue('');
    this.measurementDetail.controls['energyConsumption'].setValue('');
    this.measurementDetail.controls['device'].setValue('');
  }
}
