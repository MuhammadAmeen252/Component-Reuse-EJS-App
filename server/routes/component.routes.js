const express = require('express')
const route = express.Router()
const componentController = require('../controller/component.controller');

//renders
route.get('/', componentController.index)
route.get('/addComponent', componentController.addComponentForm)

//API routes
route.post('/api/addComponent', componentController.addComponent)
route.get('/api/getComponent/:name', componentController.getComponent)

module.exports = route