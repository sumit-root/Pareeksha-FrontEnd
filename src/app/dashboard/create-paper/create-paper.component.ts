import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-paper',
  templateUrl: './create-paper.component.html',
  styleUrls: ['./create-paper.component.css'],
})
export class CreatePaperComponent {

  constructor(private service: DashboardService, private router: Router) { }

  message: string = '';
  level = ['EASY', 'MEDIUM', 'HARD'];

  createPaper = new FormGroup({
    paperSetterId: new FormControl(Number(sessionStorage.getItem('paperSetterId'))),
    reviewed: new FormControl(false),
    paperName: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    paperSubject: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    paperPassword: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    startDate: new FormControl('', [
      Validators.required
    ]),
    endDate: new FormControl('', [
      Validators.required
    ]),
    duration: new FormControl('', [
      Validators.required
    ]),
    difficultyLevel: new FormControl(null, [
      Validators.required
    ]),
    totalMarks: new FormControl('', [
      Validators.required
    ]),
    totalQuestions: new FormControl('', [
      Validators.required
    ]),
  });

  get paperName() {
    return this.createPaper.get('paperName');
  }
  get paperSubject() {
    return this.createPaper.get('paperSubject');
  }
  get paperPassword() {
    return this.createPaper.get('paperPassword');
  }
  get startDate() {
    return this.createPaper.get('startDate');
  }
  get endDate() {
    return this.createPaper.get('endDate');
  }
  get duration() {
    return this.createPaper.get('duration');
  }
  get totalMarks() {
    return this.createPaper.get('totalMarks');
  }
  get totalQuestions() {
    return this.createPaper.get('totalQuestions');
  }
  get difficultyLevel() {
    return this.createPaper.get('difficultyLevel');
  }

  collectData() {
    console.log(this.createPaper.value);
    this.service.createPaper(this.createPaper.value).subscribe((result) => {
      console.log('result : ', result);
      sessionStorage.setItem('paperId', result['paperId']);
      sessionStorage.setItem('paperSubject', result['paperSubject']);
      sessionStorage.setItem('totalQuestions', result['totalQuestions'])
      alert('Paper created Successfully. Please Insert Questions now');
      this.router.navigate(['dashboard/question/insert']);
    }, (error) => {
      console.error();
      alert(error.error['message']);
    });
    this.createPaper.reset();
  }
}
