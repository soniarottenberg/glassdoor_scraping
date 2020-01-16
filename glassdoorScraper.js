const axios = require('axios');
const cheerio = require('cheerio');

// stupid counter
let P = 1
counter = () => { P += 1 }
counter();

let url = `https://www.glassdoor.fr/Emploi/france-int%C3%A9ressement-emplois-SRCH_IL.0,6_IN86_KO7,20_IP${P}.htm`;

urls = []

console.log(P);
console.log(url);

// scraper (static part)
axios(url)
    .then(response => {
    const html = response.data;
    const $ = cheerio.load(html)
    const jobsTable = $('.jlGrid > li');
    console.log(jobsTable.length);
    const glassdoorCompaniesName = [];

    jobsTable.each(function () {
        const name = $(this).find('.jobEmpolyerName').text();
        const description = $(this).find('.jobDetails').text();

        glassdoorCompaniesName.push({
        name,
        description
        });
    });

    console.log(glassdoorCompaniesName);
    })
    .catch(console.error);