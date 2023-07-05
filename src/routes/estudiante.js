const { Router } = require('express');
const {
  getEstudiantes,
  postEstudiante,
} = require('../controllers/estudiante');

const router = Router();

router.get("/", getEstudiantes);

router.post('/', postEstudiante);

module.exports = router;
