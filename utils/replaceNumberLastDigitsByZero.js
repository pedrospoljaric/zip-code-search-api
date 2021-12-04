const replaceNumberLastDigitsByZero = (number, numberOfDigits = 0) => {
    if (!Number(number)) return NaN
    if (!Number(numberOfDigits)) return number
    if (numberOfDigits <= 0) return number
    if (number < 0) return -replaceNumberLastDigitsByZero(-number, numberOfDigits)
    return Math.floor(number / (10 ** numberOfDigits)) * (10 ** numberOfDigits)
}

module.exports = replaceNumberLastDigitsByZero
