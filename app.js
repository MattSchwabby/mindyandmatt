var mysql      = require('mysql');
var express         = require("express");
var    app             = express();
var    bodyParser      = require("body-parser");
var    methodOverride = require("method-override");
var flash = require("connect-flash");


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(flash());

app.get("/", function(req, res)
{
   res.render("index") 
});

app.get("/rsvp", function(req, res)
{
    res.render("rsvp");
});

app.get("/rsvp/search", function(req, res)
{
   res.render("search"); 
});

app.get("rsvp/search/user", function(req, res)
{
    var name =[];
    name.first_name = req.query.first_name;
    name.last_name = req.query.last_name;
    var connection = mysql.createConnection(
    {
        hostname: process.env.DATABASECONNECTION,
        host: process.env.DATABASECONNECTION,
        port: process.env.DATABASEPORT,
        user: process.env.DATABASEUSER,
        password: process.env.DATABASEPASS,
        database: 'guest_list'
    });
    
    connection.connect();
    connection.query("SELECT household_id FROM households WHERE household_first_name LIKE '%" + req.query.first_name + "%' AND household_last_name LIKE '%" + req.query.last_name + "%'", function(err, rows, fields)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            // var data;
            // data = JSON.parse(rows);
            try
            {
                if (typeof rows[0].household_id === 'number' && rows[0].household_id)
                {
                    var household_id = rows[0].household_id;
                    connection.query("SELECT * FROM guests WHERE household_id = " + household_id, function(err, rows, fields)
                    {
                        if (err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            res.render("results", {results: rows, name: name});
                        }
                    });
                }
                else
                {
                    res.render("search");
                }
            }
            catch (err)
            {
                res.render("search");
            }
        }
    });
});

// app.get("/rsvp/guests/update", function(req, res)
// {
//     var connection = mysql.createConnection(
//     {
//         hostname: process.env.DATABASECONNECTION,
//         host: process.env.DATABASECONNECTION,
//         port: process.env.DATABASEPORT,
//         user: process.env.DATABASEUSER,
//         password: process.env.DATABASEPASS,
//         database: 'guest_list'
//     });
    
//     console.log("SUBMITTED FORM IS:");
//     console.log(req.query);
//     if(req.query.name5)
//     {
//         console.log("SIX ENTRIES");
//         var statements = [];
//         var statement = "UPDATE guests SET name='"+ req.query.name0 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception0 + " WHERE id=" + req.query.guest_id0 + ";";
//         var statement2 = "UPDATE guests SET name='"+ req.query.name1 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception1 + " WHERE id=" + req.query.guest_id1 + ";";
//         var statement3 = "UPDATE guests SET name='"+ req.query.name2 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception2 + " WHERE id=" + req.query.guest_id2 + ";";
//         var statement4 = "UPDATE guests SET name='"+ req.query.name3 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception3 + " WHERE id=" + req.query.guest_id3 + ";";
//         var statement5 = "UPDATE guests SET name='"+ req.query.name4 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception4 + " WHERE id=" + req.query.guest_id4 + ";";
//         var statement6 = "UPDATE guests SET name='"+ req.query.name5 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception5 + " WHERE id=" + req.query.guest_id5 + ";";
//         statements.push(statement, statement2, statement3, statement4, statement5, statement6);    }
//     else if(req.query.name4)
//     {
//         console.log("FIVE ENTRIES");     
//         var statements = [];
//         var statement = "UPDATE guests SET name='"+ req.query.name0 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception0 + " WHERE id=" + req.query.guest_id0 + ";";
//         var statement2 = "UPDATE guests SET name='"+ req.query.name1 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception1 + " WHERE id=" + req.query.guest_id1 + ";";
//         var statement3 = "UPDATE guests SET name='"+ req.query.name2 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception2 + " WHERE id=" + req.query.guest_id2 + ";";
//         var statement4 = "UPDATE guests SET name='"+ req.query.name3 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception3 + " WHERE id=" + req.query.guest_id3 + ";";
//         var statement5 = "UPDATE guests SET name='"+ req.query.name4 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception4 + " WHERE id=" + req.query.guest_id4 + ";";
//         statements.push(statement, statement2, statement3, statement4, statement5);
//     }
//     else if(req.query.name3)
//     {
//         console.log("FOUR ENTRIES");
//         var statements = [];
//         var statement = "UPDATE guests SET name='"+ req.query.name0 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception0 + " WHERE id=" + req.query.guest_id0 + ";";
//         var statement2 = "UPDATE guests SET name='"+ req.query.name1 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception1 + " WHERE id=" + req.query.guest_id1 + ";";
//         var statement3 = "UPDATE guests SET name='"+ req.query.name2 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception2 + " WHERE id=" + req.query.guest_id2 + ";";
//         var statement4 = "UPDATE guests SET name='"+ req.query.name3 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception3 + " WHERE id=" + req.query.guest_id3 + ";";
//         statements.push(statement, statement2, statement3, statement4);
//     }
//     else if(req.query.name2)
//     {
//         console.log("THREE ENTRIES");
//         var statements = [];
//         var statement = "UPDATE guests SET name='"+ req.query.name0 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception0 + " WHERE id=" + req.query.guest_id0 + ";";
//         var statement2 = "UPDATE guests SET name='"+ req.query.name1 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception1 + " WHERE id=" + req.query.guest_id1 + ";";
//         var statement3 = "UPDATE guests SET name='"+ req.query.name2 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception2 + " WHERE id=" + req.query.guest_id2 + ";";
//         statements.push(statement, statement2, statement3);
//     }
//     else if(req.query.name1)
//     {
//         console.log("TWO ENTRIES");
//         var statements = [];
//         var statement = "UPDATE guests SET name='"+ req.query.name0 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception0 + " WHERE id=" + req.query.guest_id0 + ";";
//         var statement2 = "UPDATE guests SET name='"+ req.query.name1 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception1 + " WHERE id=" + req.query.guest_id1 + ";";
//         statements.push(statement, statement2);
//     }
//     else
//     {
//         console.log("ONE ENTRY");
//         var statements = [];
//         var statement = "UPDATE guests SET name='"+ req.query.name0 + "', rsvp_ceremony_and_reception=" + req.query.rsvp_ceremony_and_reception0 + " WHERE id=" + req.query.guest_id0 + ";";
//         statements.push(statement);
//     }
    
//     connection.connect();
    
//     var updateSQLDB = function(inputArray)
//     {
//         inputArray.forEach(function(item)
//         {
//             connection.query(item, function(err,rows,fields)
//             {
//                 if(err)
//                 {
//                     console.log(err)
//                 }
//                 else
//                 {
                    
//                 }
//             })
//         });
//     };
    
//     var callUpdateFunction = function(callback)
//     {
//         updateSQLDB(statements);
//         connection.query("SELECT * FROM guests WHERE household_id = " + req.query.household_id[0], function(err, rows, fields)
//         {
//             if (err)
//             {
//                 console.log(err);
//             }
//             else
//             {
//                 var name =[];
//                 name.first_name=req.query.first_name;
//                 name.last_name=req.query.last_name;
//                 res.render("results", {results: rows, name: name});
//             }
//         });
//     };

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("SERVER IS LISTENING ON PORT " + process.env.PORT + " AND IP ADDRESS " + process.env.IP);
});


// MYSQL SELECT EXAMPLES

// var connection = mysql.createConnection(
//     {
//         hostname: process.env.DATABASECONNECTION,
//         host: process.env.DATABASECONNECTION,
//         port: process.env.DATABASEPORT,
//         user: process.env.DATABASEUSER,
//         password: process.env.DATABASEPASS,
//         database: 'guest_list'
//     });

// connection.connect();

// connection.query('SELECT * FROM households;', function(err, rows, fields)
// {
//     if (err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         var i;
//         for (i = 0; i<rows.length; i++)
//         {
//             var currentRow = i + 1;
//             console.log("Row " + currentRow + " contains");
//             console.log(rows[i]);
//         }
//     }        
// });

// connection.query("SELECT household_id FROM households WHERE household_first_name LIKE '%Scott%' AND household_last_name LIKE '%Schwabenbauer%'", function(err, rows, fields)
// {
//     if (err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         // var data;
//         // data = JSON.parse(rows);
//         var household_id = rows[0].household_id;
//         connection.query("SELECT * FROM guests WHERE household_id = " + household_id, function(err, rows, fields)
//         {
//             if (err)
//             {
//                 console.log(err);
//             }
//             else
//             {
//                 console.log(rows);
//             }
//         });
//     }
// });


// console.log(process.env.DATABASECONNECTION);
// console.log(process.env.DATABASEPORT);
// console.log(process.env.DATABASEUSER);
// console.log(process.env.DATABASEPASS);