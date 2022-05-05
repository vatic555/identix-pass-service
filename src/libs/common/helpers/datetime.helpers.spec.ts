import { formatDatetime, datesDiffInDays, datesRange,
  validateGoogleAnalyticsDate } from "./datetime.helpers";

describe('formatDatetime helper', () => {
  it('18925 => \'5 h 15 min 25.00 sec\'', () => {
    expect(formatDatetime(18925)).toBe('5 h 15 min 25.00 sec')
  });

  it('1518 => \'25 min 18.00 sec\'', () => {
    expect(formatDatetime(1518)).toBe('25 min 18.00 sec')
  });

  it('37 => \'37.00 sec\'', () => {
    expect(formatDatetime(37)).toBe('37.00 sec')
  });
});

describe('datesDiffInDays helper', () => {
   it('should return correct difference for two correct dates', () => {
     const startDate = '2021-04-03T00:00:00.000Z';
     const endDate = '2021-05-05T23:23:59.000Z';

     const diffDates = datesDiffInDays(startDate, endDate);
     expect(diffDates).toBe(32);
   });

   it('should throw exception id dates are incorrect', () => {
     const startDate = 'incorrect date';
     const endDate = '2021-05-05T23:23:59.000Z';

     try {
       datesDiffInDays(startDate, endDate);
     } catch(e) {
       expect(e).toBeDefined();
     }
   })
});


describe('datesRange helper', () => {
  it('should return correct range dates', () => {
    const startDate = '2021-06-25';
    const endDate = '2021-07-02';

    const datesRangeResult = datesRange(startDate, endDate);
    const datesRangeResultShouldBe = ['2021-06-25', '2021-06-26', '2021-06-27',
      '2021-06-28', '2021-06-29', '2021-06-30', '2021-07-01', '2021-07-02'];

    expect(datesRangeResult).toMatchObject(datesRangeResultShouldBe);
  });

  it('should return correct range dates', () => {
    const startDate = '2020-12-28';
    const endDate = '2021-01-03';

    const datesRangeResult = datesRange(startDate, endDate);
    const datesRangeResultShouldBe = ['2020-12-28', '2020-12-29', '2020-12-30',
      '2020-12-31', '2021-01-01', '2021-01-02', '2021-01-03'];

    expect(datesRangeResult).toMatchObject(datesRangeResultShouldBe);
  });

  it('should return correct range dates', () => {
    const startDate = '2020-02-25';
    const endDate = '2020-03-03';

    const datesRangeResult = datesRange(startDate, endDate);
    const datesRangeResultShouldBe = ['2020-02-25', '2020-02-26', '2020-02-27',
      '2020-02-28', '2020-02-29', '2020-03-01', '2020-03-02', '2020-03-03'];

    expect(datesRangeResult).toMatchObject(datesRangeResultShouldBe);
  });
});


describe('validateGoogleAnalyticsDate helper', () => {
  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('aswewe')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('1234567')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('aa022021')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('00022021')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('35022021')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('02bb2021')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('02002021')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('02152021')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('0203cccc')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('02031000')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('02033000')).toBeFalsy();
  });

  it('should return correct validation od date', () => {
    expect(validateGoogleAnalyticsDate('02032021')).toBeTruthy();
  });
});