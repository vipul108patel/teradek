'Author : Vipul Patel   Description : Create extraction process and save data in JSON format'

const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
console.log('running')

ProductData=[];
const links=['https://teradek.com/collections/colr/products/anton-bauer-digital-battery?variant=14579487309869',
            'https://teradek.com/collections/colr/products/anton-bauer-digital-battery?variant=14579104677933',
            'https://teradek.com/collections/colr/products/anton-bauer-digital-battery?variant=14579487277101',
            'https://teradek.com/collections/colr/products/anton-bauer-digital-battery?variant=14579487342637'];
for (li of links){
  axios.get(li)
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      let $ = cheerio.load(res.data);
      let title= $('h1').text().trim();
      let price=$('span[id="current-price"]').text().trim();
      let sku=$('span[data-bind="html: product().selectedVariant().sku"]').text().trim();
      ProductData.push({
        title,price,sku
      });
    json = JSON.stringify(ProductData);
    fs.writeFile('./node_output.json', json, (err) => {
    if (!err) {
        console.log('done');
    }});
})};
