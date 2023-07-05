const { request, response } = require('express');
const connection = require('../conexion');

const getEstudiantes = (req = request, res = response) => {
  const knex = require('knex')(connection);

  knex
    .raw('CALL get_estudiantes()')
    .then(([[estudiantes]]) => res.status(200).json(estudiantes))
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Estudiantes no encontrados',
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

const postEstudiante = async (req = request, res = response) => {
  const knex = require('knex')(connection);

  const nuevoEstudiante = [
    req.body.esNombres,
    req.body.esApellidos,
    req.body.esCorreo,
    req.body.esEdad,
  ];

  console.log(req);
  knex
    .raw(
      'CALL post_estudiante(?,?,?,?,@es_id)',
      nuevoEstudiante
    )
    .then(() => knex.raw('SELECT @es_id'))
    .then(([[result]]) => {
      const id = result['@es_id'];
      return res.status(201).json({
        ok: true,
        msg: `Estudiante registrado exitosamente`,
        id,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Estudiante no registrado',
        info: error.message,
      });
    })
    .finally(() => {
      knex.destroy();
    });
};

module.exports = {
  getEstudiantes,
  postEstudiante,
};
