const express=require('express')
const app=express()
const path=require('path')
const morgan=require('morgan')
const mysql=require('mysql')
const myConnection=require('express-myconnection')
const customerRoutes=require('./routes/customer')

/**************************************************************/

app.listen(3000, ()=>{
    console.log('server onboard 3000')
})

/**configuracion*/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**middlewares: son funciones que se ejecutan antes de que vengan las peticiones o rutas del servidor, por ejemplo "/" */
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

/**conectar a mysql */
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'kayascodelario24',
    port: 3306,
    database: 'crudNodeMySql',
    insecureAuth: true
}, 'single'));

/**routes */
app.use('/', customerRoutes);
app.use(express.static(path.join(__dirname, 'public')));