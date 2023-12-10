const {parse} = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('./keplar_data.csv')
    .on('data', data =>{
        results.push(data);
    })
    .on('error',error=>{
        console.log(`Error : ${error}`)
    })
    .on('end', ()=>{
        console.log(results);
        console.log('processing done.')
    })
// parse();