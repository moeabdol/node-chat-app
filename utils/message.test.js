const expect = require('chai').expect;

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'moe';
    const text = 'hello';
    const message = generateMessage(from, text);

    expect(message).to.include({ from, text });
    expect(message.createdAt).to.be.a('number');
  });
});
