const utils = require('./utils');

describe('luhnCheck', () => {
    test('valid card number', () => {
        const result = utils.luhnCheck('4111111111111111');
        expect(result).toBe(true);
    });

    test('invalid card number', () => {
        const result = utils.luhnCheck('4111111111111112');
        expect(result).toBe(false);
    });
});
