const { log } = require('console');
const {parse} = require('csv-parse');
const fs = require('fs');

const habitable = [];

function isHabitablePlanted(planet){
   return planet["koi_disposition"] === "CONFIRMED"
   && planet['koi_insol'] > 0.36 
   && planet['koi_insol'] < 1.11
   && planet['koi_prad'] < 1.6; 
}

fs.createReadStream('./keplar_data.csv')
    .pipe(parse({
        comment: "#",
        columns: true,
        delimiter: ","
    }))
    .on('data', data =>{
        if(isHabitablePlanted(data))
        habitable.push(data);
    })
    .on('error',error=>{
        console.log(`Error : ${error}`)
    })
    .on('end', ()=>{
        console.log(habitable.map(planet => planet.kepler_name));
        console.log(`${habitable.length} habitable plants found.`);
        console.log('processing done.')
    })
// parse();