const controller = {};
/**FUNCION LISTAR PACIENTES */
controller.list = (req, res) => {
    req.getConnection((err, conn) => { // Utiliza la flecha (=>) en lugar de igual (=)
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            //console.log(customers); // Aquí deberías imprimir el resultado de la consulta
            res.render('customers', {
                data:customers // Pasa los resultados de la consulta a la vista.ver costumrs.ejs
            });
        });
    });
};

/**FUNCION GUARDAR FICHA */
controller.save=(req, res)=>{
    const data=req.body;
    console.log(req.body);

    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO customer set ?', [data], (err, rows)=>{
            res.redirect('/')
        })/**el ? le dice que vamos a ingresar datos a un array, se hace asi para evitar sql-injection */
    })
}

/**FUNCION ACTUALIZAR FICHA */
controller.update=(req, res)=>{
    
}

/**FUNCION BORRAR FICHA */
controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }

        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error deleting record');
            }

            res.redirect('/');
        });
    });
};



module.exports = controller;
