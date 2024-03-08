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
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }

        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customers) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error deleting record');
            }

            res.render('customers_edit.ejs', {
                data:customers[0],
            });
        });
    });
}

controller.updatePost = (req, res) => {
    const { id } = req.params;
    const { name, address, phone } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }

        conn.query('UPDATE customer SET name = ?, address = ?, phone = ? WHERE id = ?', [name, address, phone, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error updating customer');
            }

            // Redireccionar a la página principal después de la actualización
            res.redirect('/');
        });
    });
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
