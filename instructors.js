const fs = require('fs')
const data = require("./data.json")

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

        return res.redirect("instructors")
    })
}

//update

//detele
