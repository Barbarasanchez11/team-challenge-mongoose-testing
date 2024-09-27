const Post = require('../models/Post')

const PostController = {
    async create(req, res) {
        const postFeatures = req.body
        try {
            const post = await Post.create(postFeatures)
            res.status(201).json(post)
        } catch (error) {
            res
                .status(500)
                .json({ message: 'there was a problem trying to create a post.' })
        }
    },
    async getPosts(req, res) {
        try {
            const post = await Post.find()
            res.status(200).json(post)
        } catch (error) {
            throw new Error('Error fetching posts from server.')

        }
    },
    async getById(req, res) {
        try {
            const id = req.params._id
            const post = await Post.findById(id)
            res.status(200).json(post)
        } catch (error) {
            throw new Error('Error fetching post from server. ')
        }
    },
    async getByTitle(req, res) {
        try {
            const title = req.params.title;
            const postTitle = await Post.findOne({ title: title })
            res.status(200).json(postTitle)
        } catch (error) {
            throw new Error('Error fetching post from server. ')
        }
    },
    async updateById(req, res) {

        try {
            const id = req.params._id;
            const { title, body } = req.body
            const post = await Post.findByIdAndUpdate(id, { title: title, body: body }, { new: true, runValidators: true })
            res.status(200).json(post)
        } catch (error) {
            throw new Error('Error updating post from server.')
        }
    },
    async deleteById(req, res) {
        try {
            const postId = req.params._id
            const deletePost = await Post.findByIdAndDelete(postId)
            res.status(200).json({ message: 'Post has been deleted' })
        } catch (error) {
            throw new Error('Error deleting post from server.')
        }
    },
    async pagination(req, res) {
        try {

            const pagination = await Post
                .find() //Encuentra todos devuelve todos
                .skip(0) //Cuantos documentos va a ignorar antes de empezar en este caso 0 empieza posicion 1
                .limit(10); //hasta cuantos documentos va a leer no mas de 10. es decir limita a 10
            res.status(200).json(pagination)

        } catch (error) {
            console.log(error.message);

            throw new Error('Error fetching posts from server.')
        }
    }

}

module.exports = PostController