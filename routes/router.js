const express = require('express')
const recipeController = require('../controllers/recipeController')
const testimonyController = require('../controllers/testimonyController')
const userController = require('../controllers/userController')
const router = new express.Router()

//all-recipes
router.get('/all-recipes',recipeController.getAllRecipesController) 

//add testimony
router.post('/add-testimony',testimonyController.addTestimonyController) 
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)

module.exports = router

