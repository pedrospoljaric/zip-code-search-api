const replaceNumberLastDigitsByZero = require('../../../utils/replaceNumberLastDigitsByZero')

it('Should replace digits if correct input is provided', () => {
    expect(replaceNumberLastDigitsByZero(12222222, 1)).toBe(12222220)
    expect(replaceNumberLastDigitsByZero(12222222, 2)).toBe(12222200)
    expect(replaceNumberLastDigitsByZero(12222222, 3)).toBe(12222000)
    expect(replaceNumberLastDigitsByZero(12222222, 4)).toBe(12220000)
    expect(replaceNumberLastDigitsByZero(12222222, 5)).toBe(12200000)
    expect(replaceNumberLastDigitsByZero(12222222, 6)).toBe(12000000)
    expect(replaceNumberLastDigitsByZero(12222222, 7)).toBe(10000000)
})

it('Should return 0 if all digits or more are replaced by 0', () => {
    expect(replaceNumberLastDigitsByZero(12222222, 8)).toBe(0)
    expect(replaceNumberLastDigitsByZero(12222222, 9)).toBe(0)
    expect(replaceNumberLastDigitsByZero(12222222, 9)).toBe(0)
})

it('Should ignore decimals', () => {
    expect(replaceNumberLastDigitsByZero(12222222.12345, 1)).toBe(12222220)
    expect(replaceNumberLastDigitsByZero(12222222.12345, 2)).toBe(12222200)
    expect(replaceNumberLastDigitsByZero(12222222.12345, 3)).toBe(12222000)
})

it('Should deal with negative numbers', () => {
    expect(replaceNumberLastDigitsByZero(-12222222, 1)).toBe(-12222220)
    expect(replaceNumberLastDigitsByZero(-12222222, 2)).toBe(-12222200)
    expect(replaceNumberLastDigitsByZero(-12222222, 3)).toBe(-12222000)
    expect(replaceNumberLastDigitsByZero(-12222222.12345, 3)).toBe(-12222000)
})

it('Should return the raw number if 0 digits or less are replaced by 0', () => {
    expect(replaceNumberLastDigitsByZero(12222222, 0)).toBe(12222222)
    expect(replaceNumberLastDigitsByZero(12222222, -1)).toBe(12222222)
    expect(replaceNumberLastDigitsByZero(12222222, -2)).toBe(12222222)
})

it('Should return the raw number if numberOfDigits is not number-like', () => {
    expect(replaceNumberLastDigitsByZero(12222222, 'x')).toBe(12222222)
    expect(replaceNumberLastDigitsByZero(12222222, { x: 1 })).toBe(12222222)
    expect(replaceNumberLastDigitsByZero(12222222, null)).toBe(12222222)
    expect(replaceNumberLastDigitsByZero(12222222, undefined)).toBe(12222222)
})

it('Should return NaN if number is not number-like', () => {
    expect(replaceNumberLastDigitsByZero('x', 0)).toBe(NaN)
    expect(replaceNumberLastDigitsByZero({ x: 1 }, 2)).toBe(NaN)
    expect(replaceNumberLastDigitsByZero(null, -2)).toBe(NaN)
    expect(replaceNumberLastDigitsByZero(undefined, 'x')).toBe(NaN)
})
