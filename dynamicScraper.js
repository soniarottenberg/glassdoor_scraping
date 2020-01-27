const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = "https://www.glassdoor.fr/Emploi/france-interessement-emplois-SRCH_IL.0,6_IN86_KO7,20.htm"

puppeteer
    .launch()
    .then(browser => browser.newPage)
    .then(page => {
        return page.goto(url).then(function(){
            return.page.content();
        });
    })
    .then(html => {
        const $ = cheerio.load(html);
        const results = []
        $('#Details').push
    })