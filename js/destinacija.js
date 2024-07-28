var firebaseUrl = "https://wd-sv-76-2022-default-rtdb.firebaseio.com";
var document = "../index.html";

const id = window.location.search;
const ajdi = id.substring(4);

var idDestinacija;
var zaglavlje = document.getElementById("zaglavlje")
var naziv = document.getElementById("nazivDestinacije");
var opis = document.getElementById('opis');
var tip = document.getElementById('tip');
var prevoz = document.getElementById('prevoz');
var cena = document.getElementById('cena');
var maxOsoba = document.getElementById('maxOsoba');
var slicice = document.getElementById('slicice');

var oDestinaciji = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var destinacija = JSON.parse(request.responseText);

                var zaglavljeStranice = document.createTextNode(destinacija.naziv);
                zaglavlje.appendChild(zaglavljeStranice);
                var nazivDestinacije = document.createTextNode(destinacija.naziv);
                naziv.appendChild(nazivDestinacije);
                var opisDestinacije = document.createTextNode(destinacija.opis);
                opis.appendChild(opisDestinacije);
                var tipDestinacije = document.createTextNode(destinacija.tip);
                tip.appendChild(tipDestinacije);
                var prevozDestinacije = document.createTextNode(destinacija.prevoz);
                prevoz.appendChild(prevozDestinacije);
                var cenaDestinacije = document.createTextNode(destinacija.cena);
                cena.appendChild(cenaDestinacije);
                var maxOsobaDestinacije = document.createTextNode(destinacija.maxOsoba);
                maxOsoba.appendChild(maxOsobaDestinacije);

                var carouselItems = [];

                for (var i in destinacija.slike){
                    var divZaSliku = document.createElement('div');
                    divZaSliku.classList.add('carousel-item');
                    var image = document.createElement('img');
                    image.classList.add('d-block');
                    image.classList.add('w-100');
                    image.setAttribute('alt', 'slika');
                    image.setAttribute('src', destinacija.slike[i]);
                    divZaSliku.appendChild(image);
                    carouselItems.push(divZaSliku);
                    slicice.appendChild(divZaSliku);
                }

                var trenutnaSlika = 0;
                carouselItems[trenutnaSlika].classList.add('active')

                var promeniSliku = (function (cItems, slikaZaPromenu){
                    return function(){
                    cItems[slikaZaPromenu].classList.remove('active');
                    slikaZaPromenu = (slikaZaPromenu + 1) % cItems.length;
                    cItems[slikaZaPromenu].classList.add('active');
                    }
                })(carouselItems, trenutnaSlika);
                setInterval(promeniSliku, 5000);
            }
        }                
    }
    request.open('GET', firebaseUrl + '/destinacije/' + ajdi + '/.json');
    request.send();
}

document.addEventListener('DOMContentLoaded', function() {
    oDestinaciji();
});