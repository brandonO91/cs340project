module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT playerID as id, fname, lname, vbucks, level, teamID, playerAlive FROM players", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.getPlayers = results;
            complete();
        });
    }

    function getPlayer(res, mysql, context, id, complete){
        console.log(id)
        var sql = "SELECT playerID as id, fname, lname, vbucks, level, teamID, playerAlive FROM players WHERE playerID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.getPlayer = results[0];
            complete();
        });
    }

    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT teamID as id, title FROM teams", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.getTeams = results;
            complete();
        });
    }
  
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteplayer.js","filterplayers.js","searchplayers.js"];
        var mysql = req.app.get('mysql');
        getTeams(res, mysql, context, complete);
        getPlayers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('players', context);
            }

        }
    });

    /* Adds a player, redirects to the player page after adding */

    router.post('/', function(req, res){
        // test
        // console.log("inserted")
        console.log(req.body.fname)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO players (fname, lname, vbucks, level, teamID) VALUES (?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.vbucks, req.body.level, req.body.teamID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/players');
            }
        });
    });

    /* Display one person for the specific purpose of updating people */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedteam.js", "updateplayer.js"];
        var mysql = req.app.get('mysql');
        getPlayer(res, mysql, context, req.params.id, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-player', context);
            }

        }
    });

    /* The URI that update data is sent to in order to update a player */

    router.put('/:id', function(req, res){
        // test
        // console.log("Being updated")
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE players SET fname=?, lname=?, vbucks=?, level=?, teamID=?, playerAlive=? WHERE playerID=?";
        var inserts = [req.body.fname, req.body.lname, req.body.vbucks, req.body.level, req.body.teamID, req.body.playerAlive, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a player, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM players WHERE playerID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();

