const expect = require('chai').expect;

const {
  generateMessage,
  generateLocationMessage
} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'moe';
    const text = 'hello';
    const message = generateMessage(from, text);

    expect(message).to.include({ from, text });
    expect(message.createdAt).to.be.a('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location message object', () => {
    const from = 'moe';
    const latitude = 1;
    const longitude = 2;
    const url = 'https://www.google.com/maps?q=1,2';
    const message = generateLocationMessage(from, latitude, longitude);

    expect(message).to.include({ from, url });
    expect(message.createdAt).to.be.a('number');
  });
});
