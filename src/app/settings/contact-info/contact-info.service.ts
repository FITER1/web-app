import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  constructor(private http: HttpClient) { }

    
    /**
     * Create contact info.
     * @param info Contact info
     */
    createContactInfo(info: any): Observable<any> {
      return this.http.post('/contactinfo', info);
    }

    /**
     * Get contact info.
     * @param infoId Contact info id
     */
    getContactInfo(): Observable<any> {
      return this.http.get('/contactinfo');
    }


    /**
     * Delete contact info.
     */
    deleteContactInfo(): Observable<any> {
      return this.http.delete('/contactinfo');
    }
}
