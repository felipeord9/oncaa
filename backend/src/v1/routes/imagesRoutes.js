const express = require('express');
const multer = require('multer');;
const ClienteService = require("../../services/clienteServide");
const SuscripcionService = require("../../services/suscripcionService");
const bodyParser = require('body-parser');
const Jimp = require('jimp');

const router = express.Router();

const upload = multer();
router.post('/:id', upload.fields([
  { name: 'base64Image' },
  { name: 'blobImage' },
]), async (req, res) => {
    /* const folderName = req.body.folderName; */
    try{
        const base64Image = req.body.base64Image/* req.files['base64Image'] */;
        const blobImage = req.files['blobImage']/* [0].buffer */;
        const {params:{id}} = req
        console.log(id)
        console.log(base64Image)
        console.log(blobImage)
        const cliente = await ClienteService.findOne(id)
        const updatedB64 = await cliente.update({
          base64Image:base64Image,
          blobImage: blobImage
        })

        res.status(201).json({
          message: 'Updated',
          updatedB64
        })
        return updatedB64
        /* const { body } = req.body */
        /* const {
          fechaInicio,
          fechaFinaliza,
          tipo,
          diasFaltantes,
          estado,
          valor,
          createdAt,
          rowId,
          nombre,
          correo,
          telefono,
          fechaNacimiento,
          sexo,
          centroSalud,
          medicamentos,
          observaciones,
        } = req.body */
        /* console.log(req.body)
        const suscripcion = await SuscripcionService.create({
            fechaInicio:fechaInicio,
            fechaFinaliza:fechaFinaliza,
            diasFaltantes:diasFaltantes,
            tipo:tipo,
            estado: estado,
            valor:valor,
            createdAt:createdAt,
          })
        console.log('suscripcion creada')
        console.log(body)
          const data = await ClienteService.create({
            rowId:rowId,
            nombre:nombre,
            correo:correo,
            telefono:telefono,
            fechaNacimiento:fechaNacimiento,
            sexo:sexo,
            plan:suscripcion.id,
            centroSalud:centroSalud,
            medicamentos:medicamentos,
            observaciones:observaciones,
            createdAt:createdAt,
            base64Image: base64Image ,
            blobImage: blobImage,
          }) */
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send('Error processing fingerprints');
    }
})

router.post('/compare/huella',async (req, res) => {
  const { base64Fingerprint } = req;
  if (!base64Fingerprint) {
    return res.status(400).send('No fingerprint data provided.');
  }
  try {
    /* console.log(base64Fingerprint) */
    // Convertir la huella dactilar de base64 a un buffer
    const buffer = Buffer.from(base64Fingerprint, 'base64');
    const uploadedImage = await Jimp.read(buffer);
    const uploadedImageHash = await uploadedImage.hash();
    /* console.log(uploadedImageHash) */

    // Obtener todas las huellas de la base de datos
    const result = await ClienteService.find()/* query('SELECT imagen FROM huellas') */;
    /* console.log(result) */
    const fingerprints = result;

    let matchFound = false;
    let Client = null;
    for (let fingerprint of fingerprints) {
      const dbBuffer = fingerprint.base64Image;
      const dbImage = await Jimp.read(dbBuffer);
      const dbImageHash = await dbImage.hash();

      if (uploadedImageHash === dbImageHash) {
        matchFound = true;
        Client = fingerprint
        break;
      }
    }

    if (matchFound) {
      res.send('Match found');
      res.status(201).json({
        message: 'Match',
        Client
      })
      return Client
    } else {
      res.status(500).send('Error processing fingerprints');
      res.send('No match found');
    }
  } catch (err) {
    console.error('Error processing fingerprints:', err);
    res.status(500).send('Error processing fingerprints');
  }
})

module.exports=router