const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/world_traveler', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error(`Error connecting to mongo: ${err}`));
