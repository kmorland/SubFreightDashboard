import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface IAccessorialData {
    id: number,
    name: string,
    displayName: string,
    type: string | null,
    sort?: number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private accessorialJsonURL = 'data/accessorial-services.json'; // Path relative to the application root
  private accessorialMapData: Map<number, IAccessorialData> = new Map();

  constructor(private http: HttpClient) {
    this.getAccessorialData(null).subscribe({
        next: (response) => {
            response.forEach((value: IAccessorialData) => {
                this.accessorialMapData.set(value.id, value);
            });
        }
    });
  }

  public get accessorialMap() : Map<number, IAccessorialData> {
    return this.accessorialMapData;
  }
  
  public getAccessorialData(pType: string|null): Observable<IAccessorialData[]> {
    return this.http.get<IAccessorialData[]>(this.accessorialJsonURL).pipe(
        map((data: IAccessorialData[]) => data.filter(obj => (pType) ? obj.type === pType : obj) )
    );
  }
}
