const express = require('express')
const route = express.Router()
const componentController = require('../controller/component.controller');

//renders
route.get('/', componentController.index)
route.get('/addComponent', componentController.addComponentForm)
route.get('/updateComponent', componentController.updateComponentPage)

//API routes
route.post('/api/addComponent', componentController.addComponent)
route.get('/api/getComponent/:name', componentController.getComponent)
route.get('/api/getAllComponents', componentController.getAllComponents)
route.get('/api/Component/:id', componentController.getComponentById)
route.patch('/api/Component/:id', componentController.updateComponent)
route.delete('/api/Component/:id', componentController.deleteComponent)

module.exports = route