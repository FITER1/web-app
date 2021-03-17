import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mifosx-view-maker-checker-task',
  templateUrl: './view-maker-checker-task.component.html',
  styleUrls: ['./view-maker-checker-task.component.scss']
})
export class ViewMakerCheckerTaskComponent implements OnInit {

 commandId:any;
 path:any;

  constructor(private route : ActivatedRoute) { 
   this.commandId = this.route.snapshot.params['commandId'];
  }

  ngOnInit(): void {
  }

}
