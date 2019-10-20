const fetch = require('node-fetch');
const cheerio = require('cheerio');
var fs = require('fs');

async function APTsearch(urllink, filename) {
    var results = [];
    var i = 1;
    var checkloop = true;

    while (checkloop) {

        checkloop = false;

        const url = urllink + i;


        console.log(url);
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load(body, { decodeEntities: false });

        await $('.cd-0').each(function (index, element) {

            datapush = [];

            address = $(element).find('.cd-it-r1-2').html();
            try { price1 = $(element).find('.cd-it-r4-v1').html().replace(`<span class="a-step"></span>`, "") } catch (e) { price1 = "" }
            try { price2 = $(element).find('.cd-it-r4-v2').html().replace(`<span class="a-step"></span>`, "") } catch (e) { price2 = "" }
            try { classification = $(element).find('.dv-tag-tipo').html() } catch (e) { classification = "" }
            link = $(element).find('.cd-it-lk').attr("href")

            data = {
                address: address,
                price1: price1,
                price2: price2,
                classification: classification,
                link: link
            }

            datapush.push(data);
            results.push(data);


            if ($(element).length * 1 == 1) {
                checkloop = true;
            }
            else {
                return results;

            }

        })

        if (checkloop) {
            i = i + 1;
        }
        else {
            fs.writeFile("./scraping/" + filename + ".json", JSON.stringify(results), function (err) {
                if (err) { console.log(err); }
            })
        }
    }
}


url = [
    'https://www.zukerman.com.br/leilao-de-imoveis/sp/sao-paulo/centro?pagina=',
    'https://www.zukerman.com.br/leilao-de-imoveis/sp/sao-paulo/zona-sul?pagina=',
    'https://www.zukerman.com.br/leilao-de-imoveis/sp/sao-paulo/zona-norte?pagina='
]
filename = [
    "SP_centro",
    "SP_sul",
    "SP_norte"
]

for (var i=0; i < url.length; i++) {
    APTsearch(url[i], filename[i]);
}

