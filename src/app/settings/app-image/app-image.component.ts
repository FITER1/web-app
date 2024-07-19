import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppImageService } from './app-image.service';

@Component({
  selector: 'mifosx-app-image',
  templateUrl: './app-image.component.html',
  styleUrls: ['./app-image.component.scss']
})
export class AppImageComponent implements OnInit {

  /** App Image */
  image: File;

  constructor(private router: Router, private route : ActivatedRoute, private appImageService: AppImageService) { }

  ngOnInit(): void {
  }

  /**
   * Sets file form control value.
   * @param {any} $event file change event.
   */
  onFileSelect($event: any, imageId: string) {
    if ($event.target.files.length > 0) {
      this.image = $event.target.files[0];
      if (this.image) {
        this.appImageService.uploadImage(imageId, this.image)
          .subscribe(() => {
            this.reload();
          });
      }
    }
  }

  /**
   * Refetches data for the component
   * TODO: Replace by a custom reload component instead of hard-coded back-routing.
   */
  reload() {
    const url: string = this.router.url;
    this.router.navigateByUrl(`/settings`, {skipLocationChange: true})
      .then(() => this.router.navigate([url]));
  }

}
