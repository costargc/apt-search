const fetch = require('node-fetch');
const cheerio = require('cheerio');
var NodeGeocoder = require("node-geocoder");
var fs = require('fs');

var options = {
    // provider: "mapquest",
    provider: 'google',
    // apiKey: grabmykey2(),
    apiKey: grabmykey(),
};



async function APTsearch(urllink, filename) {

    var geocoder = NodeGeocoder(options);
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

            var datapush = [];

            var location = $(element).find('.cd-it-r1-2').html();

            geocoder.geocode(location + "São Paulo", function (err, value) {
                // console.log(JSON.stringify(value[0].latitude, null, 2));
                return value[0]
            }).then(function (valuegeocoder) {

                var address = $(element).find('.cd-it-r1-2').html();
                try { var price1 = $(element).find('.cd-it-r4-v1').html().replace(`<span class="a-step"></span>`, "") } catch (e) { price1 = "" }
                try { var price2 = $(element).find('.cd-it-r4-v2').html().replace(`<span class="a-step"></span>`, "") } catch (e) { price2 = "" }
                try { var classification = $(element).find('.dv-tag-tipo').html() } catch (e) { classification = "" }
                var link = $(element).find('.cd-it-lk').attr("href")

                try { latitude = JSON.stringify(valuegeocoder[0].latitude, null, 2); } catch (e) { latitude = "" }
                try { longitude = JSON.stringify(valuegeocoder[0].longitude, null, 2) } catch (e) { longitude = "" }
                try { zipcode = JSON.stringify(valuegeocoder[0].zipcode, null, 2) } catch (e) { zipcode = "" }


                data = {
                    address: address,
                    price1: price1,
                    price2: price2,
                    classification: classification,
                    link: link,
                    latitude: latitude,
                    longitude: longitude,
                    zipcode: zipcode
                }

                // console.log(data);

                datapush.push(data);
                results.push(data);

            })


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
    'https://www.zukerman.com.br/leilao-de-imoveis/sp/sao-paulo/zona-norte?pagina=',
    'https://www.zukerman.com.br/leilao-de-imoveis/sp/sao-paulo?pagina='
]
filename = [
    "SP_centro",
    "SP_sul",
    "SP_norte",
    "SP_all"
]

// APTsearch(url[0], filename[0]);
// APTsearch(url[1], filename[1]);
// APTsearch(url[2], filename[2]);
APTsearch(url[3], filename[3]);


// place holder
function grabmykey2() {
    p1 = "nIHjbXXUu3HNUkxLo";
    p2 = "63cG64bKe6SSXGk";

    p1 = encrypt(p1, -10);
    p2 = encrypt(p2, -10);

    return p1 + "" + p2

};


function grabmykey() {
    p1 = "KSzaCyLRU4rfdRIZT";
    p2 = "wxWSErZo7TSSUgT9NwRnmS";

    p1 = encrypt(p1, -10);
    p2 = encrypt(p2, -10);

    return p1 + "" + p2

};

function encrypt(msg, key) {
    var encMsg = "";

    for (var i = 0; i < msg.length; i++) {
        var code = msg.charCodeAt(i);

        // Encrypt only letters in 'A' ... 'Z' interval
        if (code >= 65 && code <= 65 + 26 - 1) {
            code -= 65;
            code = mod(code + key, 26);
            code += 65;
        }

        encMsg += String.fromCharCode(code);
    }

    return encMsg;
}

function mod(n, p) {
    if (n < 0)
        n = p - Math.abs(n) % p;

    return n % p;
}