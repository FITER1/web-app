import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'mifosx-rescheduled-schedule',
  templateUrl: './rescheduled-schedule.component.html',
  styleUrls: ['./rescheduled-schedule.component.scss']
})
export class RescheduledScheduleComponent implements OnInit {

  originalScheduleDetails: any;

  displayedColumns: string[] = ['date', 'principalDue', 'balanceOfLoan', 'interest', 'fees', 'penalties', 'outstanding'];
  constructor(private route: ActivatedRoute,private location: Location) { 
    this.route.data.subscribe(data => {
      this.originalScheduleDetails = data.loanRepaymentScheduleDetails;
      console.log(this.originalScheduleDetails)
    });

  }

  ngOnInit(): void {
  }


  goBack() {
    this.location.back();
  }
}
