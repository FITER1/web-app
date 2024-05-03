import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppImageService {

  constructor(private http: HttpClient) { }

  uploadImage(appImageId: string, image: File) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('filename', 'file');
    return this.http.post(`/app/${appImageId}/images`, formData);
  }

  getappImage(appImageId: string) {
    const httpParams = new HttpParams().set('maxHeight', '150');
    return this.http.skipErrorHandler().get(`/app/${appImageId}/images`, { params: httpParams, responseType: 'text'});
  }

}
