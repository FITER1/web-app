import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mifosx-upload-document-dialog',
  templateUrl: './upload-document-dialog.component.html',
  styleUrls: ['./upload-document-dialog.component.scss']
})
export class UploadDocumentDialogComponent implements OnInit {

  /** Upload Document form. */
  uploadDocumentForm: FormGroup;
  /** Upload Document Data */
  uploadDocumentData: any = [];
  /** Triggers description field */
  documentIdentifier = false;
  /** Document Tags Data*/
  documentTags: any = [];

  /**
   * @param {MatDialogRef} dialogRef Dialog reference element
   * @param {FormBuilder} formBuilder Form Builder
   * @param {any} data Dialog Data
   * @param {ActivatedRoute} route Activated Route
   */
  constructor(public dialogRef: MatDialogRef<UploadDocumentDialogComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private route : ActivatedRoute) {
    this.documentIdentifier = data.documentIdentifier;
    this.documentTags = data.clientDocumentTemplate ? data.clientDocumentTemplate.documentTags : [];
  }

  ngOnInit() {
    this.createUploadDocumentForm();
  }

  /**
   * Creates the upload Document form.
   */
  createUploadDocumentForm() {
    this.uploadDocumentForm = this.formBuilder.group({
      'fileName': ['', Validators.required],
      'description': [''],
      'file': [''],
      'tagId':['']
    });
  }

  /**
   * Sets file form control value.
   * @param {any} $event file change event.
   */
  onFileSelect($event: any) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.uploadDocumentForm.get('file').setValue(file);
    }
  }

}


