const { default: axios } = require("axios");

const MainController = {
    index: (req, res) => {
        let cepConsulta = "";

        if('cepConsulta' in req.query){
            cepConsulta = req.query.cepConsulta;
        }

        if(cepConsulta.length === 8 || cepConsulta.length === 9){
            axios.get(`https://brasilapi.com.br/api/cep/v1/${cepConsulta}`).then((resposta) => {
                res.render("endereco", {
                    detalhesCep: resposta.data,
                    cepConsulta: cepConsulta
                });
            }).catch(() => {
                res.render("endereco"); 
            });
        }else{
            res.render('endereco');
        }
            
    }
};


module.exports = MainController;