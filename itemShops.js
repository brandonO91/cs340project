module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getItems(res, mysql, context, complete){
        mysql.pool.query("SELECT itemID, itemName, itemDescription, vBuckCost FROM itemShops", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.itemShops = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getItems(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('itemShops', context);
            }

        }
    });

    /* Adds an item, redirects to the items page after adding */

    router.post('/', function(req, res){
        console.log(req.body.itemID)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO itemShops (itemName, itemDescription, vBuckCost) VALUES (?,?,?)";
        var inserts = [req.body.itemName, req.body.itemDescription, req.body.vBuckCost];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/itemShops');
            }
        });
    });

    return router;
}();
