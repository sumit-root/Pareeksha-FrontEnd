import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../student.service'
import { PaperSetterService } from "../../../paper-setter.service";
import { IQuestionChoice } from 'src/model/IQuestionChoice';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  paperId: any;
  marksObtained: number = 0;
  paperSetterId : any;
  constructor(private service: StudentService, private router: Router,private paperSetterService:PaperSetterService) { }

  paper: any = {
    paperName: '',
    paperSubject: '',
    questions: []
  }

  questions :any[] = [];
  
  questionAndChoice: IQuestionChoice = {
    questionId: 0,
    selectedChoiceId: 0
  };

  responses: IQuestionChoice[] = [{
    questionId: 0,
    selectedChoiceId: 0
  }];

  ngOnInit(): void {
    this.paperId = sessionStorage.getItem('pageToBeReviewed');
    this.service.fetchPaper(this.paperId).subscribe((result) => {
      console.log(result['paperName']);
      this.paper = result;
      console.log(this.paper.paperName);
      console.log(this.paper.questions[0].question);
      console.log(this.paper.questions[0].choices[0].correct);

      this.paper.questions.forEach(ques => {
        if(ques.questionType == "MATCHTHEFOLLOWING"){
          this.questions = ques.question.split('~');
          console.log(this.questions[0]);
        }
      });
    });
  }

  collectData() {
    console.log("In collectData data");
    this.paperSetterService.updatePaperStatus(this.paperId).subscribe((result) => {
      this.router.navigate(['dashboard/papersetterDashboard']);
    });
  }
}
