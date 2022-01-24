var scheduler = require('node-schedule');
var express = require('express')
var fs = require('fs')
const mongoose = require('mongoose');
const User = require('./models/user');
const Transaction = require('./models/transaction');
const Withdraw = require('./models/withdraw');
const Question = require('./models/question');
const Bug = require('./models/bug');
const Contact = require('./models/contact');
const Header = require('./models/header');
const QComment = require('./models/qcomment');
const QueCategory = require('./models/queCategory');
const app = express();
const port = process.env.PORT || 5000
const cloudinary = require("cloudinary").v2;
require('dotenv').config()

const todayDate = new Date().toDateString();

// connecting to database
const db = process.env.DB;
mongoose.connect(db)
    .then(() => {
        console.log('Mongodb is connected Successfully !');
    })
    .catch((e) => {
        console.log(e)
    })

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

function uploadFile(file, filename) {
    // upload image here
    cloudinary.uploader.upload(file, { resource_type: "raw", folder: `${process.env.FOLDER_NAME}/${todayDate}`, tags: filename })
        .then((result) => {
            // console.log(result.secure_url);
            console.log(`${filename}.json uploaded successfully`)
        }).catch((error) => {
            console.log({
                message: "failure",
                error,
            });
        });
}

function writeJson(filename, data) {
    var jsonContent = JSON.stringify(data);
    // writing data in a new file
    fs.writeFile(`backup/${filename}.json`, jsonContent, 'utf8', async function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log(`${filename}.json file has been saved.`);
        await uploadFile(`backup/${filename}.json`, filename)
    });
}



function bug() {
    Bug.find()
        .then((data) => writeJson('bug', data))
        .catch(e => console.log(e))
}
function contact() {
    Contact.find()
        .then((data) => writeJson('contact', data))
        .catch(e => console.log(e))
}
function header() {
    Header.find()
        .then((data) => writeJson('header', data))
        .catch(e => console.log(e))
}
function qcomment() {
    QComment.find()
        .then((data) => writeJson('qcomment', data))
        .catch(e => console.log(e))
}
function queCategory() {
    QueCategory.find()
        .then((data) => writeJson('queCategory', data))
        .catch(e => console.log(e))
}
function withdraw() {
    Withdraw.find()
        .then((data) => writeJson('withdraw', data))
        .catch(e => console.log(e))
}
function question() {
    Question.find()
        .then((data) => writeJson('question', data))
        .catch(e => console.log(e))
}
function transaction() {
    Transaction.find()
        .then((data) => writeJson('transaction', data))
        .catch(e => console.log(e))
}
function user() {
    User.find()
        .then((data) => writeJson('user', data))
        .catch(e => console.log(e))
}

app.get('/', (req, res) => {
    try {
        // (second minute hour dayOfMonth Month dayofweek)
        var dailyJob = scheduler.scheduleJob('0 40 5 * * *', function () {
            // var dailyJob = scheduler.scheduleJob('1 * * * * *', function () {
            console.log('Backup will run everyday at 12:15 AM');
            user();
            transaction();
            question();
            withdraw();
            qcomment();
            header();
            queCategory();
            contact();
            bug();
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: error })
    }
})

// (second minute hour dayOfMonth Month dayofweek)
var dailyJob = scheduler.scheduleJob('0 15 0 * * *', function () {
    // var dailyJob = scheduler.scheduleJob('1 * * * * *', function () {
    console.log('Backup will run everyday at 12:15 AM');
    user();
    transaction();
    question();
    withdraw();
    qcomment();
    header();
    queCategory();
    contact();
    bug();
});

app.listen(port, () => console.log('server running'))
