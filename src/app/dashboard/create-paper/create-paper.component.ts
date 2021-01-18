import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaperSetterService } from '../../paper-setter.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-paper',
  templateUrl: './create-paper.component.html',
  styleUrls: ['./create-paper.component.css'],
})
export class CreatePaperComponent implements OnInit{

  constructor(private service: PaperSetterService, private router: Router) {  }

  ngOnInit(): void {
    this.service.getPaperSetterId().subscribe(result => {
      console.log('Retrived papperSetter Id: ')
      console.log('result : ', result);
      console.log('Setting up paperSetter id in localstorage');
    localStorage.setItem('paperSetterId', result.toString());
    console.log(localStorage.getItem('paperSetterId'));
  })
  }

  alert: boolean = false;

  createPaper = new FormGroup({
    paperSetterId: new FormControl(Number(localStorage.getItem('paperSetterId'))),
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
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    duration: new FormControl(''),
    difficultyLevel: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
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

  get difficultyLevel() {
    return this.createPaper.get('difficultyLevel');
  }

  collectData() {
    console.log(this.createPaper.value);
    this.service.createPaper(this.createPaper.value).subscribe((result) => {
      console.log('result : ', result);
      localStorage.setItem('paperId', result['paperId']);
      localStorage.setItem('paperSubject', result['paperSubject']);
    });
    this.alert = true;
    this.createPaper.reset();
  }

  closeAlert() {
    this.alert = false;
  }
}