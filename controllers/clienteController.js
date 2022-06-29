const db = require("../models");
const { validationResult } = require("express-validator");
const sequelize = db.sequelize;
const bcrypt = require("bcryptjs");

const clienteController = {
    login: (req, res) => {
        res.render('login');
    },

    logar: async (req, res) => {
      
        const body = {
            email: req.body.email,
            senha: req.body.senha
        }
        console.log(body)
        // fazer busca do usuario digitado no banco
        const usuarioEncontrado = await db.Cliente.findOne({ where: { email: body.email } });
        console.log(usuarioEncontrado);
        if (usuarioEncontrado == null) {
            return res.render('usuario/login', { email });
        }
        //verificacao de login 
        
        const resultadoSenha = bcrypt.compareSync(body.senha, usuarioEncontrado.senha);
         if(!resultadoSenha){
            return req.render('login', { email });
         }
        req.session.idUsuario = usuarioEncontrado.id;
        req.session.nome = usuarioEncontrado.nome;
        req.session.sobrenome = usuarioEncontrado.sobrenome;
        req.session.email = usuarioEncontrado.email;
        req.session.foto_perfil = usuarioEncontrado.foto_perfil;


        res.render('painelUsuario');
        


    },
    usuario: (req, res) => {
        res.render('painelUsuario');
    },
    listarCategorias: (req, res) => {
        res.render('listarCategorias');
    },
    /*

    acaoLogin: async function(req, res){
        const { email, senha } = req.body;
        const usuarioEncontrado = await db.Usuario.findOne({ where: { email: email }});
        
        if(usuarioEncontrado == null){
            return res.render("/login", { email });
        }
    },
    */
    logout: function (req, res) {
        req.session.destroy();
        res.redirect("home");
    },
    cadastro: (req, res) => {
        res.render('cadastroCliente');
    },
    acaoCadastro: async (req, res) => {

        const { nome, sobrenome, email, senha } = req.body;
        const errors = validationResult(req); //importa os erros da validação feita no middleware
        console.log(errors);
        if (!errors.isEmpty()) {

            return res.render('cadastroCliente', {
                email,
                nome,
                sobrenome,
                errors: errors.array()
            });//obs voltando para mesma pagina e passando como segundo parametro um objeto contando um array com os erros
        }



        db.Cliente.create({ //--- igual a um create no mysql
            email,
            nome,
            sobrenome,
            senha: bcrypt.hashSync(senha),
            //foto_perfil: req.file.filename
        })


        res.render("home");
    },
    cadastroEndereco: (req, res) => {
        res.render('cadastroEndereco');
    },



}

module.exports = clienteController;

