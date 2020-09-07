const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const { age, date } = require('../utils')


exports.index = function(req, res){
    return res.render("members/index", { members: data.members })
}

exports.show = function(req,res){
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return id == member.id
    })

    if(!foundMember) return res.send("Instrutor não encontrado")

    const member = {
        ...foundMember,
        birth: age(foundMember.birth),
    }

    return res.render("members/show", { member })
}

exports.create = function(req, res){
    return res.render("members/create")
}

exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == "") {
            return res.send("Todos os campos são obrigatórios.")
        }
    }

    let { avatar_url, birth, gender, services, name } = req.body    

    birth = Date.parse(birth)
    const id = Number(data.members.length + 1)
    const created_at = Date.now()

    data.members.push({
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

        return res.redirect(`/members/${id}`)
    })
}

exports.edit = function(req,res){
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return id == member.id
    })

    if(!foundMember) return res.send("Instrutor não encontrado")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }

    return res.render('members/edit', {member })
}

//atualizar
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if(id == member.id) {
            index = foundIndex
            return true
        } 
    })

    if(!foundMember) return res.send("Instrutor não encontrado")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Ocorreu um erro")

        return res.redirect(`/members/${id}`)
    })

}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Ocorreu um erro")

        return res.redirect("members")
    })
}
