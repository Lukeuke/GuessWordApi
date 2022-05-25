const express = require('express');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost'

app.use(express.json());

var word;

app.put('/initialize', (req, res) => {

    const id = req.body;

    if(!id) {
        res.status(418).send({
            error: "wrong id"
        })
        return
    }

    console.log(id)

    res.status(200).send({
        id : id.id
    })
})

app.put('/finish', (req, res) => {

    const { finish } = req.body;

    if (!finish) {
        res.status(418).send({
            error: 'no data provided'
        });
        return
    }

    console.log(finish)

    if(finish.word != word) {
        res.status(200).send({
            won: false,
            bonus: 0
        })
        return
    }

    res.status(200).send({
        won: true,
        bonus: 100
    })

    getWord()

});

// called on start
function getWord() {
    axios.get('https://random-word-api.herokuapp.com/word?length=5').then(response => {
        word = response.data;
        console.log("done")
        console.log(word)
    })
    .catch(error => {
        console.log(error);

    res.status(404).send({
        error: 'no word found'
        })
    })
}

getWord()

app.listen(PORT, HOST, () => {
    console.log(`Server is running on address ${HOST} on port ${PORT}`);
})