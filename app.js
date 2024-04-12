const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'BD2Tarea01',
  password: 'admin4',
  port: 5432,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM estudiantes');
    res.render('index', { estudiantes: data.rows });
  } catch (error) {
    console.error('Error al obtener datos de la base de datos', error);
    res.status(500).send('Error al obtener datos de la base de datos');
  }
});

app.post('/estudiantes', async (req, res) => {
  const { nombres, apellidos, codigo, ep } = req.body;
  const query = 'INSERT INTO estudiantes (nombres, apellidos, codigo, ep) VALUES ($1, $2, $3, $4)';
  try {
    await pool.query(query, [nombres, apellidos, codigo, ep]);
    res.redirect('/');
  } catch (error) {
    console.error('Error al insertar estudiante', error);
    res.status(500).send('Error al insertar estudiante');
  }
});

app.post('/estudiantes/:id/eliminar', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM estudiantes WHERE id = $1';
  try {
    await pool.query(query, [id]);
    res.redirect('/');
  } catch (error) {
    console.error('Error al eliminar estudiante', error);
    res.status(500).send('Error al eliminar estudiante');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});

app.post('/estudiantes/:id/editar', async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, codigo, ep } = req.body;
  const query = 'UPDATE estudiantes SET nombres = $1, apellidos = $2, codigo = $3, ep = $4 WHERE id = $5';
  try {
      await pool.query(query, [nombres, apellidos, codigo, ep, id]);
      res.redirect('/');
  } catch (error) {
      console.error('Error al editar estudiante', error);
      res.status(500).send('Error al editar estudiante');
  }
});
