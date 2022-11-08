import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Device } from 'src/app/entity/device';
import { User } from 'src/app/entity/user';
import { DeviceService } from 'src/app/services/device.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  deviceDetail!: FormGroup;
  deviceList: Device[] = [];
  clientList: User[] = [];
  selectClient!: any;

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe((res) => {
      this.deviceList = res;
    });

    this.userService.getAllUserClient().subscribe((res) => {
      this.clientList = res;
      console.log(res);
      this.selectClient = res[0];
    });

    this.deviceDetail = this.formBuilder.group({
      id: [''],
      description: [''],
      address: [''],
      hourlyMaxEnergyConsumption: [''],
      measurement:['']
    });
  }

  addDevice() {
    const device = new Device(
      undefined,
      this.deviceDetail.value.description,
      this.deviceDetail.value.address,
      this.deviceDetail.value.hourlyMaxEnergyConsumption,
      this.selectClient,
      []
    );

    console.log(device);
    
    this.deviceService.addDevice(device, device.user!.id!).subscribe(
      (res) => {
        console.log(res);
        this.deviceService.getAllDevices().subscribe((res) => {
          this.deviceList = res;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editDevice(device: Device) {
    this.deviceDetail.controls['id'].setValue(device.id);
    this.deviceDetail.controls['description'].setValue(device.description);
    this.deviceDetail.controls['address'].setValue(device.address);
    this.deviceDetail.controls['hourlyMaxEnergyConsumption'].setValue(device.hourlyMaxEnergyConsumption);
    this.deviceDetail.controls['measurement'].setValue(device.measurement);
  }

  updateDevice() {
    const device = new Device(this.deviceDetail.value.id,
      this.deviceDetail.value.description,
      this.deviceDetail.value.address,
      this.deviceDetail.value.hourlyMaxEnergyConsumption,
      this.selectClient,
      []
      );

      this.deviceService.updateDevice(device, device.user!.id!).subscribe((res) => {
        console.log(res);
        this.deviceService.getAllDevices().subscribe((res) => {
          this.deviceList = res;
        }); 
      },
      (err) => {
        console.log(err);
      })
  }

  deleteDevice(id: number, userId: number) {
    this.deviceService.deleteDevice(id, userId).subscribe(
      (res) => {
        console.log(res);
        alert('Client deleted successfully');
        this.deviceService.getAllDevices().subscribe((res) => {
          this.deviceList = res;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm() {
    this.deviceDetail.controls['id'].setValue('');
    this.deviceDetail.controls['description'].setValue('');
    this.deviceDetail.controls['address'].setValue('');
    this.deviceDetail.controls['hourlyMaxEnergyConsumption'].setValue('');
    this.deviceDetail.controls['measurement'].setValue('');
  }

  update(user: User) {
    this.deviceDetail.value.user = user;
    console.log(user);
  }
}
