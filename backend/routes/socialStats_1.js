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

// Route pour obtenir les statistiques
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
