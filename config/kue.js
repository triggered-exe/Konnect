const redis = require('redis');
const kue = require('kue');

// Use environment variables for configuration
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

// Create a Kue queue
const queue = kue.createQueue({
  redis: {
    host: redisHost,
    port: redisPort,
  },
});

// Handle Kue queue errors
queue.on('error', (err) => {
  console.error('Kue error:', err);
});


module.exports = queue;