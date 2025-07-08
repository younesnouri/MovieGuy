const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json()); // Parse incoming JSON data
const bcrypt = require('bcrypt');

app.post('/validate_token', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // if no token, return 401

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403); // if token not valid, return 403
    req.user = user;
    next(); // proceed to the next middleware or route handler
  });
})

app.post("/adduser", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate the data
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database using a parameterized query
    const query = "INSERT INTO accounts (username, password) VALUES ($1, $2)";
    const values = [username, hashedPassword];

    const response = await pool.query(query, values);
    console.log("Data saved:", response.rows);

    res.status(201).json({ message: "User added successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve user from the database
    const user = await pool.query("SELECT * FROM accounts WHERE username = $1", [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compare the hashed password in the database with the provided password
    const isValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // User authentication successful, generate JWT
    const token = jwt.sign(
      { username: username },
      'your_secret_key',  // Use environment variable for the secret key
      { expiresIn: '24h' }     // Token expires in 24 hours
    );
    const user_id = user.rows[0].user_id;
    res.status(200).json({ message: "Login successful.", token: token, user_id : user_id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


app.get('/search', async (req, res) => {
  try {
    // Get the search term from the query string
    const searchTerm = req.query.term;

    // Protect against SQL injection by using parameterized queries
    const queryText = 'SELECT * FROM accounts WHERE username ILIKE $1';
    const queryValues = [`%${searchTerm}%`];

    // Execute the query
    const result = await pool.query(queryText, queryValues);

    // Send the result back to the client
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing search query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post("/moviewatchlist", async (req, res) => {

  try {
    const { username, movie, movieID } = req.body;

    const query = 'INSERT INTO user_watlist_movies (username, tmdb_movie,movie_ID) VALUES ($1, $2, $3)';
    const values = [username, movie, movieID];
    await pool.query(query, values);
    res.status(200).json({ message: 'Movie added to watchlist successfully' });

  } catch (error) {

    console.error('Error adding movie to watchlist:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to add movie to watchlist' });

  }


})


app.post("/moviewatched", async (req, res) => {

  try {
    const { username, movie, movieID } = req.body;

    const query = 'INSERT INTO user_watched_movies (username, tmdb_movie,movie_ID) VALUES ($1, $2, $3)';
    const values = [username, movie, movieID];
    await pool.query(query, values);
    res.status(200).json({ message: 'Movie added to watched successfully' });

  } catch (error) {

    console.error('Error adding movie to watched:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to add movie to watched' });

  }


})

app.post("/moviefavorite", async (req, res) => {

  try {
    const { username, movie, movieID } = req.body;

    const query = 'INSERT INTO user_favorite_movies (username, tmdb_movie,movie_ID) VALUES ($1, $2, $3)';
    const values = [username, movie, movieID];
    await pool.query(query, values);
    res.status(200).json({ message: 'Movie added to favorites successfully' });

  } catch (error) {

    console.error('Error adding movie to favorites:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to add movie to favorites' });

  }


})


app.get("/moviewatchlist", async (req, res) => {

  try {
    const { username } = req.query;
    const query = 'SELECT tmdb_movie, priority FROM user_watlist_movies WHERE username = $1';
    const values = [username];
    const result = await pool.query(query, values);

    const movies = result.rows.map((row) => row.tmdb_movie);
    const priority = result.rows.map((row) => row.priority);


    res.status(200).json({ movies, priority })
    //res.status(200).json({ message: 'Movie fetched from watchlist successfully' });
  } catch (error) {
    console.error('Error fetching movie from watchlist:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to fetch movie from watchlist' });


  }

})

app.put("/moviewatchlist", async (req, res) => {

  try {
    const { priority, username, movieID } = req.body;
    const query = 'UPDATE user_watlist_movies SET priority = $1 WHERE username = $2 AND movie_id = $3';
    const values = [priority, username, movieID];

     await pool.query(query, values);





    res.status(200).json({ message: 'Priority updated succesfully' });

  } catch (error) {
    console.error('Error updating priority:', error);

    res.status(500).json({ error: 'Failed to update priority' });


  }

})

app.get("/moviewatched", async (req, res) => {

  try {
    const { username } = req.query;
    const query = 'SELECT  uwm.tmdb_movie, url.ratings  FROM user_watched_movies AS uwm LEFT JOIN user_review_list AS url ON uwm.username = url.username AND uwm.movie_id = url.movie_id WHERE uwm.username = $1;';
    const values = [username];
    const result = await pool.query(query, values);

    const movies = result.rows.map((row) => ({
      tmdb_movie: row.tmdb_movie,
      rating: row.ratings
    }));

    res.status(200).json({ movies })
    //res.status(200).json({ message: 'Movie fetched from watched successfully' });
  } catch (error) {
    console.error('Error fetching movie from watched:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to fetch movie from watched' });


  }

})

app.get("/moviefavorite", async (req, res) => {

  try {
    const { username } = req.query;
    const query = 'SELECT tmdb_movie FROM user_favorite_movies WHERE username = $1';
    const values = [username];
    const result = await pool.query(query, values);

    const movies = result.rows.map((row) => row.tmdb_movie);

    res.status(200).json({ movies })

  } catch (error) {
    console.error('Error fetching movie from favorites:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to fetch movie from favorites' });


  }

})

app.delete("/moviewatchlist", async (req, res) => {
  try {
    const { movieID } = req.body;
    const query = 'DELETE FROM user_watlist_movies WHERE movie_id = $1';
    const values = [movieID];
    await pool.query(query, values);

    res.status(200).json({ message: 'Movie deleted from watchlist successfully' });


  } catch (error) {
    console.error('Error deleting movie from watchlist:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to delete movie from watchlist' });


  }


})

app.delete("/moviewatched", async (req, res) => {
  try {
    const { movieID } = req.body;
    const query = 'DELETE FROM user_watched_movies WHERE movie_id = $1';
    const values = [movieID];
    await pool.query(query, values);

    res.status(200).json({ message: 'Movie deleted from watched successfully' });


  } catch (error) {
    console.error('Error deleting movie from watched:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to delete movie from watched' });


  }


})


app.delete("/moviefavorite", async (req, res) => {
  try {
    const { movieID } = req.body;
    const query = 'DELETE FROM user_favorite_movies WHERE movie_id = $1';
    const values = [movieID];
    await pool.query(query, values);

    res.status(200).json({ message: 'Movie deleted from favorites successfully' });


  } catch (error) {
    console.error('Error deleting movie from favorites:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to delete movie from favorites' });


  }


})



app.post("/moviereviews", async (req, res) => {

  try {
    const { username, movie, movieID, review, rating } = req.body;

    const query = 'INSERT INTO user_review_list (username, tmdb_movie,movie_id,review, ratings) VALUES ($1, $2, $3, $4, $5)';
    const values = [username, movie, movieID, review, rating];
    await pool.query(query, values);
    res.status(200).json({ message: 'Review added to list successfully' });

  } catch (error) {

    console.error('Error adding Review to list:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to add review to list' });

  }


})


app.get("/moviereviews", async (req, res) => {

  try {
    const { username } = req.query;
    const query = 'SELECT tmdb_movie,review,ratings,review_timestamp FROM user_review_list WHERE username = $1';
    const values = [username];
    const result = await pool.query(query, values);

    const movieReviews = result.rows.map((row) => ({
      tmdb_movie: row.tmdb_movie,
      review: row.review,
      rating: row.ratings,
      timestamp:row.review_timestamp
    }));



    res.status(200).json({ movieReviews })

  } catch (error) {
    console.error('Error fetching reviw from list:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to fetch review from list' });


  }

})

app.post("/recentactivity", async (req, res) => {

  try {
    const { username, movie, movieID, activity_type } = req.body;

    const query = 'INSERT INTO recent_activity (username, tmdb_movie,movie_id,activity_type) VALUES ($1, $2, $3, $4)';
    const values = [username, movie, movieID, activity_type];
    await pool.query(query, values);
    res.status(200).json({ message: 'Movie added to recent activity successfully' });

  } catch (error) {

    console.error('Error adding movie to recent activity:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to add movie to recent activity' });

  }


})


app.get("/recentactivity", async (req, res) => {

  try {
    const { username } = req.query;
    const query = 'SELECT ra.tmdb_movie, ra.activity_type, ra.timestamp,url.ratings FROM recent_activity AS ra LEFT JOIN user_review_list AS url ON ra.username = url.username AND ra.movie_id = url.movie_id  WHERE ra.username = $1 ORDER BY timestamp DESC LIMIT 10;' ;
    const values = [username];
    const result = await pool.query(query, values);


    const movies = result.rows.map((row) => ({
      tmdb_movie: row.tmdb_movie,
      activity_type :row.activity_type,
      timestamp: row.timestamp,
      rating: row.ratings
    }));
   


    res.status(200).json({ movies })
    //res.status(200).json({ message: 'Movie fetched from watchlist successfully' });
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    // 4. Respond with an error message or status code
    res.status(500).json({ error: 'Failed to fetch recent activity' });


  }

})


const { spawn } = require('child_process');
app.post('/recommendations', (req, res) => {
  const { movieTitles } = req.body;

  const pythonProcess = spawn('python', ["C:/Users/Younes Nouri/Desktop/Recommender/content.py", JSON.stringify({ movieTitles })]);

  let dataString = '';
  pythonProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.send(dataString);
    } else {
      res.status(500).send('Error executing Python script');
    }
  });
});




app.post('/recommendations2', (req, res) => {
  const { userId } = req.body;

  // Spawn a Python process, passing userId as an argument
  const pythonProcess = spawn('C:\\Users\\Younes Nouri\\miniconda3\\envs\\myenv3\\python.exe', ["C:/Users/Younes Nouri/Desktop/Recommender/hybrid.py", JSON.stringify({ userId })]);

  let dataString = '';
  pythonProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.send(dataString);  // Send the output from the Python script back to the client
    } else {
      res.status(500).send('Error executing Python script');
    }
  });
});







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
