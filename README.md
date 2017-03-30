Creates an administrative interface for creating and managing open data catalogs. Initial pre-pre alpha is here: https://interra-data.herokuapp.com/

Features will include standard open data catalog capabilties including managing multiple sites, datasets and resources, basic pages, and more.

Provides an API that can save data in Mongo or JSON files. Plan is to have dataset metadata stored directly in JSON files. However this easy-to-use interface could be used as a front-end for other catalogs. Schema for datasets will be driven by JSON Schema. This will make it easy to adopt new schemas or modify existing schemas.

## Table of Contents

- [About Interra Data](#about-interra-data)
- [Architecture](#architecture)
  - [Server](#server)
  - [JSON Schema](#json-schema)
  - [Storage](#storage)
- [Roadmap](#roadmap)

## About Interra Data

Interra Data is an Open Data Catalog powered by static JSON files. Using static files as the metadata store makes publishing and updating data easier and more efficient.

Interra Data is similar to [JKAN](https://jkan.io/). The main conceptual difference is it is created to run as a service that is not coupled to Github Pages.

Interra Data consists of two major decoupled components.

* [Data Admin](https://github.com/interra/data-admin) which allows non-technical users to sign-up and create and manage a catalog. Data generated by Data Admin is stored in JSON files.
* [Data Generate](https://github.com/interra/data-generate) which generates a data catalog from JSON files.

Interra Data focuses on solving the following problems with data catalogs:

 * **High Cost of Ownership**
   * Static sites means less overhaed to update and maintain
   * Interra Data as a service will be able to service many instances from a single interface
   * Publishing static sites is less expensive than stateful applications
* **Complexity**
  * Getting data in and out is easy. Just update static files.
  * No state to manage in the application.
  * Administrative interface fully decoupled.
* **Difficulty in Adapting**
  * Schema updates can be done editing a single file.
  * React templates for lightweight theming.

## Architecture

### Server
Server built off of [Aqua](https://github.com/jedireza/aqua/) using HapiJS. Front-end is built using React.

### JSON Schema
The schema for the datasets will be driven by JSON Schema. To render the form we will use [React JSON Schema Form](https://github.com/mozilla-services/react-jsonschema-form).

This should make it easy to add to existing schemas or adopt new ones.

### Storage
User accounts and site data is stored in Mongo.

Site data will be stored in JSON files.

## Roadmap

### 0.0.1

 * Basic user registration and auth
 * Sites and datasets storage and admin
 * Dashboard for sites
 
### 0.0.2 (Current)

 * Add React JSON Schema Form
 * Add schemas API
 * Add basic schemas
   * Full Data.json schema
   * Datapackages schema
   * "Light" Dataset schema
 * Update dataset API for fluid schemas

### 0.0.3

* Add files exports
* Map exports to [data-generate](https://github.com/interra/data-generate) API

### 0.0.4

* Add pages
* Add mapping between datasets and organizations and categories
* Add orgs
* Add categories

### 0.0.5

* Catch up with tests and linting
* Add cucumber
* Add site editing capability

### 0.0.6
 * Integrate CARTO for datastore
 * Data previews
