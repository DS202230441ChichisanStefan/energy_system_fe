import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'google-protobuf';
import { ChatClient, ServiceError } from 'src/assets/js/chat_pb_service';
import { MessageRequest, SubscriptionRequest, UnsubscriptionRequest } from 'src/assets/js/chat_pb';
import { grpc } from '@improbable-eng/grpc-web';
import * as grpcWeb from '@improbable-eng/grpc-web'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  subscribed: boolean = false;
  private javaClient: ChatClient;

  typedMessaged!: string;

  constructor() {
    this.javaClient = new ChatClient('http://localhost:9901');
   }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    console.log(username);

    if (username != null) {
      const subRequest = new SubscriptionRequest();
      subRequest.setUsername(username);

      this.javaClient.subscribe(subRequest).on("data", data => {
        if (!data.getMessage().includes("Error")) {
          console.log("User has subscribed: " + username);
          this.subscribed = true;
        }
        console.log("ERROR to Subscription");
      });
    } else {
      console.log("User is not logged in.");
    }
    
  }

  ngOnDestroy(): void {
    let username = localStorage.getItem('username');
    console.log("User has unsubscribed: " + username);

    if (username != null) {
      const unsubRequest = new UnsubscriptionRequest();
      unsubRequest.setUsername(username);

      this.javaClient.unsubscribe(unsubRequest,
        (error: ServiceError | null, responseMessage: Message | null) => {
          console.log(error);
          console.log(responseMessage);
          
          this.subscribed = false;
        })
    }
  }

  sendMessage(message: string) {
    let username = localStorage.getItem('username');
    console.log(username);
    
    if (username != null) {
      const messageRequest = new MessageRequest();
      messageRequest.setUsername(username);
      messageRequest.setMessage(message);

      this.javaClient.sendMessage(messageRequest,
        (error: ServiceError | null, responseMessage: Message | null) => {
          console.log(error);
          console.log(responseMessage);
          
          if (message) {
            console.log("Message received: " + message);
          } else {
            console.error("An error has occured.")
          }          
        });
    }
  }
}
