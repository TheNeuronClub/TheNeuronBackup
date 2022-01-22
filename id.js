
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/user');
const Transaction = require('./models/transaction');
const Question = require('./models/question');
const Bug = require('./models/bug');
const Contact = require('./models/contact');
const Header = require('./models/header');
const QComment = require('./models/qcomment');
const QueCategory = require('./models/queCategory');

// connecting to database
const db = 'mongodb+srv://TheNeuron:TheNeuron@theneuron.ede9a.mongodb.net/TheNeuron?retryWrites=true&w=majority'
mongoose.connect(db)
    .then(() => {
        console.log('Mongodb is connected Successfully !');
    })
    .catch((e) => {
        console.log(e)
    })

function getData() {
    User.aggregate([ // Table Name named as table1
        {
            $lookup:
            {
                from: 'transactions', // table name to join named as table2
                localField: '_id', // table1 common field
                foreignField: 'userId', // table2 common field
                as: 'userTransaction' // new name of field where table2 data join as
            }
        },
        { // put 0 for the fields to hide or 1 to show (either use 0 or 1 fields)
            $project: {
                notification: 0,
                image_url: 0,
                password: 0,
                isNewUser: 0,
                isVerified: 0,
                referred_user: 0,
                referral_code: 0,
                type: 0,
                Tokens: 0
            }
        }
    ]
    ).then(data => {
        var jsonContent = JSON.stringify(data);
        // writing data in a new file
        fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    }
    )

}

getData();