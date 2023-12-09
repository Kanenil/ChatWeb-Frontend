import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {}

  getFileDetails(fileName: string): Observable<{ size: number, isImage: boolean, path: string }> {
    return this.http.get(`${environment.imageUrl}${fileName}`, { responseType: 'blob', observe: 'response' })
      .pipe(map(response => {
        // @ts-ignore
        const contentLength = +response.headers.get('Content-Length');
        const contentType = response.headers.get('Content-Type');
        // @ts-ignore
        const isImage = contentType.startsWith('image/');

        // @ts-ignore
        const url = window.URL.createObjectURL(response.body);

        return { size: contentLength, isImage, path: url };
      }));
  }
}
