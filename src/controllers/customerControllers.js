const controller = {};

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

controller.save=(req, res)=>{
    console.log(req.body);
    res.send('data saving...')
}

module.exports = controller;
