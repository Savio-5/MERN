const express = require('express')
const cors = require('cors')
const app = express()

const PhoneBook = require('./models/phonebookModel')

app.use(cors)
app.use(express.json())

app.get('/api/phonebook', (req,res) => {
    try {
        PhoneBook.find({}).then(result => {
            res.status(200).json(result)
        })
    } catch (error) {
        next(error)
    }
})

app.post('/api/phonebook/insert-record', (req, res, next) => {
    const { name, number } = req.body

    PhoneBook.exists({ number: number })
        .then(result => {
            if (!result) {
                const phonebook = new PhoneBook({
                    name: name,
                    number: number
                })

                try {
                    phonebook.save().then(result => {
                        if (result) {
                            console.log(`added ${result.name} number ${result.number} to phonebook`)
                        }
                        PhoneBook.find({}).then(allresult => {
                            res.status(201).json(allresult)
                        })
                    })
                } catch (error) {
                    next(error)
                }
            } else {
                res.status(406).json({ error: 'name must be unique' })
            }
        }
    )
})

app.put("/api/phonebook/:id", (req, res, next) => {
    const { name, number } = req.body
    const id = req.params.id

    try {
        PhoneBook.findByIdAndUpdate(
            id,
            { name, number }
        )
            .then((updatedRecord) => {
                res.status(202).json(updatedRecord);
            })
    } catch (error) {
        next(error)
    }
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    try {
        PhoneBook.findByIdAndDelete(id).then(result => {
            res.status(204).end()
        })
    } catch (error) {
        next(error)
    }
})

app.use((req, res, next) => {
    res.status(404).json({ error: 'unknown endpoint' })
})

app.use((error, req, res, next) => {
    console.error(error)
    next(error)
})

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
})