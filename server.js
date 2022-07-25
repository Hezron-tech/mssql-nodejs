var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'Hezzy3689!',
        server: 'localhost', 
        database: 'BikeStores' ,
    
        pool: {
    
            max: 10,
    
            min: 0,
    
            idleTimeoutMillis: 30000
    
        },
    
        options: {
    
            encrypt: true,
    
            trustServerCertificate: true
    
        }
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from sales.orders', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});