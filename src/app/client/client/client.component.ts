import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  userDetail!: FormGroup;
  userList: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.userList = res;
    });

    this.userDetail = this.formBuilder.group({
      id: [''],
      name: [''],
      username: [''],
      password: [''],
      role: [''],
    });
  }

  isSameUser(id: number) {
    return id.toString() === localStorage.getItem('loggedUserId');
  }

  addUser() {
    const user = new User(
      undefined,
      this.userDetail.value.name,
      this.userDetail.value.username,
      this.userDetail.value.password,
      this.userDetail.value.role,
      []
    );
    console.log(this.userDetail);
    this.userDetail.value.id = null;
    this.userService.addUser(user).subscribe(
      (res) => {
        console.log(res);
        this.userService.getAllUsers().subscribe((res) => {
          this.userList = res;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editUser(user: User) {
    this.userDetail.controls['id'].setValue(user.id);
    this.userDetail.controls['name'].setValue(user.name);
    this.userDetail.controls['username'].setValue(user.username);
    this.userDetail.controls['password'].setValue(user.password);
    this.userDetail.controls['role'].setValue(user.role);
  }

  updateUser() {
    const user = new User(
      this.userDetail.value.id,
      this.userDetail.value.name,
      this.userDetail.value.username,
      this.userDetail.value.password,
      this.userDetail.value.role,
      []
    );

    this.userService.updateUser(user).subscribe(
      (res) => {
        console.log(res);
        this.userService.getAllUsers().subscribe((res) => {
          this.userList = res;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      (res) => {
        console.log(res);
        alert('Client deleted successfully');
        this.userService.getAllUsers().subscribe((res) => {
          this.userList = res;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm() {
    this.userDetail.controls['id'].setValue('');
    this.userDetail.controls['name'].setValue('');
    this.userDetail.controls['username'].setValue('');
    this.userDetail.controls['password'].setValue('');
    this.userDetail.controls['role'].setValue('');
  }
}
