const Tribute = require("../models/Tribute")


const addTribute = async (req, res) => {
    let tribute = new Tribute(req.body)

    try{
        let doc = await tribute.save()
        console.log("Tribute saved")
        res.redirect(`/`)
    }catch(error){
        res.render('index', {error, body: req.body})
    }
}


const allTributes = async(req, res) => {
    try {
        //.sort({distric: 1}) Permite com que os tributos sejam organizados de forma crescente a partir da propriedade "district"
        // let femaleTributes = await Tribute.find({sex: "female"}).sort({edition: 1, district:1})
        // let maleTributes = await Tribute.find({sex: "male"}).sort({edition: 1, district:1})
        // let tributes = []
        // const maxLength = Math.max(femaleTributes.length, maleTributes.length)
        // for(let i=0; i < maxLength; i++){
        //     if(femaleTributes[i]) tributes.push(femaleTributes[i])
        //     if(maleTributes[i]) tributes.push(maleTributes[i])
        // }
        let tributes = await Tribute.find({}).sort({edition: 1, district: 1})
        res.render('allTributes', {tributes})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const all2_0 = async (req, res) => {
    try {
        // Busque todos os tributos femininos
        let femaleTributes = await Tribute.find({ newSex: 1 });

        // Busque todos os tributos masculinos
        let maleTributes = await Tribute.find({ newSex: 2 });

        // Combine tributos femininos e masculinos em um único array
        let tributes = femaleTributes.concat(maleTributes);

        // Ordene os tributos com base na edição e depois no distrito
        tributes.sort((a, b) => {
            if (a.edition !== b.edition) {
                return a.edition - b.edition; // Classifique por edição
            } else {
                return a.district - b.district; // Se a edição for a mesma, classifique por distrito
            }
        });

        res.render("allTeste", { tributes });
    } catch (error) {
        console.log("Erro identificado: ", error);
        res.send(error);
    }
};






const districtTribute = async(req, res) => {
    let district = Number(req.query.district)
    try {
        let tributes = await Tribute.find({district}).sort({edition: 1})
        res.render("specifDistricTribute", {tributes})
    } catch (error) {
        res.send(error)
    }
}

const wantedTributes = async (req, res) => {
    try {
        // Consulta para tributos "wanted" ordenados por edição e distrito
        let tributes = await Tribute.find({
            wanted: true,
        }).sort({
            edition: 1,
            district: 1,
        });

        res.render("wanted", { tributes });
    } catch (error) {
        res.send(error);
    }
};


const hallOfTheFameTributes = async(req, res) => {
    try {
        let tributes = await Tribute.find({winner: true}).sort({edition:1})
        res.render("hallOfTheFame", {tributes})
    } catch (error) {
        res.send(error)
    }
}


const loadTribute = async(req, res) => {
    console.log('loadLink Working')
    let id = req.params.id
    try {
      let tribute = await Tribute.findById(id)
      res.render('edit', {
        error: false,
        body: tribute
      })
    } catch (error) {
      res.send(error)
    }
}


const editTribute = async(req, res) => {
    let tribute = {}
    tribute.nameTribute = req.body.nameTribute
    tribute.age = req.body.age
    tribute.district = req.body.district
    tribute.skills = req.body.skills
    tribute.sex = req.body.sex
    tribute.edition = req.body.edition
    tribute.condition = req.body.condition
    tribute.winner = req.body.winner
    tribute.status = req.body.status
    tribute.wanted = req.body.wanted
    tribute.imageUrl = req.body.imageUrl
    console.log(tribute)
    let id = req.params.id
    try{
        let doc = await Tribute.findByIdAndUpdate(id, tribute)
        res.redirect(`/`)
    }catch(err){
        res.render(`edit`, {error: err, body: req.body})
    }
}



const deleteTribute = async(req, res) => {
    console.log(`ÈNTROU`)
    let idTribute = req.params.id
    console.log(idTribute)
    if(!idTribute){
        console.log(`not Ok`)
        idTribute = req.body.id
    }
    try {
        console.log(`OK`)
        await Tribute.findByIdAndDelete(idTribute)
        res.redirect(`back`)
    } catch (error) {
        console.log(`Not Ok, ERROR`)
        res.status(404).send(error)
    }
}

const redDForm = async(req, res) => {
    try {
        res.render("specificDForm")
    } catch (error) {
        res.send("Erro: ", error)
    }
}

const redEditionForm = async(req, res) => {
    try {
        let tributes = await Tribute.find({})
        let allEditions = []
        for(let i=0; i < tributes.length; i++){
            allEditions.push(tributes[i].edition)
        }
        let uniqueEditions = [...new Set(allEditions)].sort((a,b) => a - b)
        res.render("specificEditionForm", {uniqueEditions})
    } catch (error) {
        res.send(error)
    }
}

const specificEdition = async (req, res) => {
    console.log("ok");
    let edition = Number(req.query.edition);
    try {
        let femaleTributes = await Tribute.find({edition, newSex: 1}).sort({district: 1})
        let maleTributes = await Tribute.find({edition, newSex: 2}).sort({district: 1})
        //let tributes = await Tribute.find({edition})
        let tributes = []
        const maxLength = Math.max(femaleTributes.length, maleTributes.length);
        for (let i = 0; i < maxLength; i++) {
            if (femaleTributes[i]) tributes.push(femaleTributes[i]);
            if (maleTributes[i]) tributes.push(maleTributes[i]);
        }

        res.render(`specificEdition`, { tributes });
    } catch (error) {
        console.log("ERRO")
        res.send(error);
    }
};

// let district = Number(req.query.district)
//     try {
//         let tributes = await Tribute.find({district}).sort({edition: 1})
//         res.render("specifDistricTribute", {tributes})
//     } catch (error) {
//         res.send(error)
// }

module.exports = {addTribute, allTributes, districtTribute, wantedTributes, hallOfTheFameTributes, loadTribute, editTribute, deleteTribute, specificEdition, redDForm, redEditionForm, all2_0}





