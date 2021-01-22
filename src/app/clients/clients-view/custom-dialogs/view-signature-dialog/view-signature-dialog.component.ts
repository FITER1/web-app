/** Angular Imports */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

/** Custom Services */
import { ClientsService } from 'app/clients/clients.service';

/**
 * View signature dialog component.
 */
@Component({
  selector: 'mifosx-view-signature-dialog',
  templateUrl: './view-signature-dialog.component.html',
  styleUrls: ['./view-signature-dialog.component.scss']
})
export class ViewSignatureDialogComponent implements OnInit {

  /** Id of client signature in documents */
  signatureId: any;
  /** Signature Image */
  signatureImage: any;
  /** Client Id */
  clientId: any;

  /**
   * @param {MatDialogRef} dialogRef Component reference to dialog.
   * @param {any} data Documents data
   */
  constructor(public dialogRef: MatDialogRef<ViewSignatureDialogComponent>,
              private clientsService: ClientsService,
              private sanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) public data: { documents: any[], id: string }) {
    const signature = this.data.documents.find((document: any) => document.name === 'clientSignature') || {};
    this.signatureId = signature.id;
    this.clientId = this.data.id;
  }

  ngOnInit() {
    if (this.signatureId) {
      this.clientsService.getClientSignatureImage(this.clientId, this.signatureId).subscribe(
        (base64Image: any) => {
          console.log(base64Image);
          let objectURL = 'data:image/jpeg;base64,' + base64Image;
          this.signatureImage = 'https://localhost:8443/fineract-provider/api/v1/clients/95/documents/5551/attachment?tenantIdentifier=default';
        }, (error: any) => {}
      );
    }
  }

}
