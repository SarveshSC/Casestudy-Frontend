import { CustomernamePipe } from './customername.pipe';

describe('CustomernamePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomernamePipe();
    expect(pipe).toBeTruthy();
  });
});
