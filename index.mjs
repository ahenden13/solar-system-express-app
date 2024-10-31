import express from 'express';
const planets = (await import ('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let url = "*confidential*";
    let imgInfo = await fetch(url);
    let imgData = await imgInfo.json();
    console.log(imgData);
    let imgUrl = imgData.urls.raw;
    res.render('home', {'imgUrl': imgUrl});
});

app.get('/nasa', async (req, res) => {
    let date = new Date()
    date.setHours(date.getHours() - 24);
    date = date.toISOString().split("T")[0];
    console.log(date);
    let url = "*confidential*" + date;
    let nasaInfo = await fetch(url);
    let nasaData = await nasaInfo.json();
    console.log(nasaData);
    res.render('nasa', {'nasaData': nasaData});
})

app.get('/nasaCustom', async (req, res) => {
    let day = req.query.day;
    console.log(day);
    let month = req.query.month;
    console.log(month);
    let year = req.query.year;
    console.log(year);
    let date = new Date();
    date.setDate(day);
    date.setMonth(month-1);2
    date.setFullYear(year);
    date.setHours(date.getHours() - 24);
    date = date.toISOString().split("T")[0];
    console.log(date);

    let url = "*confidential*" + date;
    let nasaInfo = await fetch(url);
    
    let nasaData = await nasaInfo.json();
    console.log(nasaData);
    res.render('nasa', {'nasaData': nasaData});
})

app.get('/planetInfo', (req, res) => {
    let body = req.query.planetName;
    let bodyInfo = null;
    if (body == "Comets") {
        bodyInfo = planets.getComets();
    } else if (body == "Asteroids") {
        bodyInfo = planets.getAsteroids();
    }
    console.log(bodyInfo);
    res.render('celestialBody', {'celestialBodyInfo': bodyInfo});
})

app.get('/mercury', (req, res) => {
    let mercuryInfo = planets.getMercury();
    res.render('mercury', {'mercuryData': mercuryInfo});
});

app.get('/venus', (req, res) => {
    let venusInfo = planets.getVenus();
    //console.log(venusInfo);
    res.render('venus', {'venusData': venusInfo});
});

app.get('/mars', (req, res) => {
    let marsInfo = planets.getMars();
    //console.log(marsInfo);
    res.render('mars', {'marsData': marsInfo});
});

app.get('/earth', (req, res) => {
    let earthInfo = planets.getEarth();
    console.log(earthInfo);
    res.render('earth', {'earthData': earthInfo});
});

app.get('/jupiter', (req, res) => {
    let jupiterInfo = planets.getJupiter();
    console.log(jupiterInfo);
    res.render('jupiter', {'jupiterData': jupiterInfo});
});

app.get('/saturn', (req, res) => {
    let saturnInfo = planets.getSaturn();
    console.log(saturnInfo);
    res.render('saturn', {'saturnData': saturnInfo});
});

app.get('/uranus', (req, res) => {
    let uranusInfo = planets.getUranus();
    console.log(uranusInfo);
    res.render('uranus', {'uranusData': uranusInfo});
});

app.get('/neptune', (req, res) => {
    let neptuneInfo = planets.getNeptune();
    console.log(neptuneInfo);
    res.render('neptune', {'neptuneData': neptuneInfo});
});

app.listen(10032, () => {
   console.log('server started');
});
