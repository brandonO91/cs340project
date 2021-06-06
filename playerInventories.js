module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //  ------------  ORIGINAL
    // function getItems(res, mysql, context, complete){
    //     mysql.pool.query("SELECT playerID, health, medKit, shield, shieldPotion, shotgun, shotgunAmmo, rifelAmmo, xpPoints FROM playerInventories", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.playerInventories = results;
    //         complete();
    //     });
    // }

    function getInventories(req, res, mysql, context, complete){
        console.log("searching")
        console.log(req.query);
        if (req.query.playerID != '') {
            value = req.query.playerID;
            value = value + '%';
            req.query.playerID = value;
        }
        var sql = "SELECT players.playerID, players.fname, players.lname, playerInventories.health, playerInventories.medKit, playerInventories.shield, playerInventories.shieldPotion, playerInventories.shotgun, playerInventories.shotgunAmmo, playerInventories.rifle, playerInventories.rifleAmmo, playerInventories.xpPoints  FROM playerInventories INNER JOIN players ON playerInventories.playerID = players.playerID  WHERE players.fname LIKE ? OR health < ? OR medKit < ? OR shield < ? OR shieldPotion < ? OR shotgun < ? OR shotgunAmmo < ? OR rifleAmmo < ? or xpPoints < ?;";
        // var sql = "SELECT players.playerID, players.fname, players.lname, playerInventories.health, playerInventories.medKit, playerInventories.shield, playerInventories.shieldPotion, playerInventories.shotgun, playerInventories.shotgunAmmo, playerInventories.rifle, playerInventories.rifleAmmo, playerInventories.xpPoints  FROM playerInventories INNER JOIN players ON playerInventories.playerID = players.playerID  WHERE ID LIKE ? OR health < ? OR medKit < ? OR shield < ? OR shieldPotion < ? OR shotgun < ? OR shotgunAmmo < ? OR rifleAmmo < ? or xpPoints < ?;";
        var inserts = [req.query.playerID, req.query.health, req.query.medkit, req.query.shield, req.query.shieldPotion, req.query.shotgun, req.query.shotgunAmmo, req.query.rifle, req.query.rifelAmmo, req.query.xpPoints];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log('error in searching')
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results);
            console.log('adding to context');
            context.getInventories = results;
            // console.log(context.getInventories)
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
    //     getPlayers(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
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
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
        res.render('playerInventories', context);
            }
        }
    });

    // seperate router for when putting in request
    router.get('/search', function(req, res){
        console.log(req.query)
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        // var sql = "SELECT * FROM playerInventories WHERE ID LIKE ? OR health < ? OR medKit < ? OR shield < ? OR shieldPotion < ? OR shotgun < ? OR shotgunAmmo < ? OR rifelAmmo < ? or xpPoints < ?;";
        // var inserts = [req.query.playerID, req.query.health, req.query.medKit, req.query.shield, req.query.shieldPotion, req.query.shotgun, req.query.shotgunAmmo, req.query.rifle, req.query.rifelAmmo, req.query.xpPoints];
        getPlayers(res, mysql, context, complete);
        getInventories(req, res, mysql, context, complete)
        console.log("players and inventories returned")
        function complete(){
            callbackCount++;
            if (callbackCount >= 2) {
                console.log('about to render page with context')
                console.log(context.getPlayers)
                console.log(context.getInventories)
                res.render('playerInventories', context)
            }
        }
    })

    router.get('/tinker', function(req, res){
        res.send('create a seperate get router with body params')
    })

    router.post('/', function(req, res){
        console.log("post received")
        console.log(req.body.fname)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO playerInventories (playerID, health, medKit, shield, shieldPotion, shotgun, shotgunAmmo, rifle, rifleAmmo, xpPoints) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var inserts = [req.body.playerID, req.body.health, req.body.medkit, req.body.shield, req.body.shieldPotion, req.body.shotgun, req.body.shotgunAmmo, req.body.rifle, req.body.rifleAmmo, req.body.xpPoints];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/playerInventories');
            }
        });
    });

    return router;
}();


