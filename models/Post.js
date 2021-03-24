const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Post = db.define('post', {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        titulo:{
            type:Sequelize.STRING(30),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'el titulo es obligatorio'
                }
            }
        },
        contenido:{
            type:Sequelize.STRING(100),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:'el contenido es obligatorio'
                }
            }
        },
        categoria:Sequelize.STRING(60),
        imagen:Sequelize.STRING(60),
       
        fecha_creacion:Sequelize.DATE
    }
    ,{
        timestamps:false
    })

module.exports = Post;

