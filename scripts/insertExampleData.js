const db = require('../database')

const insertExampleData = () => db.transaction(async (trx) => {
    await trx('users').insert({
        username: 'TesteLuizaLabs',
        hashed_password: '$argon2i$v=19$m=4096,t=3,p=1$u4VgvU1m962NzwSkDSXoaw$om8nXumk+Ob0D97QXJIA9sGS9cJbmX0R6DGXZww6lf4' // P@ssw0rd
    })

    await trx('addresses').insert({
        zip_code: 12210130,
        location: 'Av. Dr. João Guilhermino',
        district: 'Centro',
        city: 'São José dos Campos',
        state: 'São Paulo'
    })
})

insertExampleData()
