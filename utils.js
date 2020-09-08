module.exports = {
    age: function (timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        if(month < 0 || month == 0 &&  today.getDate() < birthDate.getDate()){
            age = age - 1
        }
    
        return age
    },
    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth()+1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            birthDay: `${day}/${month}`,
            iso: `${year}-${month}-${day}`
        }
    },
    typeBlood: function(blood){
        let typeBlood

        if(blood == "A1") return typeBlood = "A+"
        if(blood == "A2") return typeBlood = "A-"
        if(blood == "B1") return typeBlood = "B+"
        if(blood == "B2") return typeBlood = "B-"
        if(blood == "AB1") return typeBlood = "AB+"
        if(blood == "AB2") return typeBlood = "AB-"
        if(blood == "O1") return typeBlood = "O+"
        if(blood == "O2") return typeBlood = "O-"
    }
}

