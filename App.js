var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'toko'
});

db.connect();

app.get('/karyawan', (req, res) => {
    var getKaryawan = 'select * from karyawan';
    db.query(getKaryawan, (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send(result);
    });
});


app.post('/karyawan', (req, res) => {
    var tanggal = new Date();
    var tahun = tanggal.getFullYear();

    var datNamLahir = {
        nama: req.body.nama,
        tglLahir: req.body.tglLahir
    }
    var name = datNamLahir.nama
    var tanggalz = datNamLahir.tglLahir.split("-")


    function zodiaxKu(hariXX, bulanXX) {

        if ((bulanXX == 1 && hariXX <= 20) || (bulanXX == 12 && hariXX >= 22)) {
            var zodiax = "Capricornus"
            return zodiax;
        } else if ((bulanXX == 1 && hariXX >= 21) || (bulanXX == 2 && hariXX <= 18)) {
            var zodiax = "Aquarius"
            return zodiax;
        } else if ((bulanXX == 2 && hariXX >= 19) || (bulanXX == 3 && hariXX <= 20)) {
            var zodiax = "Pisces"
            return zodiax;
        } else if ((bulanXX == 3 && hariXX >= 21) || (bulanXX == 4 && hariXX <= 20)) {
            var zodiax = "Aries"
            return zodiax;
        } else if ((bulanXX == 4 && hariXX >= 21) || (bulanXX == 5 && hariXX <= 20)) {
            var zodiax = "Taurus"
            return zodiax;
        } else if ((bulanXX == 5 && hariXX >= 21) || (bulanXX == 6 && hariXX <= 20)) {
            var zodiax = "Gemini"
            return zodiax;
        } else if ((bulanXX == 6 && hariXX >= 22) || (bulanXX == 7 && hariXX <= 22)) {
            var zodiax = "Cancer"
            return zodiax;
        } else if ((bulanXX == 7 && hariXX >= 23) || (bulanXX == 8 && hariXX <= 23)) {
            var zodiax = "Leo"
            return zodiax;
        } else if ((bulanXX == 8 && hariXX >= 24) || (bulanXX == 9 && hariXX <= 23)) {
            var zodiax = "Virgo"
            return zodiax;
        } else if ((bulanXX == 9 && hariXX >= 24) || (bulanXX == 10 && hariXX <= 23)) {
            var zodiax = "Libra"
            return zodiax;
        } else if ((bulanXX == 10 && hariXX >= 24) || (bulanXX == 11 && hariXX <= 22)) {
            var zodiax = "Scorpio"
            return zodiax;
        } else if ((bulanXX == 11 && hariXX >= 23) || (bulanXX == 12 && hariXX <= 21)) {
            var zodiax = "Sagitarius"
            return zodiax;
        }
    }

    var umurXX = tahun - tanggalz[2];

    var data1 = {
        nama: name,
        hari: tanggalz[0],
        bulan: tanggalz[1],
        tahun: tanggalz[2],
        zodiak: zodiaxKu(tanggalz[0], tanggalz[1]),
        usia: umurXX
    }
    var askz = 'Insert ?';
    db.query(askz, data1, (err, result) => {
        if (err) throw err;
        console.log(data1);
        res.send({
            status: 'Success',
            nama: name,
            hari: tanggalz[0],
            bulan: tanggalz[1],
            tahun: tanggalz[2],
            zodiak: zodiaxKu(tanggalz[0], tanggalz[1]),
            usia: umurXX
        })
    });
});


app.listen(3000, () => {
    console.log('Terhubung ke Server @port 3000')
});