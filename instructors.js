const fs = require('fs')
const data = require('./data.json')
const Intl = require('intl')
const { age, date } = require('./utils')

//show
exports.show = function(req,res){
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if(!foundInstructor) return res.send("Instrutor não encontrado")

    const instructor = {
        ...foundInstructor,
        birth: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }

    return res.render("instructors/show", { instructor: foundInstructor })
}

// create
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == "") {
            return res.send("Todos os campos são obrigatórios.")
        }
    }

    let { avatar_url, birth, gender, services, name } = req.body    

    birth = Date.parse(birth)
    const id = Number(data.instructors.length + 1)
    const created_at = Date.now()

    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        created_at,
        gender,
        services
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na escrita")

        return res.redirect("/instructors")
    })
}

//edit
exports.edit = function(req,res){
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if(!foundInstructor) return res.send("Instrutor não encontrado")

    date(foundInstructor.birth)

    return res.render('instructors/edit', {instructor: foundInstructor})
}

//detele

