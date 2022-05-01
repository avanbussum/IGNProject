//npm init
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
    host: 'sql3.freemysqlhosting.net',
    port: '3306', 
    user: 'sql3489075',
    password: 'BBbXuCTdpc',
    database: 'sql3489075'
});

// Test connection
db.connect((err) => {
    if (err) {
      console.log("Database db Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});

// Get Image call and store in cache
// For Future Do API call and add all images to the database instead of cache
// Fetch is in back end for scalibility of the web scraper and editing in case call needs to change
const imageCache = {};
app.get('/reviewfind/*', (req, res) => {
  var url = req.params[0];
  const base64Credentials = Buffer.from('avanbussum@gmail.com:0nZyrm8y0dAFhQOnS5wk').toString('base64')
  const options = {
    headers: {
      'Authorization': 'Basic ' + base64Credentials
    }
  }
  console.log("The request for:" + url)

  if (imageCache[url]) {

    res.send(imageCache[url])

  } else {
    axios.get("https://api.urlmeta.org/?url=" + url, options).then(
      (response) => {
        if (response.data.result.status == 'OK') {
          imageCache[url] = response.data.meta.image;
          res.send(response.data.meta.image);
        } else {
          console.log(response.data.result.reason);
        }
      }
    );
  }
});

app.get("/show-urlmeta-cache", (req, res) => {
  res.send(imageCache);
});


app.get("/medias", (req, res) => {
  db.query("SELECT * FROM codefooremote", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("call made")
      res.send(result);
    }
  });
});

// Get media based off genre
app.get("/typefinder/:media_type", (req, res) => {
    
  console.log("Fetching user with id: " + req.params.media_type);

  const type = req.params.media_type;
  const queryString = "SELECT * FROM codefooremote WHERE media_type = ?";
  
  db.query(queryString, [type], (err, result) => {
   
    if (err) throw err;     
    console.log("Fetched users succesfully");
    res.send(result);

  });
});


// Get media based off genre
app.get("/genrefinder/:genres", (req, res) => {
    
    console.log("Fetching user with id: " + req.params.genres);

    const genre = req.params.genres;
    const queryString = "SELECT * FROM codefooremote WHERE genres = ?";
    
    db.query(queryString, [genre], (err, result) => {
     
      if (err) throw err;     
      console.log("Fetched users succesfully");
      res.send(result);

    });
});


//localhost:3004
app.listen(3004, () => {
    console.log("server is up and listening on 3004...");
});

// Insert media for future use if data needs to be changed from front end
/*
app.post("/create", (req, res) => {
    
    const id = req.body.id;
    const media_type = req.body.media_type;
    const name = req.body.name;
    const short_name = req.body.short_name;
    const long_description = req.body.long_description;
    const short_description = req.body.short_description;
    const genres = req.body.genres;
    const review_url = req.body.review_url;
    const review_score = req.body.review_score;
    
  
    db.query(
      "INSERT INTO code_foo.codefoobackend (name, age, country, position, wage) VALUES (?,?,?,?,?)",
      [name, age, country, position, wage],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
});
*/