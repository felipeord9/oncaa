const MailPublicoService = require('../services/mailPublicoService')

const sendMail = async (req, res, next) => {
    try {
      const { body } = req
      console.log(body)
      const data = await MailPublicoService.sendMail(body)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
}
module.exports = {
    sendMail,
}