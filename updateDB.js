var mysql = require('mysql');
var _ = require('underscore');


var updateDB = function(data)
{
    console.log("SUBMITTED FORM IS:");
    console.log(data);
    if(data.name5)
    {
        console.log("SIX ENTRIES");
        var statements = [];
        var statement = "UPDATE guests SET name='"+ data.name0 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception0 + " WHERE id=" + data.guest_id0 + ";";
        var statement2 = "UPDATE guests SET name='"+ data.name1 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception1 + " WHERE id=" + data.guest_id1 + ";";
        var statement3 = "UPDATE guests SET name='"+ data.name2 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception2 + " WHERE id=" + data.guest_id2 + ";";
        var statement4 = "UPDATE guests SET name='"+ data.name3 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception3 + " WHERE id=" + data.guest_id3 + ";";
        var statement5 = "UPDATE guests SET name='"+ data.name4 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception4 + " WHERE id=" + data.guest_id4 + ";";
        var statement6 = "UPDATE guests SET name='"+ data.name5 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception5 + " WHERE id=" + data.guest_id5 + ";";
        statements.push(statement, statement2, statement3, statement4, statement5, statement6);    }
    else if(data.name4)
    {
        console.log("FIVE ENTRIES");     
        var statements = [];
        var statement = "UPDATE guests SET name='"+ data.name0 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception0 + " WHERE id=" + data.guest_id0 + ";";
        var statement2 = "UPDATE guests SET name='"+ data.name1 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception1 + " WHERE id=" + data.guest_id1 + ";";
        var statement3 = "UPDATE guests SET name='"+ data.name2 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception2 + " WHERE id=" + data.guest_id2 + ";";
        var statement4 = "UPDATE guests SET name='"+ data.name3 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception3 + " WHERE id=" + data.guest_id3 + ";";
        var statement5 = "UPDATE guests SET name='"+ data.name4 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception4 + " WHERE id=" + data.guest_id4 + ";";
        statements.push(statement, statement2, statement3, statement4, statement5);
    }
    else if(data.name3)
    {
        console.log("FOUR ENTRIES");
        var statements = [];
        var statement = "UPDATE guests SET name='"+ data.name0 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception0 + " WHERE id=" + data.guest_id0 + ";";
        var statement2 = "UPDATE guests SET name='"+ data.name1 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception1 + " WHERE id=" + data.guest_id1 + ";";
        var statement3 = "UPDATE guests SET name='"+ data.name2 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception2 + " WHERE id=" + data.guest_id2 + ";";
        var statement4 = "UPDATE guests SET name='"+ data.name3 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception3 + " WHERE id=" + data.guest_id3 + ";";
        statements.push(statement, statement2, statement3, statement4);
    }
    else if(data.name2)
    {
        console.log("THREE ENTRIES");
        var statements = [];
        var statement = "UPDATE guests SET name='"+ data.name0 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception0 + " WHERE id=" + data.guest_id0 + ";";
        var statement2 = "UPDATE guests SET name='"+ data.name1 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception1 + " WHERE id=" + data.guest_id1 + ";";
        var statement3 = "UPDATE guests SET name='"+ data.name2 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception2 + " WHERE id=" + data.guest_id2 + ";";
        statements.push(statement, statement2, statement3);
    }
    else if(data.name1)
    {
        console.log("TWO ENTRIES");
        var statements = [];
        var statement = "UPDATE guests SET name='"+ data.name0 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception0 + " WHERE id=" + data.guest_id0 + ";";
        var statement2 = "UPDATE guests SET name='"+ data.name1 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception1 + " WHERE id=" + data.guest_id1 + ";";
        statements.push(statement, statement2);
    }
    else
    {
        console.log("ONE ENTRY");
        var statements = [];
        var statement = "UPDATE guests SET name='"+ data.name0 + "', rsvp_ceremony_and_reception=" + data.rsvp_ceremony_and_reception0 + " WHERE id=" + data.guest_id0 + ";";
        statements.push(statement);
    }
    
    callMYSQL(statements, function(response)
    {
        console.log(response);
        return response;
    });
};
    
    // updateDB(statements, function(result)
    // {
    //     return(result);
    // })
    

var callMYSQL = function(statements, callback)
{
    var connection = mysql.createConnection(
    {
        hostname: process.env.DATABASECONNECTION,
        host: process.env.DATABASECONNECTION,
        port: process.env.DATABASEPORT,
        user: process.env.DATABASEUSER,
        password: process.env.DATABASEPASS,
        database: 'guest_list'
    });

    connection.connect(function(callback)
    {
        _.each(statements, function(statement)
        {
            connection.query(statement);
        });
    return("COMPLETE");
    });
};



// var db = mysql.createConnection(config.database);


// db.connect(function() {
//   db.query('SELECT id FROM testTable', function (err, rows) {
//     if (err) { console.log(err); return; }
//     _.each(rows, function(one) {
//       console.log(one);
//       var label = "Label_"+one.id;
//       var sql = 'UPDATE testTable SET label = ? WHERE id = ?';
//       db.query(sql, [label, one.id], function(err, result) {
//         if(err) { console.log(err); return; }
//         console.log("Set label on row %s", one.id);
//       });
//     });
//   });
// });

module.exports = updateDB;