const frete = require('frete')
const { prop } = require('lodash/fp')
const { customError } = require('../../utils')

module.exports = async (sourceZipCode, destinationZipCode) => {
    try {
        const response = await frete({
            cepOrigem: sourceZipCode,
            cepDestino: destinationZipCode,
            servico: frete.servicos.sedex,
            peso: 1,
            formato: frete.formatos.caixaPacote,
            comprimento: 16,
            altura: 2,
            largura: 11,
            diametro: 1,
            maoPropria: frete.maoPropria.nao,
            valorDeclarado: 50,
            avisoRecebimento: frete.avisoRecebimento.sim
        }).precoPrazo()

        return {
            shippingFee: Number((prop('0.valor', response) || '').replace(',', '.')),
            deliveryTime: Number(prop('0.prazoEntrega', response))
        }
    } catch (err) {
        throw customError('Could not retrieve shipping price and delivery time', 503)
    }
}
