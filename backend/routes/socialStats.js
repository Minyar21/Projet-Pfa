const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

// Client Model
const Client = require('./models/socialStats');

// Function to scrape Facebook data
const scrapeFacebook = async (facebookURL) => {
  try {
    const { data } = await axios.get(facebookURL);
    const $ = cheerio.load(data);
    // Parse data here and return an object with the stats
    const likes = $('#like_count').text(); // Adjust selector as per actual data
    const comments = $('#comment_count').text(); // Adjust selector as per actual data
    const shares = $('#share_count').text(); // Adjust selector as per actual data
    return { likes, comments, shares };
  } catch (error) {
    console.error('Error scraping Facebook:', error);
    return { likes: 0, comments: 0, shares: 0 }; // Default values in case of error
  }
};



// Route to get statistics
app.post('/socialStats', async (req, res) => {
  const { clientName } = req.body;

  try {
    console.log(`Searching for client: ${clientName}`);
    const client = await Client.findOne({ name: clientName });
    if (!client) {
      console.log('Client not found');
      return res.status(404).json({ error: 'Client not found' });
    }

    // Scrape stats
    const facebookStats = await scrapeFacebook(client.facebook);
    // Add scraping logic for Instagram and LinkedIn if needed

    const newInteraction = {
      date: new Date(),
      facebook: facebookStats,
      instagram: { likes: 0, comments: 0, shares: 0 }, // Replace with actual scraping data
      linkedin: { likes: 0, comments: 0, shares: 0 }, // Replace with actual scraping data
    };

    client.interactions.push(newInteraction);
    await client.save();

    console.log('Stats fetched and saved successfully');
    res.json({ message: 'Stats fetched and saved', client });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
