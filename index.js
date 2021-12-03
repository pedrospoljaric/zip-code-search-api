require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`)
})
