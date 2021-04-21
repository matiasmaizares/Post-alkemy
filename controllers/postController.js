const { response } = require("express");

const Post = require("../models/Post");

const getPosts = async (req, res = response) => {
  try {
    const posts = await Post.findAll({
      order: [["fecha_creacion", "DESC"]],
      attributes: { exclude: ["contenido"] },
    });
    return res.json({
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
      msg: "No se pudo traer los datos",
    });
  }
};

const getPost = async (req, res = response) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.json({
        msg: "no existe ese post",
      });
    }

    return res.json({
      post,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "no se encontro el post",
    });
  }
};

const updatePost = async (req, res = response) => {
  try {
    const existePost = await Post.findByPk(req.params.id);
    if (!existePost) {
      return res.status(404).json({
        ok: false,
        msg: "no existe post",
      });
    }

    await Post.update(req.body, {
      where: { id: req.params.id },
    });

    return res.json({
      ok: true,
      msg: "Post actualizado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, intentelo de nuevo",
    });
  }
};

const createPost = async (req, res = response) => {
  if (!/\.(jpg|png)$/i.test(req.body.imagen)) {
    return res.json({
      msg: "no es un imagen",
    });
  }

  try {
    const post = await Post.create(req.body);

    res.json({
      ok: true,
      msg: "post creado",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, intentelo de nuevo",
    });
  }
};

const deletePost = async (req, res = response) => {
  try {
    const existePost = await Post.findByPk(req.params.id);
    if (!existePost) {
      return res.status(404).json({
        ok: false,
        msg: "no existe post",
      });
    }
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      ok: true,
      msg: "post eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error",
    });
  }
};

module.exports = {
  getPost,
  getPosts,
  updatePost,
  createPost,
  deletePost,
};
