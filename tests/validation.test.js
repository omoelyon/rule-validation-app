const verify = require('../index')

console.log(verify)

describe('verifyType',()=>{
    it('should return true with objects',()=>{
        const result = verify.verifyFieldType({});
        expect(result).toBe(true);
    })
})