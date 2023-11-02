const redis = require('redis');
const kue = require('kue');
const environment = require('./environment');

// Create a Kue queue
const queue = kue.createQueue({
  redis: {
    host: environment.REDIS_HOST,
    port: environment.REDIS_PORT,
  },
});

// Handle Kue queue errors
queue.on('error', (err) => {
  console.error('Kue error:', err);
});


module.exports = queue;