import {Component, OnInit, Directive, input} from '@angular/core';

import {IMaskModule} from "angular-imask";
import {NgForOf, NgIf, } from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from '@angular/common/http';



@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    IMaskModule,
    NgIf,
    FormsModule,
    HttpClientModule,
    NgForOf,
  ],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})

export class FeedbackFormComponent implements OnInit {
  constructor(private httpClient: HttpClient) {

  }
  errorEmailMessage: string = "";
  errorPhoneMessage: string = "";
  errorNameMessage: string = "";
  errorTextMessage: string = "";

  response: any;
  getTopics() {
    this.httpClient.get("../../assets/topics.json")
      .subscribe((response) => {
        this.response = response;
      })
  }

  inputCheckEmail(): string {
    let inputEmail = document.getElementById("inputEmail") as HTMLInputElement;
    let regax =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (inputEmail.value == ""){
      return this.errorEmailMessage = "Необходимо ввести Email";
    }
    if (!regax.test(inputEmail.value)) {
      return this.errorEmailMessage = "Некорректно введен Email"
    }
    return this.errorEmailMessage = "";
  }
  inputCheckPhone(): string {
    let inputPhone = document.getElementById("inputPhone") as HTMLInputElement;
    console.log(inputPhone.value.length);
    if (inputPhone.value == ""){
      return this.errorPhoneMessage = "Необходимо ввести телефон";
    }
    if (inputPhone.value.length < 18 && inputPhone.value.length >= 1) {
      return this.errorPhoneMessage = "Некорректно введен телефон";
    }
    else
    {
      return this.errorPhoneMessage = "";
    }
  }

  inputCheckName(): string {
    let inputName = document.getElementById("inputName") as HTMLInputElement;
    if (inputName.value == ""){
      return this.errorNameMessage = "Необходимо ввести Имя";
    }
    return this.errorNameMessage;
  }

  inputCheckText(): string {
    let inputText = document.getElementById("inputText") as HTMLInputElement;
    if (inputText.value == ""){
      return this.errorTextMessage = "Необходимо ввести сообщение";
    }
    return this.errorTextMessage;
  }

  ngOnInit() {
    this.getTopics()
  }
}
