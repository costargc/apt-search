const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function APTsearch() {
    const url = 'https://www.zukerman.com.br/leilao-de-imoveis/sp/sao-paulo/centro?pagina=1';
    // const url = 'https://www.zukerman.com.br/leilao-de-imoveis/sp/sao-paulo/zona-sul?pagina=1';
    // const url = 'https://www.zukerman.com.br/leilao-de-imoveis/sp/sao-paulo/zona-norte?pagina=1';

    console.log(url);
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body, { decodeEntities: false });

    $('.cd-0').each(function (index, element) {
        results = [];

        address = $(element).find('.cd-it-r1-2').html();
        try { price1 = $(element).find('.cd-it-r4-v1').html().replace(`<span class="a-step"></span>`, "") } catch (e) { price1 = "" }
        try { price2 = $(element).find('.cd-it-r4-v2').html().replace(`<span class="a-step"></span>`, "") } catch (e) { price2 = "" }
        link = $(element).find('.cd-it-lk').attr("href")

        data = {
            address: address,
            price1: price1,
            price2: price2,
            link: link
        }

        results.push(data);

        console.log(results);
        return results
    })

}

APTsearch();