import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) { }

  submitForm(formData: any) {
    const payload = {
      ...formData,
      businessEmail: 'travis@bluelineautoglass.com', // Pass the specific recipient email
    };
    //return this.http.post('http://localhost:3000/send-email-universal', payload);
    return this.http.post('https://twg-template-submission-92b1532f00c1.herokuapp.com/send-email-universal', payload);
  }
}