module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getItems(res, mysql, context, complete){
        mysql.pool.query("SELECT playerID, health, medKit, shield, shieldPotion, shotgun, shotgunAmmo, rifelAmmo, xpPoints FROM playerInventories", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.playerInventories = results;
            complete();
        });
    }

    function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT playerID as id, fname, lname FROM players", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.getPlayers = results;
            complete();
        });
    }

//  -----  RENDERING PAGE WITH AUTO FILL  -----

    // router.get('/', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     var mysql = req.app.get('mysql');
    //     getItems(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 1){
    //             res.render('playerInventories', context);
    //         }

    //     }
    // });


//  -----  ROUTER TO RENDER PAGE WITH FORM TO ADD AND FORM TO REQUEST  -----

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        // getItems(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
        res.render('playerInventories', context);
            }
        }
    });

    router.post('/', function(req, res){
        console.log(req.body.fname)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO playerInventories () VALUES (?)";
        var inserts = [req.body.fname, req.body.lname, req.body.vbucks, req.body.level, req.body.teamID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/playerInvetories');
            }
        });
    });

    return router;
}();


