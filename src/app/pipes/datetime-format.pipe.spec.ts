import { DatetimeFormatPipe } from './datetime-format.pipe';

describe('DatetimeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DatetimeFormatPipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
