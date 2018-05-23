let express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	morgan = require('morgan'),
	pg = require('pg'),
	cookieParser = require('cookie-parser'),
	cors =require('cors'),
	app = express();


let pool = new pg.Pool({
  host: 'localhost',
  user: 'Team',
  database: 'MediLock',
  password: 'MediLock',
  port: 5432
 })

//cors de express
app.use(cors());

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev')); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*
app.post('/api/usuarioNuevo', function(request, response) {
	pool.connect(function(err, db, done) {
		if (err) {
			return response.status(400).send(err);
		}
		db.query(
			'SELECT correo FROM usuario WHERE correo = '+request.body.correo+' AND password = '+request.body.contrasena ,
            (err, table) => {
				done();
				if (err){
                    console.log(err)
					return response.status(400).send(err);
				}
				console.log('DATA INSERTED');
                console.log(table.rows);
				response.status(201).send(table.rows);
			}
		);
	});
});
*/

app.post('/api/usuarioNuevo', function(request, response) {
	pool.connect(function(err, db, done) {
		if (err) {
			return response.status(400).send(err);
		}/*
		console.log(request.body.id_rol)
        db.query(
			'INSERT INTO medico (especialidad, id_usuario) VALUES ($1, $2)',
			[ 'pediatra', 2],
            (err, table) => {
				done();
				if (err){
					return response.status(400).send(err);
				}
				console.log('DATA INSERTED');
				response.status(201).send({message:'Data inserted!'});
			}
		);*/
		db.query(
			'INSERT INTO usuario (id_rol, nombre, apellido, username, password, correo) VALUES ($1, $2, $3,$4, $5, $6)',
			[ request.body.id_rol, request.body.nombre, request.body.apellido, request.body.username, request.body.contrasena, request.body.correo],
            (err, table) => {
				done();
				if (err){
					return response.status(400).send(err);
				}
				console.log('DATA INSERTED');
				response.status(201).send({message:'Data inserted!'});
			}
		);
	});
});

//Server
app.listen(3000, function(){
	console.log('Iniciar server en el puerto 3000');

});

