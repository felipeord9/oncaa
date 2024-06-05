const express = require('express')
const UserRoutes = require('./userRoutes')
const MailRoutes = require('./mailRoutes')
const AuthRoutes = require('./authRoutes')
const ClienteController = require('./clienteRoutes')
const SuscripcionController = require('./suscripcionRoutes')
const EmpleadoController = require('./empleadosRoutes')
const HorariosController = require('./horariosRoutes')
const sendMailController = require('./mailPublicoRoutes')
const ImagesController = require('./imagesRoutes')
const bodyParser = require('body-parser');
const CompareController = require('./compareRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/mail', MailRoutes)
    router.use('/clientes',ClienteController)
    router.use('/suscripcion',SuscripcionController)
    router.use('/empleados',EmpleadoController)
    router.use('/horarios',HorariosController)
    router.use('/publico',sendMailController)
    router.use('/upload',ImagesController)
    router.use('/compare',CompareController)
}

module.exports = routerApi