const express = require('express')
const router = express.Router()

const PostController = require('../controllers/Post.controllers')

router.post('/create',PostController.create)

router.get('/',PostController.getPosts)

router.get('/id/:_id', PostController.getById)

router.get('/title/:title',PostController.getByTitle)

router.put('/id/:_id',PostController.updateById)

router.delete('/id/:_id',PostController.deleteById)

router.get('/postsWithPagination',PostController.pagination)

module.exports = router;



