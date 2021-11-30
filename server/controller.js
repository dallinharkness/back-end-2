const houseData = require('./db.json')
const houseId = 4

module.exports = {
    getHouses: (req,res) => res.status(200).send(houseData),//sends the db.json to the frontend

    deleteHouse: (req,res) => {
        let newDelete = houseData.findIndex(elem => elem.id === +req.params.id)
        houseData.splice(newDelete, 1)
        res.status(200).send(houseData)//.send is what puts the data to the frontend
    },

    createHouse: (req,res) => {
        let {id, address, price, imageURL} = req.body
        let newHouse ={
            id: houseId,//making this object is creating the object for the frontend
            address,
            price,
            imageURL
        }
        houseData.push(newHouse)//this pushes the house to the frontend after creating your new house
        res.status(200).send(houseData)
        houseId++
    },  

    updateHouse: (req,res) => {
        let {id} = req.params//this helps to determine which house to update
        let{type} = req.body
        let newDelete = houseData.findIndex(elem => +elem.id === +id)
        if(houseData[newDelete].price <= 10000 && type === 'minus'){
            houseData[newDelete].price = 0
            res.status(200).send(houseData)
        }else if (type === 'plus'){
            houseData[newDelete].price += 10000
            res.status(200).send(houseData)
        }else if (type === 'minus') {
            houseData[newDelete].price -= 10000
            res.status(200).send(houseData)
        }else{
            res.sendStatus(400)
        }

    }



}

