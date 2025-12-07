// Source - https://stackoverflow.com/a
// Posted by Abdullah
// Retrieved 2025-12-02, License - CC BY-SA 4.0


export function generate30MinuteIntervals() {
  const times = [];
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Start at midnight

  [...Array(48).keys()].map( i => {
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

  /*for (let i = 0; i < 48; i++) { // 48 increments of 30 minutes in 24 hours
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
    const obj = {
        militaryTime: formattedTime,
        enTime: formatter.format(date),
    }
    times.push(obj);
  }
  return times;*/
}
