const axios = require('axios');
const cheerio = require('cheerio');

// glassdoor tableau de terme de recherche
let keywords = ["interessement", "CET"]

// tableau d'urls
const urls = keywords.map(item => `https://www.glassdoor.fr/Emploi/france-${item}-emplois-SRCH_IL.0,6_IN86_KO7,20_IP.htm`)

for (let url of urls) {
    console.log(url);
    axios(url)
    .then(response => {
    const html = response.data;
    const $ = cheerio.load(html)
    const jobsTable = $('.jlGrid > li');
    const glassdoorCompaniesName = [];

    jobsTable.each(function () {
        const name = $(this).find('.jobEmpolyerName').text();
        const description = $(this).find('.jobDetails').text();

        glassdoorCompaniesName.push({
        name,
        description
        });
    });
    console.log(typeof glassdoorCompaniesName);
    console.log(glassdoorCompaniesName);
    })
    .catch(console.error);
}
