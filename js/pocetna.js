var firebaseUrl = "https://wd-sv-76-2022-default-rtdb.firebaseio.com"
var document = "../index.html"

var main = document.getElementById('row-g-2');
var zaHtml = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var agencije = JSON.parse(request.responseText);
                var pretraga = document.getElementById("search-input");
                pretraga.value = "";
                for (var id in agencije) {
                    var agencija = agencije[id];

                    var div1 = document.createElement('div');
                    div1.classList.add('col-6');

                    var div2 = document.createElement('div');
                    div2.classList.add('p-3');

                    var div3 = document.createElement('div');
                    div3.classList.add('row');
                    div3.classList.add('g-0');
                    div3.classList.add('bg-light');
                    div3.classList.add('position-relative');
                   
                    divZaSliku = document.createElement('div');
                    divZaSliku.classList.add('col-md-6');
                    let slika = document.createElement('img');
                    slika.setAttribute("src", agencija.logo);
                    slika.setAttribute("alt", agencija.naziv);
                    slika.classList.add('img-thumbnail');
                    divZaSliku.appendChild(slika);
                    div3.appendChild(divZaSliku);

                    let divInfo = document.createElement('div');
                    divInfo.classList.add('col-md-6');
                    divInfo.classList.add('ps-md-0');

                    let h5 = document.createElement('h5');
                    h5.classList.add('mt-0');
                    let a = document.createElement('a');
                    let link = document.createTextNode(agencija.naziv);
                    a.appendChild(link);
                    a.title = agencija.naziv;
                    a.classList.add('a');
                    a.onclick = stranicaAgencije;
                    a.setAttribute('data-agencijaId', id);
                    h5.appendChild(a);
                    divInfo.appendChild(h5);

                    let p1 = document.createElement('p');
                    p1.classList.add('adresa');
                    let adresa = document.createTextNode('adresa: ');
                    p1.appendChild(adresa);
                    let i1 = document.createElement('i');
                    let adresaAgencije = document.createTextNode(agencija.adresa);
                    i1.appendChild(adresaAgencije);
                    p1.appendChild(i1);
                    divInfo.appendChild(p1);

                    // let p2 = document.createElement('p');
                    // p2.classList.add('godina');
                    // let godina = document.createTextNode('godina otvaranja: ');
                    // p2.appendChild(godina);
                    // let i2 = document.createElement('i');
                    // let godinaAgencije = document.createTextNode(agencija.godina);
                    // i2.appendChild(godinaAgencije);
                    // p2.appendChild(i2);
                    // divInfo.appendChild(p2);

                    let p3 = document.createElement('p');
                    p3.classList.add('telefon');
                    let telefon = document.createTextNode('broj telefona: ');
                    p3.appendChild(telefon);
                    let i3 = document.createElement('i');
                    let telefonAgencije = document.createTextNode(agencija.brojTelefona);
                    i3.appendChild(telefonAgencije);
                    p3.appendChild(i3);
                    divInfo.appendChild(p3);

                    let p4 = document.createElement('p');
                    p4.classList.add('email');
                    let email = document.createTextNode('email: ')
                    p4.appendChild(email);
                    let i4 = document.createElement('i');
                    let mejlAgencije = document.createTextNode(agencija.email);
                    i4.appendChild(mejlAgencije);
                    p4.appendChild(i4);
                    divInfo.appendChild(p4);

                    div3.appendChild(divInfo);   
                    div2.appendChild(div3);
                    div1.appendChild(div2);                   
                    main.appendChild(div1);
                }
            }
        }
    }
    request.open('GET', firebaseUrl + '/agencije/.json');
    request.send();
};

function stranicaAgencije(){
    let hiperlink = this;
    let agencijaId = hiperlink.getAttribute('data-agencijaId');
    window.location.href = 'agencija.html?id=' + agencijaId;
}

zaHtml();


function ucitajDest(callback) {
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var destinacije = JSON.parse(request1.responseText);
            callback(destinacije);
        }
    }
    request1.open('GET', firebaseUrl + '/destinacije/.json');
    request1.send();
}

function ucitajAgenc(callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let agencije = JSON.parse(request.responseText);
            callback(agencije);
        }
    }
    request.open('GET', firebaseUrl + '/agencije/.json');
    request.send();
}

let search = document.getElementById("search-input");
let searchTimeout;
function pretraga(event) {    
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function() {
    let fraza = search.value.toLowerCase();

    if (fraza != "") {
        ukloniKartice();
        ucitajAgenc(function(agencije) {
            ucitajDest(function(destinacije) {
                ukloniKartice();
                petlje: for (var id in agencije) {
                    let agencija = agencije[id];
                    let podudaranjeNazivaAgencije = agencija.naziv.toLowerCase().includes(fraza);
                    for (let destinacijaId in destinacije[agencija.destinacije]) {
                        let destinacija = destinacije[agencija.destinacije][destinacijaId];
                        let podudaranjeDestinacije = destinacija.naziv.toLowerCase().includes(fraza);
                        if (fraza.length == 1 || fraza.length == 0) {
                            fraza = "";
                            ukloniKartice();
                            zaHtml();
                            break petlje;
                        }                       
                        if (podudaranjeDestinacije || podudaranjeNazivaAgencije){
                            var main = document.getElementById('row-g-2');

                            var div1 = document.createElement('div');
                            div1.classList.add('col-6');

                            var div2 = document.createElement('div');
                            div2.classList.add('p-3');

                            var div3 = document.createElement('div');
                            div3.classList.add('row');
                            div3.classList.add('g-0');
                            div3.classList.add('bg-light');
                            div3.classList.add('position-relative');
                        
                            divZaSliku = document.createElement('div');
                            divZaSliku.classList.add('col-md-6');
                            let slika = document.createElement('img');
                            slika.setAttribute("src", agencija.logo);
                            slika.setAttribute("alt", agencija.naziv);
                            slika.classList.add('img-thumbnail');
                            divZaSliku.appendChild(slika);
                            div3.appendChild(divZaSliku);

                            let divInfo = document.createElement('div');
                            divInfo.classList.add('col-md-6');
                            divInfo.classList.add('ps-md-0');

                            let h5 = document.createElement('h5');
                            h5.classList.add('mt-0');
                            let a = document.createElement('a');
                            let link = document.createTextNode(agencija.naziv);
                            a.appendChild(link);
                            a.title = agencija.naziv;
                            a.classList.add('a');
                            a.onclick = stranicaAgencije;
                            a.setAttribute('data-agencijaId', id);
                            h5.appendChild(a);
                            divInfo.appendChild(h5);

                            let p1 = document.createElement('p');
                            p1.classList.add('adresa');
                            let adresa = document.createTextNode('adresa: ');
                            p1.appendChild(adresa);
                            let i1 = document.createElement('i');
                            let adresaAgencije = document.createTextNode(agencija.adresa);
                            i1.appendChild(adresaAgencije);
                            p1.appendChild(i1);
                            divInfo.appendChild(p1);

                            let p3 = document.createElement('p');
                            p3.classList.add('telefon');
                            let telefon = document.createTextNode('broj telefona: ');
                            p3.appendChild(telefon);
                            let i3 = document.createElement('i');
                            let telefonAgencije = document.createTextNode(agencija.brojTelefona);
                            i3.appendChild(telefonAgencije);
                            p3.appendChild(i3);
                            divInfo.appendChild(p3);

                            let p4 = document.createElement('p');
                            p4.classList.add('email');
                            let email = document.createTextNode('email: ')
                            p4.appendChild(email);
                            let i4 = document.createElement('i');
                            let mejlAgencije = document.createTextNode(agencija.email);
                            i4.appendChild(mejlAgencije);
                            p4.appendChild(i4);
                            divInfo.appendChild(p4);

                            div3.appendChild(divInfo);   
                            div2.appendChild(div3);
                            div1.appendChild(div2);                   
                            main.appendChild(div1);

                            var hajlajtNaziv = document.querySelectorAll('.a');
                            hajlajtNaziv.forEach(function(hajlajt){
                                var tekst = hajlajt.innerHTML;
                                let regex = new RegExp(fraza, 'gi');
                                var hajlajtovano = tekst.replace(regex,  match => `<a class="a highlighted">${match}</a>`);
                                hajlajt.innerHTML = hajlajtovano;
                            })
                            break;
                        }
                    } if (event && event.keyCode === 13) {
                        event.preventDefault();
                    }
                }
            });
        });
    };
    if (fraza === "") {
        ukloniKartice();
        zaHtml(); // Poziv funkcije za dodavanje elemenata na stranicu
    }
    }, 250);
}

search.addEventListener('input', pretraga);
search.addEventListener('keydown', pretraga);

function ukloniKartice() {
    var rowElement = document.querySelector('.row.g-2');
    while ( rowElement.firstChild ) rowElement.removeChild( rowElement.firstChild );
}