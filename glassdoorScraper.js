const axios = require('axios');
const cheerio = require('cheerio');

// glassdoor search url
let keywords = ["interessement", "CET"]

// stupid counter
let P = 1
counter = () => { P += 1 }
// counter();

const urls = keywords.map(item => `https://www.glassdoor.fr/Emploi/france-${item}-emplois-SRCH_IL.0,6_IN86_KO7,20_IP${P}.htm`)

for (let url of urls) {
    console.log(url);
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


}
// scraper (static part)
