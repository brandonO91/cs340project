module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPurchases(res, mysql, context, complete){
        mysql.pool.query("SELECT p.fname, p.lname, i.itemName FROM `playerItemPurchases` pip LEFT JOIN players p ON p.playerID = pip.playerID LEFT JOIN itemShops i ON i.itemID = pip.itemID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.getPurchases = results;
            complete();
        });
    }

    function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT playerID, fname, lname, vbucks FROM players", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.getPlayers = results;
            complete();
        });
    }

    function getItems(res, mysql, context, complete){
        mysql.pool.query("SELECT itemID, itemName, itemDescription, vBuckCost FROM itemShops", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.getItems = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPurchases(res, mysql, context, complete);
        getPlayers(res, mysql, context, complete);
        getItems(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('playerItemPurchases', context);
            }

        }
    });

    /* Adds a purchase, redirects to the playerItemPurchases page after adding */

    router.post('/', function(req, res){
        console.log(req.body.playerID)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO playerItemPurchases (playerID, itemID) VALUES (?,?)";
        var inserts = [req.body.playerID, req.body.itemID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/playerItemPurchases');
            }
        });
    });

    return router;
}();
