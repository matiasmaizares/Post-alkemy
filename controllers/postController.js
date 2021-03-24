const { response } = require('express');

const Post =require('../models/Post');

const getPosts = async( req, res = response ) => {
    try {
        const posts=await Post.findAll({
            order: [
                ['fecha_creacion', 'DESC']        
            ],
            attributes: { exclude: ['contenido'] }
        })
        return res.json({
            posts
        });      
    } catch (error) {
        console.log(error)
        return res.json({
            ok:false,
            msg:'No se pudo traer los datos'
        })
    } 
}

const getPost = async( req, res = response ) => {

    try {
        const post= await Post.findAll({where:{
            id:req.params.id
        }}) 
    
        return res.json({
           post
        });
    } catch (error) {
        console.log(error)
        return res.json({
            msg:'no se encontro el post'
        })
    }
}

const updatePost = async( req, res = response ) => {

    console.log(req.params.id)
    try {
        
        await Post.update(req.body,{
            where:{id:req.params.id}
        })

        return res.json({
            ok: true,
            msg:'Post actualizado'
        });
    } catch (error) {
        console.log(error)
        return res.json({
            ok:false,
            msg:'No se encontro el post'
        })
    }
}

const createPost = async( req, res = response ) => {

   
    if (!(/\.(jpg|png|gif)$/i).test(req.body.imagen)) {
       return res.json({
           msg:'no es un imagen'
       })
    }

    try {     
        const post=await Post.create(req.body);
        
        res.json({
            ok: true,
            msg:'post creado',
            post
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
            msg:'no se pudo crear el nuevo post'
        })
    }
}

const deletePost = async( req, res = response ) => {
    
    try {
        await Post.destroy({
            where:{
                id:req.params.id
            }
        })

        return res.json({
            ok: true,
            msg:'post eliminado'
        });
    } catch (error) {
        console.log(error);
        return res.json({
           ok:false,
            msg:'no se pudo eliminar el post'
        }) 
    }

}

module.exports={
    getPost,getPosts,updatePost,createPost,deletePost
}