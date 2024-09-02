const express = require ('express')
const expHandleBars = require ('express-handlebars')
const connection = require ('./db/connection')

const User = require ('./models/UserModel')
const Address = require ('./models/AddressModel')

const app = express()

app.engine ('handlebars', expHandleBars.engine())
app.set ('view engine', 'handlebars')

app.use (express.static ('public'))
app.use (express.urlencoded ({ extended: true }))
app.use (express.json())

app.get ('/', async (requisition, response) => {
    const users = await User.findAll ({ raw: true })

    response.render ('home', { users: users })
})

app.get ('/users/create', (requisition, response) => {
    response.render ('adduser')
})

app.post ('/users/create', async (requisition, response) => {
    const name = requisition.body.name
    const occupation = requisition.body.occupation
    let newsletter = requisition.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    console.log ('Dados recebidos:', requisition.body)
    console.log ('Tipos de dados:', {
        name: typeof name,
        occupation: typeof occupation,
        newsletter: typeof newsletter
    })

    try {
        await User.create ({ name, occupation, newsletter })
        response.redirect ('/')
    } catch (error) {
        console.error ('Erro ao criar usuário:', error)
        response.status (400).send ('Erro ao criar usuário: ' + error.message)
    }
})

app.get ('/users/:id', async (requisition, response) => {
    const id = requisition.params.id

    const user = await User.findOne ({ raw: true, where: { id: id } })
        
    response.render ('userview', { user })
})

app.post ('/users/delete/:id', async (requisition, response) => {
    const id = requisition.params.id

    await User.destroy ({ where: { id: id } })

    response.redirect ('/')
})

app.get ('/users/edit/:id', async (requisition, response) => {
    const id = requisition.params.id

    try {
        const user = await User.findOne ({ include: Address, where: { id: id } })

        response.render ('useredit', { user: user.get ({ plain: true }) })
    } catch (error) {
        console.log (error)
    }
})

app.post ('/users/update', async (requisition, response) => {
    const id = requisition.body.id
    const name = requisition.body.name
    const occupation = requisition.body.occupation
    let newsletter = requisition.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {
        id, name, occupation, newsletter
    }

    await User.update (userData, { where: { id: id } })

    response.redirect ('/')
})

app.post ('/address/create', async (requisition, response) => {
    const UserId = requisition.body.UserId
    const street = requisition.body.street
    const number = requisition.body.number
    const city = requisition.body.city

    const address = {
        UserId, street, number, city
    }

    await Address.create (address)

    response.redirect (`/users/edit/${UserId}`)
})

app.post ('/address/delete', async (requisition, response) => {
    const UserId = requisition.body.UserId
    const id = requisition.body.id
    
    await Address.destroy ({ where: { id: id } })
    
    response.redirect (`/users/edit/${UserId}`)
})

connection
    .sync()
    // .sync ({ force: true })
    .then(() => {
        app.listen (3000)
    })
    .catch (error => console.log (error))