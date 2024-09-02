const { Sequelize } = require ('sequelize')

const sequelize = new Sequelize ('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
})

// try {
//     sequelize.authenticate()

//     console.log ('Conexão com o banco de dados realizada com sucesso!')
// } catch (error) {
//     console.log ('Não foi possível conectar: ', error)
// }

module.exports = sequelize