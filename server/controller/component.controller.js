const Component = require('../model/component.model')
const axios = require('axios')

//EJS route render controllers
const index = (req, res, next) => {
    res.render('index')
};

const addComponentForm = (req, res, next) => {
    res.render('addComponentForm', {});
};

//API routes
const addComponent = async(req,res) => {
    try{
        if(!req.body){
            res.send('Fill all the fields')
        }
        else{
            //console.log('body',req.body)
            const component = await new Component(req.body).save()
            //res.status(201).send(component)
            res.redirect('/addComponent')
        }
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

const getComponent = async (req, res, next) => {
    function indexOfSmallest(a) {
        return a.indexOf(Math.min.apply(Math, a));
    }
    try{
        const compName = req.params.name.toLowerCase().trim()
        if(!compName){
            return res.status(404).send('Nothing to Display')
        }
        const component = await Component.find({'name':compName})
        //console.log('com', component)
        //res.send(component)
        if(component.length > 0){
            let compIndex = 0
            if(component.length > 1){
                let codeLinesLengthArray = []
                component.forEach((comp) => {
                    var codeLines = comp.code.split(";")
                    codeLinesLengthArray.push(codeLines.length)
                })
                compIndex = indexOfSmallest(codeLinesLengthArray)
            }
            const code = component[compIndex].code
            const codeArray = code.split(";")
            //console.log(codeArray)
            let codeString = ""
            codeArray.forEach((line) => {
                codeString = codeString + line +";\n"
            })
            //console.log(codeString)
            res.render('viewCode',{name: component[compIndex].name, code : codeString})
        }
        else{
            res.render('viewCode', {name: "", code : ""})
        }
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

module.exports = {
    addComponent,
    getComponent,
    index,
    addComponentForm
}