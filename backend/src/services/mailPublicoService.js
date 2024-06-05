const nodemailer = require("nodemailer")
const pdf = require('html-pdf')
const { config } = require('../config/config')

const sendMail = async(body)=>{
    try{
        const mail = {
          from: body.gmail,
          to: config.smtpEmail,
          subject: 'Solicitud de información',
          html:`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                  href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700;900&display=swap"
                  rel="stylesheet"
                />
                <title>SOLICITUD DE INFORMACIÓN</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;;
                    line-height: 1.5;
                    color: #333;
                    margin: 0;
                    padding: 0;
                  }
    
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                  }
    
                  .header {
                    background-color: #FF4C00;
                    padding: 5px;
                    text-align: center;
                  }
    
                  .header h1 {
                    color: #fff;
                    font-size: medium;
                    margin: 0;
                  }
    
                  .invoice-details {
                    margin-top: 20px;
                  }
    
                  .invoice-details p {
                    margin: 0;
                  }
    
                  .logo {
                    text-align: right;
                  }
    
                  .logo img {
                    max-width: 200px;
                  }
    
                  .invoice-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                  }
    
                  .invoice-table th,
                  .invoice-table td {
                    padding: 10px;
                    border: 1px solid #ccc;
                    text-align: center;
                  }
    
                  .invoice-table th {
                    background-color: #f1f1f1;
                  }
    
                  .warning {
                    text-align: center;
                    margin-top: 20px;
                  }
    
                  .warning p {
                    margin: 0;
                  }
    
                  .att {
                    text-align: center;
                    margin-top: 20px;
                  }
    
                  .att p {
                    margin: 0;
                  }
    
                  .att a {
                    text-decoration: none;
                  }
    
                  .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #888;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>¡SE HA GENERADO UNA NUEVA SOLICITUD DE INFORMACIÓN!</h1>
                  </div>
    
                  <div class="invoice-details">
                    <table width="100%">
                      <tr>
                        <td>
                          <p><strong>INFORMACION PERSONAL DEL SOLICITANTE:</strong></p>
                          <br/>
                          <p><strong>Nombre: ${body.nombre}</strong></p>
                          <p><strong>Ceular: ${body.celular}</strong></p>
                          <p><strong>Correo Electrónico: ${body.gmail}</strong></p>
                          <p><strong>Mensaje: ${body.mensaje}</strong></p>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="footer">
                    <p><u>Aviso Legal</u></p>
                    <p>
                      SU CORREO LO TENEMOS REGISTRADO DENTRO DE NUESTRA BASE DE
                      DATOS COMO CORREO/CONTACTO (DATO PÚBLICO), POR LO TANTO,
                      SI NO DESEA SEGUIR RECIBIENDO INFORMACIÓN DE NUESTRA EMPRESA, LE
                      AGRADECEMOS NOS INFORME AL RESPECTO.</p>
                     <p> El contenido de este mensaje de
                      correo electrónico y todos los archivos adjuntos a éste contienen
                      información de carácter confidencial y/o uso privativo de ONCAA
                      BOX y de sus destinatarios. Si usted recibió este mensaje
                      por error, por favor elimínelo y comuníquese con el remitente para
                      informarle de este hecho, absteniéndose de divulgar o hacer cualquier
                      copia de la información ahí contenida, gracias. En caso contrario
                      podrá ser objeto de sanciones legales conforme a la ley 1273 de 2009.
                    </p>
                  </div>
                </div>
              </body>
            </html>
            `,
        }
      
        const transporter = nodemailer.createTransport({
            host: config.smtpHost,
            port: config.smtpPort,
            secure: true,
            service: 'gmail',
            tls: {
              rejectUnauthorized: false
            },
            auth: {
                user: config.smtpEmail,
                pass: config.smtpPassword
            }
        })
        
        if(!transporter) throw new Error('Error al conectar con el servidor de correo')
        
        const info = await transporter.sendMail(mail)
        
        return info
      }catch (error) {
        console.error('Error al solicitar recuperación de contraseña:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
}

module.exports = {
    sendMail,
}