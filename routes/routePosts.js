const router=require('express').Router();
const {getPost,getPosts,updatePost,deletePost,createPost}=require('../controllers/postController')

router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);


module.exports=router;