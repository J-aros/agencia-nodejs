import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';


dotenv.config({path:"variables.env"});

//Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos Conectada'))
    .catch( error => console.log(error));

        
//Configurar express
const app = express();

//Habilitar PUG
app.set('view engine', 'pug');

//Añadir las vistas
app.set('views', path.join(__dirname, './views'));

//Cargar una carpeta estatica llamada public
app.use(express.static('public'));

//Validar si estamos en desarrollo o produccion
const config = db[app.get('env')];

//Obtener año actual
app.use((req,res, next) => {
    const year = new Date()
    res.locals.actualYear = year.getFullYear();
    res.locals.ruta = req.path;
    return next();
});


//Body Parser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

//Cargar las Rutas
app.use('/', router);

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
});
  



//Creamos la variable para el sitio web
//app.locals.titulo = config.nombreSitio;







