'use strict';

import mongoose from 'mongoose';

var timestamps = require('mongoose-timestamp');

var PointSchema = new mongoose.Schema({
  messageType: String,
  nodeType: String,
  extAddr: String,
  shortAddr: String,
  softVersion: String,
  channelMask: String,
  panID: String,
  workingChannel: String,
  parentShortAddr: String,
  lqi: String,
  rssi: String,
  boardType: String,
  sensorsSize: String,
  battery: String,
  temperature: String,
  light: String,
  ph: String,
  orp: String
});

PointSchema.plugin(timestamps);

export default mongoose.model('Point', PointSchema);
