const axios = require('axios');
const cheerio = require('cheerio');

// glassdoor tableau de terme de recherche
let keywords = ["interessement", "prime-de-participation", "compte-epargne-temps"]

// tableau d'urls
const urls = keywords.map(keyword => `https://www.glassdoor.fr/Emploi/france-${keyword}-emplois-SRCH_IL.0,6_IN86_KO7,20.htm`)

const foo = () => {
    for (let url of urls) {
        console.log(url);
        axios(url)
        .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const jobsTable = $('.jlGrid > li');
        const searchBar = $('.search-bar > input');
        const glassdoorCompaniesName = [];

        jobsTable.each(function () {
            const name = $(this).find('.jobEmpolyerName').text();
            glassdoorCompaniesName.push({
                name
            });
        });

        searchBar.each(function () {
            const search = $(this).find('.keyword').text();
            glassdoorCompaniesName.push({
                search
            });
        });

        console.log(glassdoorCompaniesName);
        })
        .catch(console.error);
    }
}

foo();