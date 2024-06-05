const express = require('express');
const multer = require('multer');;
const ClienteService = require("../../services/clienteServide");
const SuscripcionService = require("../../services/suscripcionService");
const bodyParser = require('body-parser');
const Jimp = require('jimp');

const router = express.Router();

const upload = multer();
router.post('/huella',upload.fields([
    { name: 'base64Image' }/* ,
    { name: 'blobImage' }, */
  ]),async (req, res) => {
    const  base64Fingerprint  = req.body.base64Image;
    /* if (!base64Fingerprint) {
      return res.status(400).send('No fingerprint data provided.');
    } */
    try {
      /* console.log(base64Fingerprint) */
      // Convertir la huella dactilar de base64 a un buffer
      const base64Data = base64Fingerprint.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      /* console.log(buffer) */
      const uploadedImage = await Jimp.read(buffer);
      /* console.log(uploadedImage) */
      const uploadedImageHash = await uploadedImage.hash();
      console.log(uploadedImageHash)
  
      // Obtener todas las huellas de la base de datos
      const result = await ClienteService.findHuella()/* query('SELECT imagen FROM huellas') */;
      /* console.log(result) */
      const fingerprints = result;
      /* console.log(fingerprints) */
  
      let matchFound = false;
      let matchId = null;
      let Client = null;
      for (let fingerprint of fingerprints) {
        /* console.log(fingerprint.nombre) */
            const db = fingerprint.base64Image;
            const base64Data = db.split(',')[1];
            const buffer = Buffer.from(base64Data,'base64')
            const dbImage = await Jimp.read(buffer);
            const dbImageHash = await dbImage.hash();
            console.log(`${dbImageHash} - ${fingerprint.nombre}`)
            let matchCount = 0;

            for (let i = 0; i < 8; i++) {
              if (uploadedImageHash[i] === dbImageHash[i]) {
                matchCount++;
              }
            }

            if (matchCount >= 7) {
              matchFound = true;
              Client = fingerprint;
              matchId = fingerprint.nombre;
              /* break; */
            }
      }

      console.log(`${matchFound} - ${matchId}`)
      /* console.log(Client) */
      if (matchFound) {
        res.status(201).json(Client)
        return Client
      }else{
        res.status(500).send({error:'Error processing fingerprints'});
      }
    } catch (err) {
      console.error('Error processing fingerprints:', err);
      res.status(500).send('Error processing fingerprints');
    }
  })
  
  module.exports=router