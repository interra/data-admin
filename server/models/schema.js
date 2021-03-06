'use strict';
const Async = require('async');
const Bcrypt = require('bcrypt');
const Joi = require('joi');
const MongoModels = require('mongo-models');
const Uuid = require('node-uuid');
const fs = require('fs');
const YAML = require('yamljs');


class Schema {

  constructor(name) {
      this.name = name;
      this.dir = "./schemas/" + name + "/";
  }

  uiSchema(callback) {
      const configFile = this.dir + "UISchema.yml";
      YAML.load(configFile, function (data) {
          return callback(null, data);
      });
  }

  map(callback) {
      const configFile = this.dir + "map.yml";
      YAML.load(configFile, function (data) {
          return callback(null, data);
      });
  }

  collectionAndSchema(collection, callback) {
      this.collection(collection, (err, list) => {

          if (err) {
              return callback("Collection not found.");
          }

          this.uiSchema((err,ui) => {
              if (err) {
                  return callback("UIschema not found");
              }
              this.map((err,map) => {
                  let data = {
                      schema: list,
                      uiSchema: ui[collection],
                      map: map
                  }
                  return callback(null,data);
              });

          });

      });
  }

  collection(collection, callback) {
      const collectionFile = this.dir + collection + ".yml";
      YAML.load(collectionFile, function (data) {
          if (data) {
            // Need to add Identifier if not specified.
            if (typeof(data.properties.identifier) === undefined) {
              data.properties._id = {
                'type': 'string',
                'description': "Unique identifier.",
                'title': 'Identifier'
              }
            }

            return callback(null, data);
          }
          else {
            return callback("Colection not found");
          }
      });
  }

  config(callback) {
      const configFile = this.dir + "config.yml";
      YAML.load(configFile, function (data) {
          return callback(null, data);
      });
  }

  list(callback) {
      fs.readdir('./schemas', function (err, data) {
           if (err) {
                return callback(err);
           }
           callback(null, data);
      });
  }
}

Schema.register = function (server, options, next) {
    next();
}

Schema.register.attributes = {
    "name": "schema"
}

module.exports = Schema;
