import { Injectable } from '@angular/core';

interface ITime {
    militaryTime: string,
    enTime: string,
};

@Injectable({
  providedIn: 'root',
})
export class LookupDataService {
  
  constructor() {

  }

  generate30MinuteIntervalTimes(): ITime[] {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Start at midnight

    return [...Array(48).keys()].map( i => {
      const date = new Date(startOfDay.getTime() + i * 30 * 60000); // Add i * 30 minutes in milliseconds
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // Format hours and minutes to ensure double digits (e.g., 00:00, not 0:0)
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      const formatter = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
      });
      return {
          militaryTime: formattedTime,
          enTime: formatter.format(date),
      };
    });
  }

}
