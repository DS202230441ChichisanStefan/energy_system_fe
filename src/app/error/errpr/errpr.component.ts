import { Component, OnInit } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-errpr',
  templateUrl: './errpr.component.html',
  styleUrls: ['./errpr.component.scss'],
  providers: [MessageService]
})
export class ErrprComponent implements OnInit {
  msgs1!: Message[];

  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.msgs1 = [
      {severity:'error', summary:'Error', detail:"You cannot access anymore!"}
    ];

    this.primengConfig.ripple = true;
  }

}
