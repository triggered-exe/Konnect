// const redis = require('redis');
// const kue = require('kue');
// const environment = require('./environment');
// const { createClient } = redis;

// const client = createClient({
//   url: "rediss://red-cl4vhnal7jac73c8mbcg:QuUdK8OEaIEVMQd1VzMbnL5Cdy2eoNc1@singapore-redis.render.com:6379"
// });

// client.on('error', err => {
//   console.log('Redis Client Error', err);
// });

// client.connect().then(() => {
//   console.log('Redis Client Connected');
// }).catch(error => {
//   console.error('Error:', error);
// });

// // Use the same Redis client for Kue
// const queue = kue.createQueue({
//   redis: {
//     createClient: () => client, // Use the existing Redis client
//   },
// });

// // Handle Kue queue errors
// queue.on('error', (err) => {
//   console.error('Kue error:', err);
// });

// module.exports = queue;




