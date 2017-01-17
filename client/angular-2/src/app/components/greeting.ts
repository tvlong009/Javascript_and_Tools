import {Component, OnInit} from '@angular/core';
import {GreetingService} from "../services/greeting";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'greeting',
  templateUrl: 'greeting.html',
  styleUrls: ['greeting.scss'],
  providers: [GreetingService]
})
export class GreetingComponent implements OnInit {
  @Input() lang: string
  private message: string

  constructor(private greetingService: GreetingService) {
  }

  ngOnInit() {
    this.greetingService.getMessage(this.lang).subscribe(
      data => this.message = data.message,
      error => alert(error)
    )
  }
}
