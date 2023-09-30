const express = require("express")
const router = express.Router()
const tributeControler = require("../controlers/tributeControler")

//rota que renderiza o formulário do arquivo "index"
router.get("/form", (req, res) => {
    res.render("index", {
        error: false,
        body: {
            // nameTribute: "",
            // age: "",
            // district: "",
            // skills: "",
            // url: ""
        }
    })
})

//rota que mostra todos os tributos (sem organização por pares)
router.get("/allTributes", tributeControler.allTributes)

//rota que mostra todos os tributos com organização por pares
router.get(`/all`, tributeControler.all2_0)

//rota que mostra todos os tributos com propriedade wanted == true
router.get("/wanted", tributeControler.wantedTributes)

//rota raíz que mostra todos os tributos com winner == true
router.get("/", tributeControler.hallOfTheFameTributes)

//rota que pega o valor da query district e mostra todos os tributos desse district
router.get("/d", tributeControler.districtTribute)

//rota que pega o valor da query edition e mostra os tributos daquela edição
router.get(`/ed`, tributeControler.specificEdition)

//FIZ UMA GAMBIARRA LOUCA, ao invéz de usar o delete para deleter eu usei um get
router.get('/del/:id', tributeControler.deleteTribute)

//rota para deletar um tributo
router.delete('/', express.urlencoded({extended: true}), tributeControler.deleteTribute)


//23| crie uma rota para mostrar o link escolhido para edição
router.get('/edit/:id', express.urlencoded({extended: true}), tributeControler.loadTribute)


//rota que manda o objeto atualizado para o o serv
router.post('/edit/:id', express.urlencoded({extended: true}), tributeControler.editTribute)

//rota que renderiza o form "specificDForm"
router.get("/formDistrict", tributeControler.redDForm)

//rota que renderiza o form "specificEditionForm"
router.get("/formEdition", tributeControler.redEditionForm)

//rota que adiciona um novo tributo
router.post('/', express.urlencoded({extended: true}), tributeControler.addTribute)

module.exports = router

