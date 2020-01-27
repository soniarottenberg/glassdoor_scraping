const axios = require('axios');
const cheerio = require('cheerio');

// glassdoor tableau de terme de recherche
const keywords = ["interessement", "prime-de-participation", "compte-epargne-temps"]

// tableau d'urls
const urls = keywords.map(keyword => `https://www.glassdoor.fr/Emploi/france-${keyword}-emplois-SRCH_IL.0,6_IN86_KO7,20.htm`)

const foo = () => {
    for (let url of urls) {

        axios(url)
        .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const jobsTable = $('.jlGrid > li');
        const glassdoorCompaniesName = [];

        jobsTable.each(function () {
            const name = $(this).find('.jobEmpolyerName').text();
            glassdoorCompaniesName.push({
                url,
                name
            });
        });
        console.log(glassdoorCompaniesName);
        })
        .catch(console.error);
    }
}



foo();