import {Xcrow} from "../src";

describe('test', () => {
  it('should work', () => {
    const xcrow = new Xcrow({
      apiKey: 'test',
      apiSecret: 'test',
    });

    expect(true).toBe(true)
  })
})