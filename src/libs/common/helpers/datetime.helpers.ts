/**
 * Formats datetime in second to '<HH> h <mm> min <ss> sec' format
 *
 * @param datetimeInSeconds
 */
export function formatDatetime(datetimeInSeconds: number): string {
  if (!datetimeInSeconds) {
    return '';
  }

  let leftHours = 0;
  let leftHoursString = '';
  if (datetimeInSeconds > 3600) {
    leftHours = Math.trunc(datetimeInSeconds / 3600);
    leftHoursString = `${leftHours} h`;
  }

  let leftMinutes = 0;
  let leftMinutesString = '';
  if (datetimeInSeconds - leftHours * 3600 > 60) {
    leftMinutes = Math.trunc((datetimeInSeconds - leftHours * 3600) / 60 );
    leftMinutesString = ` ${leftMinutes} min`;
  }

  const leftSecondsString =
    ` ${(datetimeInSeconds - leftHours * 3600 - leftMinutes * 60).toFixed(2)} sec`;

  return `${leftHoursString}${leftMinutesString}${leftSecondsString}`.trim();
}

/**
 * Returns the dates difference in days for two dates as strings
 *
 * @param startDate
 * @param endDate
 */
export function datesDiffInDays(startDate: string, endDate: string): number|undefined {
  const startDateTime = (new Date(startDate)).getTime();
  const endDateTime = (new Date(endDate)).getTime();

  if (isNaN(startDateTime) || isNaN(endDateTime)) {
    throw new Error('Incorrect dates for getting dates difference');
    return;
  }

  return parseInt(String((endDateTime - startDateTime)/(24*3600*1000)), 10);
}

/**
 * Returns the Timestamp of the start day for date in short ISO format: YYYY-mm-dd
 *
 * @param shortISODate
 */
export function timestampStartISODate(shortISODate: string): number {
  const { year, month, day } = parseAndCheckShortISODate(shortISODate);
  return (new Date(year, month - 1, day, 0, 0,0, 0)).getTime();
}


/**
 * Returns the Timestamp of the start day for date in short ISO format: YYYY-mm-dd
 *
 * @param shortISODate
 */
export function timestampEndShortISODate(shortISODate: string): number {
  const { year, month, day } = parseAndCheckShortISODate(shortISODate);
  return (new Date(year, month - 1, day, 23, 59,59, 999)).getTime();
}

/**
 * Returns the Start Day Date from short ISO format date string: YYYY-mm-dd
 *
 * @param shortISODate
 */
export function startDayDateFromShortISODate(shortISODate: string): Date {
  const { year, month, day } = parseAndCheckShortISODate(shortISODate);
  return new Date(year, month - 1, day, 0, 0,0, 0);
}

/**
 * Returns the End Day Date from short ISO format date string: YYYY-mm-dd
 *
 * @param shortISODate
 */
export function endDayDateFromShortISODate(shortISODate: string): Date {
  const { year, month, day } = parseAndCheckShortISODate(shortISODate);
  return new Date(year, month - 1, day, 23, 59,59, 999);
}

/**
 * Returns the Range of Short ISO dates for startDate and endDate in ISO date format
 *
 * @param startDate
 * @param endDate
 */
export function datesRange(startDate: string, endDate: string): string[] {
  const timestampStartDate = timestampEndShortISODate(startDate);
  const timestampEndDate = timestampEndShortISODate(endDate);

  let timestampCurrentDate = timestampStartDate + 24*3600*1000;
  const datesRange = [startDate];
  do {
    const currentDate = (new Date(timestampCurrentDate))
      .toISOString()
      .split('T')
      .shift();

    datesRange.push(currentDate);

    timestampCurrentDate += 24*3600*1000;
  } while (timestampCurrentDate < timestampEndDate)

  datesRange.push(endDate);

  return datesRange;
}

export function parseAndCheckShortISODate(shortISODate: string): {year, month, day} {
  const [year, month, day] = shortISODate.split('-').map(item => parseInt(item, 10));

  if (!year || !Number.isInteger(year) || year < 1970 || year > 2050) {
    throw new Error(`Incorrect year in ISO date: ${shortISODate}`);
  }

  if (!month || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Incorrect month in ISO date: ${shortISODate}`);
  }

  if (!day || !Number.isInteger(day) || day < 1 || day > 31) {
    throw new Error(`Incorrect day in ISO date: ${shortISODate}`);
  }

  return { year, month, day };
}

/**
 * Validates string date in format ddmmYYYY, e.g. '01022021'
 *
 * @param date
 */
export function validateGoogleAnalyticsDate(date: string): boolean {
  if (date.length != 8) {
    return false;
  }

  const day = parseInt(date.slice(0, 2), 10);
  if ( isNaN(day) || day < 1 || day > 31 ) {
    return false;
  }

  const month = parseInt(date.slice(2, 4), 10);
  if ( isNaN(month) || month < 1 || month > 12 ) {
    return false;
  }

  const year = parseInt(date.slice(4, 8), 10);
  if ( isNaN(year) || year < 1970 || year > 2100 ) {
    return false;
  }

  return true;
}

export function dateNumDaysBefore(numDays: number):
    { today: string, numDaysBeforeDate: string }  {
  const todayShortISODate = (new Date()).toISOString().split('T').shift();
  const timestampStartNowDay = timestampStartISODate(todayShortISODate);
  const timestampNumDaysBefore = timestampStartNowDay - numDays * 24 * 3600 * 1000;
  const numDaysBeforeDateShortISODate =
    (new Date(timestampNumDaysBefore)).toISOString().split('T').shift();

  return {
    today: todayShortISODate,
    numDaysBeforeDate: numDaysBeforeDateShortISODate
  }
}

export function toISOStringWithTimezone(date: Date): string {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
}
