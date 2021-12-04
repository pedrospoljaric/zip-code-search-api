const customError = require('../../../utils/customError')

it('Should use the message and status code provided', () => {
    const error = customError('Custom message', 404)
    expect(error).toBeInstanceOf(Error)
    expect(error).toHaveProperty('message')
    expect(error).toHaveProperty('status')
    expect(error.message).toBe('Custom message')
    expect(error.status).toBe(404)
})

it('Should use the status code 500 if none is provided', () => {
    const error = customError('Custom message')
    expect(error).toBeInstanceOf(Error)
    expect(error).toHaveProperty('message')
    expect(error).toHaveProperty('status')
    expect(error.message).toBe('Custom message')
    expect(error.status).toBe(500)
})

it('Should have an empty message if no message is provided', () => {
    const error = customError()
    expect(error).toBeInstanceOf(Error)
    expect(error).toHaveProperty('message')
    expect(error).toHaveProperty('status')
    expect(error.message).toBe('')
    expect(error.status).toBe(500)
})
