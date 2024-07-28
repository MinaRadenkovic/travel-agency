var firebaseUrl = "https://wd-sv-76-2022-default-rtdb.firebaseio.com";
var document = "../index.html";

const id = window.location.search;
const ajdi = id.substring(4);

var idDestinacija;
var zaglavlje = document.getElementById("zaglavlje");
var naziv = document.getElementById("naziv");
var logoSlika = document.getElementById("logoSlika");
var adresa = document.getElementById("adresaAgencije");
var godina = document.getElementById("godina");
var telefon = document.getElementById("tel");
var mejl = document.getElementById("mejlAgencije");

var oAgenciji = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var agencija = JSON.parse(request.responseText);

                let slika = document.createElement('img');
                slika.setAttribute("src", agencija.logo);
                slika.setAttribute("alt", agencija.naziv);
                slika.classList.add('img-thumbnail');
                logoSlika.appendChild(slika);

                var zaglavljeStranice = document.createTextNode(agencija.naziv);
                zaglavlje.appendChild(zaglavljeStranice);
                var nazivAgencije = document.createTextNode(agencija.naziv);
                naziv.appendChild(nazivAgencije);
                var adresaAgencije = document.createTextNode(agencija.adresa);
                adresa.appendChild(adresaAgencije);
                var godinaOtvaranja = document.createTextNode(agencija.godina);
                godina.appendChild(godinaOtvaranja);
                var brojTelefona = document.createTextNode(agencija.brojTelefona);
                telefon.appendChild(brojTelefona);
                var email = document.createTextNode(agencija.email);
                mejl.appendChild(email);

                idDestinacija = agencija.destinacije;
            }
        }                
    }
    request.open('GET', firebaseUrl + '/agencije/' + ajdi + '.json');
    request.send();
}

var destinacijeKojeSeNude = function () {
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var destinacijePojedinacneAgencije = JSON.parse(request1.responseText);
                var pretraga = document.getElementById("search-input");
                pretraga.value = "";
                for (var sifra in destinacijePojedinacneAgencije){
                    if (sifra == idDestinacija){
                        for (var pojedinacnaDestinacija in destinacijePojedinacneAgencije[sifra]){
                            var divZaDestinacije = document.getElementById('divZaDestinacije');

                            var div1 = document.createElement('div');
                            div1.classList.add('col');

                            var div2 = document.createElement('div');
                            div2.classList.add('card');
                            
                            var div3 = document.createElement('div');
                            div3.classList.add('carousel');
                            div3.classList.add('slide');
                            div3.dataset.ride = 'carousel';
                            div3.setAttribute('id', 'carouselExampleSlidesOnly');

                            var div4 = document.createElement('div');
                            div4.classList.add('carousel-inner');

                            var carouselItems = [];

                            for (var slika in destinacijePojedinacneAgencije[sifra][pojedinacnaDestinacija].slike){
                                var div5 = document.createElement('div');
                                div5.classList.add('carousel-item');
                                carouselItems.push(div5);

                                var imgTag = document.createElement('img');
                                imgTag.classList.add('d-blok');
                                imgTag.classList.add('w-100');
                                imgTag.classList.add('card-img-top');
                                imgTag.setAttribute('src', destinacijePojedinacneAgencije[sifra][pojedinacnaDestinacija].slike[slika]);
                                imgTag.setAttribute('alt', 'slides');

                                div5.appendChild(imgTag);
                                div4.appendChild(div5);
                            }

                            div3.appendChild(div4);

                            var trenutnaSlika = 0;
                            carouselItems[trenutnaSlika].classList.add('active');

                            var promeniSliku = (function (cItems, slikaZaPromenu){
                                return function () {
                                    cItems[slikaZaPromenu].classList.remove('active');
                                    slikaZaPromenu = (slikaZaPromenu + 1) % cItems.length;
                                    cItems[slikaZaPromenu].classList.add('active');
                                }
                            })(carouselItems, trenutnaSlika);

                            setInterval(promeniSliku, 5000);

                            var divNaziv = document.createElement('div');
                            divNaziv.classList.add('card-body');
                            var h5 = document.createElement('h5');
                            h5.classList.add('card-title');
                            let a = document.createElement('a');
                            let link = document.createTextNode(destinacijePojedinacneAgencije[sifra][pojedinacnaDestinacija].naziv);
                            a.appendChild(link);
                            a.title = destinacijePojedinacneAgencije[sifra][pojedinacnaDestinacija].naziv;
                            a.classList.add('a');
                            a.onclick = stranicaDestinacije;
                            a.setAttribute('data-destinacijaId', sifra +'/' + pojedinacnaDestinacija);

                            h5.appendChild(a);
                            divNaziv.appendChild(h5);
                            div2.appendChild(div3);
                            div2.appendChild(divNaziv);
                            div1.appendChild(div2);
                            divZaDestinacije.appendChild(div1);
                        }                  
                    }
                }
            }
        }
    }
    request1.open('GET', firebaseUrl + '/destinacije' + '.json');
    request1.send();
}

function stranicaDestinacije(){
    let hiperlink = this;

    let destinacijaId = hiperlink.getAttribute('data-destinacijaId');
    window.location.href = 'destinacija.html?id=' + destinacijaId;
}

oAgenciji();
destinacijeKojeSeNude();

function ucitajDest(callback) {
    var request1 = new XMLHttpRequest();
    request1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var destinacije = JSON.parse(request1.responseText);
            callback(destinacije);
        }
    }
    request1.open('GET', firebaseUrl + '/destinacije/' + idDestinacija + '.json');
    request1.send();
}

let search = document.getElementById("search-input");
let searchTimeout;
function pretraga(event) {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function() {
        let fraze = search.value.toLowerCase().split(" ");
        if (fraze != ""){
            ucitajDest(function(destinacije){
                ukloniKartice();
                petlje: for (var id in destinacije){
                    let destinacija = destinacije[id];
                    for (var fraza in fraze){
                        let podudaranjeNazivaDest = destinacija.naziv.toLowerCase().includes(fraze[fraza]);
                        let podudaranjeTipDest = destinacija.tip.toLowerCase().includes(fraze[fraza]);
                        let podudaranjePrevoz = destinacija.prevoz.toLowerCase().includes(fraze[fraza]);
                        if (fraze[fraza].length == 1 || fraze[fraza].length == 0){
                            ukloniKartice();
                            destinacijeKojeSeNude();
                            break petlje;
                        }

                        if ((podudaranjeNazivaDest || podudaranjeTipDest || podudaranjePrevoz) && (fraze[fraza] != "")){
                            var divZaDestinacije = document.getElementById('divZaDestinacije');

                            var div1 = document.createElement('div');
                            div1.classList.add('col');

                            var div2 = document.createElement('div');
                            div2.classList.add('card');
                            
                            var div3 = document.createElement('div');
                            div3.classList.add('carousel');
                            div3.classList.add('slide');
                            div3.dataset.ride = 'carousel';
                            div3.setAttribute('id', 'carouselExampleSlidesOnly');

                            var div4 = document.createElement('div');
                            div4.classList.add('carousel-inner');

                            var carouselItems = [];

                            for (var slika in destinacije[id].slike){
                                var div5 = document.createElement('div');
                                div5.classList.add('carousel-item');
                                carouselItems.push(div5);

                                var imgTag = document.createElement('img');
                                imgTag.classList.add('d-blok');
                                imgTag.classList.add('w-100');
                                imgTag.classList.add('card-img-top');
                                imgTag.setAttribute('src', destinacije[id].slike[slika]);
                                imgTag.setAttribute('alt', 'slides');

                                div5.appendChild(imgTag);
                                div4.appendChild(div5);
                            }

                            div3.appendChild(div4);

                            var trenutnaSlika = 0;
                            carouselItems[trenutnaSlika].classList.add('active');

                            var promeniSliku = (function (cItems, slikaZaPromenu){
                                return function () {
                                    cItems[slikaZaPromenu].classList.remove('active');
                                    slikaZaPromenu = (slikaZaPromenu + 1) % cItems.length;
                                    cItems[slikaZaPromenu].classList.add('active');
                                }
                            })(carouselItems, trenutnaSlika);

                            setInterval(promeniSliku, 5000);

                            var divNaziv = document.createElement('div');
                            divNaziv.classList.add('card-body');
                            var h5 = document.createElement('h5');
                            h5.classList.add('card-title');
                            let a = document.createElement('a');
                            let link = document.createTextNode(destinacije[id].naziv);
                            a.appendChild(link);
                            a.title = destinacije[id].naziv;
                            a.classList.add('a');
                            a.onclick = stranicaDestinacije;
                            a.setAttribute('data-destinacijaId', idDestinacija + '/' + id);

                            h5.appendChild(a);
                            divNaziv.appendChild(h5);
                            div2.appendChild(div3);
                            div2.appendChild(divNaziv);
                            div1.appendChild(div2);
                            divZaDestinacije.appendChild(div1);

                            var hajlajtNaziv = document.querySelectorAll('.a');
                            hajlajtNaziv.forEach(function(hajlajt){
                                var tekst = hajlajt.innerHTML;
                                let regex = new RegExp(fraze[fraza], 'gi');
                                var hajlajtovano = tekst.replace(regex,  match => `<a class="a highlighted">${match}</a>`);
                                hajlajt.innerHTML = hajlajtovano;
                            })
                            break;
                        }
                    } if (event && event.keyCode === 13) {
                        event.preventDefault();
                    }
                }
            })
        } if (fraze == "") {
            ukloniKartice();
            destinacijeKojeSeNude();
        }
    }, 250);
}

search.addEventListener('input', pretraga);
search.addEventListener('keydown', pretraga);

function ukloniKartice() {
    var rowElement = document.querySelector('#divZaDestinacije');
    while ( rowElement.firstChild ) rowElement.removeChild( rowElement.firstChild );
}