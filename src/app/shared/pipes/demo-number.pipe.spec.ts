import { DemoNumberPipe } from './demo-number.pipe';

describe('DemoNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new DemoNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
