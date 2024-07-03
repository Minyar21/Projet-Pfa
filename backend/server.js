const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/loginapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Model
const User = require('./models/user');
const Customer = require('./models/customer'); // Add this line to import the Customer model

// Middleware to check JWT token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, 'jwtSecret');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Register Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'jwtSecret',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'jwtSecret',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get User Route
app.get('/api/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Use customer routes
const customerRoutes = require('./routes/customerRoute');
app.use('/api', customerRoutes);

// Model Client
const Client = require('./models/socialStats');

// Scraping function
const scrapeFacebook = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const likes = $('#PagesLikesCountDOMID').text().trim();
    const comments = 0;  
    const shares = 0;    
    console.log(`Scraped data: Likes: ${likes}, Comments: ${comments}, Shares: ${shares}`);
    return { likes, comments, shares };
  } catch (error) {
    console.error('Error scraping Facebook page:', error);
    return { likes: 0, comments: 0, shares: 0 };
  }
};

// Stats route (socialStats.js in the routes directory)
app.post('/socialStats', async (req, res) => {
  const { clientName } = req.body;

  try {
    console.log(`Fetching stats for client: ${clientName}`);
    const client = await Client.findOne({ name: clientName });
    if (!client) {
      console.log('Client not found');
      return res.status(404).json({ error: 'Client not found' });
    }

    const { facebookUrl, instagramUrl, linkedinUrl } = client;
    console.log(`Fetching stats for URLs: Facebook: ${facebookUrl}, Instagram: ${instagramUrl}, LinkedIn: ${linkedinUrl}`);

    // Replace with your scraping functions for Facebook, Instagram, LinkedIn
    const facebookStats = await scrapeFacebook(facebookUrl);
    const instagramStats = { likes: 0, comments: 0, shares: 0 };
    const linkedinStats = { likes: 0, comments: 0, shares: 0 };

    const newInteraction = {
      date: new Date(),
      facebook: facebookStats,
      instagram: instagramStats,
      linkedin: linkedinStats,
    };

    client.interactions.push(newInteraction);
    await client.save();

    console.log('Stats fetched and saved successfully');
    res.json(newInteraction);

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Route temporaire pour lister tous les clients
app.get('/listClients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    console.error('Error listing clients:', error);
    res.status(500).json({ error: 'Error listing clients' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
