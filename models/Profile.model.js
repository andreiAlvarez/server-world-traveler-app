const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    totalPoints: Number,
    price: String,
    pictureUrl: String,
    SpotTotal: Number,
  },
  {
    // keeps record when is created and updated
    timestamps: true
  }
);


module.exports = model('Profile', profileSchema);
