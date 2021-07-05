const Component = require('../model/component.model')
const axios = require('axios')

//EJS route render controllers
const index = (req, res, next) => {
    axios.get('http://localhost:3000/api/getAllComponents')
    .then(function(response){
        //console.log(response.data)
        res.render('index',{components : response.data})
    })
    .catch(e => {
        res.send(e)
    })
};

const updateComponentPage = (req, res, next) => {
    //get comp whose id is matching with params Id
    axios.get('http://localhost:3000/api/Component/'+req.query.id)
    .then(function(compToUpdate){
        //console.log(compToUpdate)
        res.render('updateComponent',{component: compToUpdate.data})
    })
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
        console.log('com', component)
        console.log('comName', compName)
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

const getAllComponents = async(req, res, next) => {
    try{
        const components = await Component.find({})
        res.status(200).send(components)
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

const updateComponent = async(req, res, next) => {
    const updates = Object.keys(req.body)
    try{
        const id = req.params.id
        const component = await Component.findById(id)
        //updates all the fields that are given in body by looping
        updates.forEach((update) => component[update] = req.body[update])
        await component.save()
        // res.redirect('/')
        res.send('updated component successfully!')
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

const deleteComponent = async(req, res, next) => {
    try{
        const id = req.params.id
        const component = await Component.findById(id)
        await component.remove()
        res.status(200).send(component)
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

const getComponentById = async(req, res, next) => {
    try{
        const id = req.params.id
        const component = await Component.findById(id)
        res.status(200).send(component)
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

module.exports = {
    addComponent,
    getComponent,
    index,
    addComponentForm,
    getAllComponents,
    getComponentById,
    updateComponent,
    deleteComponent,
    updateComponentPage
}