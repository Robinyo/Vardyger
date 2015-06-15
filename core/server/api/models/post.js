'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * Post Schema
 */

var PostSchema = new Schema({
  title: {type: String, required: true, trim: true},
  slug: {type: String, required: true, trim: true},
  markdown: {type: String, default: '', trim: true},
  html: {type: String, default: '', trim: true},
  image: {type: String, default: '', trim: true},
  featured: {type: Boolean, default: false},
  page: {type: Boolean, default: false},
  state: { type: String, required: true, enum: ['Draft', 'Published'], default: 'Draft'},
  locale: {type: String, default: 'en_GB', trim: true},
  metaTitle: {type: String, default: '', trim: true},
  metaDescription: {type: String, default: '', trim: true}

  // authorId: { type: Schema.ObjectId, ref: 'User' },
  // createAt: { type: Date, default: Date.now },
  // createdBy: { type: Schema.ObjectId, ref: 'User' },
  // updatedAt: { type: Date, default: Date.now },
  // updatedBy: { type: Schema.ObjectId, ref: 'User' },
  // publishedAt: { type: Date, default: Date.now },
  // publishedBy: { type: Schema.ObjectId, ref: 'User' },

});

/**
 * Validations
 */

// PostSchema.path('title').required(true, 'Title cannot be blank');
// PostSchema.path('slug').required(true, 'Slug cannot be blank');

/**
 * Methods
 */

// PostSchema.methods = {}

/**
 * Statics
 */

// PostSchema.statics = {}

// module.exports = mongoose.model('Post', PostSchema);
mongoose.model('Post', PostSchema);


/*

 The term 'slug' comes from the world of newspaper production.

 It's an informal name given to a story during the production process. As the story winds its path from the beat
 reporter (assuming these even exist any more?) through to editor through to the "printing presses", this is the
 name it is referenced by, e.g., "Have you fixed those errors in the 'getting-started-with-node' story?".

 */
