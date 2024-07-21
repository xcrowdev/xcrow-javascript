import { Xcrow } from '../src';

describe('test', () => {
  it('should work', () => {
    const xcrow = new Xcrow({
      apiKey: 'test',
      applicationId: 'test',
    });
    console.log(xcrow);
    expect(true).toBe(true);
  });
});
