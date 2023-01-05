const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    project: {
      type: String,
      required: [true, 'Please add a project value'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
