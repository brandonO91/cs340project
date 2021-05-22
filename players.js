module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT playerID, fname, lname, vbucks, level, teamID, playerAlive FROM players", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.getPlayers = results;
            complete();
        });
    }

    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT teamID, title FROM teams", function(error, results, fields){
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

    return router;
}();
