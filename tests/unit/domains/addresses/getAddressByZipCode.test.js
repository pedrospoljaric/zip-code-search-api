jest.resetModules()
jest.doMock('../../../../models/addresses/findAddressByZipCode', () => () => (zipCode) => {
    if (zipCode === 12210130) {
        return {
            zip_code: 12210130,
            location: 'Av. Dr. João Guilhermino',
            district: 'Centro',
            city: 'São José dos Campos',
            state: 'São Paulo'
        }
    }
    return null
})

const getAddressByZipCode = require('../../../../domains/addresses/getAddressByZipCode')

it('Should return the address if an existing zip code is provided', async () => {
    expect(await getAddressByZipCode({ zipCode: 12210130 })).toMatchObject({
        address: {
            zip_code: 12210130,
            location: 'Av. Dr. João Guilhermino',
            district: 'Centro',
            city: 'São José dos Campos',
            state: 'São Paulo'
        }
    })
})

it('Should return the address if the zip code provided becomes valid after the replacement by zeros', async () => {
    expect(await getAddressByZipCode({ zipCode: 12210133 })).toMatchObject({
        address: {
            zip_code: 12210130,
            location: 'Av. Dr. João Guilhermino',
            district: 'Centro',
            city: 'São José dos Campos',
            state: 'São Paulo'
        }
    })
})

it('Should throw error if no zip code is provided', async () => {
    await expect(getAddressByZipCode()).rejects.toThrow('Invalid zip code')
})

it('Should throw error if the zip code provided is not a number', async () => {
    await expect(getAddressByZipCode({ zipCode: 'xxx' })).rejects.toThrow('Invalid zip code')
    await expect(getAddressByZipCode({ zipCode: null })).rejects.toThrow('Invalid zip code')
    await expect(getAddressByZipCode({ zipCode: { x: 1 } })).rejects.toThrow('Invalid zip code')
})

it('Should throw error if the zip code provided cannot be found', async () => {
    await expect(getAddressByZipCode({ zipCode: 12210144 })).rejects.toThrow('Address of zip code 12210144 not found')
})
