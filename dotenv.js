module.exports = {
    config() {
        if (process.env.PORT) return
        try {
            // eslint-disable-next-line global-require
            require('dotenv').config({ path: `${__dirname}/.env` })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
    }
}
