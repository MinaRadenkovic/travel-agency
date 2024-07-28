var firebaseUrl = "https://wd-sv-76-2022-default-rtdb.firebaseio.com";
var document = "../izmenaDestinacija.html";

const id = window.location.search;
const ajdi = id.substring(4);

getdestinacije();

function getdestinacije(){
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(this.readyState==4){
      if(this.status==200){
        removeTableRows('sveDestinacije');
        let destinacije = JSON.parse(this.responseText);
        for(let id in destinacije){
          let destinacija = destinacije[id];
          appendDestinacijeRow("sveDestinacije", id, destinacija);
        }
      }
    }
  }
  request.open('GET',firebaseUrl.concat('/destinacije/' + ajdi + '.json'));
  request.send();
}

function appendDestinacijeRow(tbodyId,destinacijaId,destinacija){

  let destinacijaTr = document.createElement('tr');

  let nazivTd = document.createElement('td');
  nazivTd.innerText = destinacija.naziv;
  destinacijaTr.appendChild(nazivTd);

  let cenaTd = document.createElement('td');
  cenaTd.innerText = destinacija.cena;
  destinacijaTr.appendChild(cenaTd);

  let maxTd = document.createElement('td');
  maxTd.innerText = destinacija.maxOsoba;
  destinacijaTr.appendChild(maxTd);

  let editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.innerText = 'Izmeni';
  editBtn.setAttribute('data-destinacijaId', ajdi + "/" + destinacijaId);
  editBtn.onclick = showEditPage;

  let editTd = document.createElement('td');
  editTd.appendChild(editBtn);
  editBtn.classList.add("btn");
  editBtn.classList.add("btn-outline-success");
  destinacijaTr.appendChild(editTd);

  let deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.classList.add("obrisi");
  deleteBtn.classList.add("btn");
  deleteBtn.classList.add("btn-outline-success");
  deleteBtn.style.backgroundColor = "red";
  deleteBtn.style.color = "white";
  deleteBtn.innerText = 'Obrisi';
  
  deleteBtn.setAttribute('data-destinacijaId', destinacijaId);
  deleteBtn.addEventListener("click", function() {
    deleteDestinaciju(this.getAttribute("data-destinacijaId")); 
  });
  
  let deleteTd = document.createElement('td');
  deleteTd.appendChild(deleteBtn);
  destinacijaTr.appendChild(deleteTd);

  let tbody = document.getElementById(tbodyId);
  tbody.appendChild(destinacijaTr);
}

function showEditPage(){
  let clickedBtn = this;
  let destinacijaId = clickedBtn.getAttribute('data-destinacijaId');
  window.location.href = 'dodajDestinaciju.html?id=' + ajdi + "/" + destinacijaId;
}

function deleteDestinaciju(destinacija) {
  let destinacijaId = destinacija;
  let naziv = "";

  var popupDiv = document.createElement("div");
  popupDiv.id = "obrisipopup";
  popupDiv.className = "obrisipopup";
  popupDiv.classList.add("active");

  var contentDiv = document.createElement("div");
  contentDiv.className = "popup-content";

  var heading = document.createElement("h2");
  heading.textContent = "Obriši destinaciju?";

  var paragraph = document.createElement("p");

  var requestZaNaziv = new XMLHttpRequest();
  requestZaNaziv.onreadystatechange = function(){
    if(this.readyState==4){
      if(this.status==200){
        let destinacije = JSON.parse(this.responseText);
        for(let id in destinacije){
          let d = destinacije[id];
          if (destinacija == id){
            naziv = d.naziv;
            break;
          }
        }
        paragraph.textContent = "Da li ste sigurni da želite da obrišete destinaciju " + naziv + "?";
      }
    }
  }
  requestZaNaziv.open('GET',firebaseUrl.concat('/destinacije/' + ajdi + '.json'));
  requestZaNaziv.send();
  
  var buttonsDiv = document.createElement("div");
  buttonsDiv.className = "buttons";

  var potvrdiBtn = document.createElement("button");
  potvrdiBtn.textContent = "Potvrdi";

  potvrdiBtn.addEventListener("click", function() {
    let deleteRequest = new XMLHttpRequest();

    deleteRequest.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          getdestinacije();
          document.getElementById("obrisipopup").classList.remove("active");
          let popupDiv = document.getElementById("obrisipopup");
          popupDiv.remove(); 
          console.log(destinacijaId)       
        }
      }
    };
    deleteRequest.open('DELETE', firebaseUrl.concat('/destinacije/',ajdi, "/", destinacijaId, '/.json'));
    deleteRequest.send();
  });

  var otkaziBtn = document.createElement("button");
  otkaziBtn.textContent = "Otkaži";
  otkaziBtn.onclick = function(){
    document.getElementById("obrisipopup").classList.remove("active");
    let popupDiv = document.getElementById("obrisipopup");
    popupDiv.remove();  
  }

  buttonsDiv.appendChild(potvrdiBtn);
  buttonsDiv.appendChild(otkaziBtn);

  contentDiv.appendChild(heading);
  contentDiv.appendChild(paragraph);
  contentDiv.appendChild(buttonsDiv);

  popupDiv.appendChild(contentDiv);

  document.body.appendChild(popupDiv);
}

function removeTableRows(tBodyId){
  let tBody = document.getElementById(tBodyId);

  while(tBody.firstChild){
    tBody.removeChild(tBody.lastChild);
  }
}

function showEditPage(){
  let clickedBtn = this;

  let destinacijaId = clickedBtn.getAttribute('data-destinacijaId');
  window.location.href = 'editDest.html?id='+ destinacijaId;
}

document.querySelector("#izmeni").addEventListener("click", function(){
  window.location.href = 'newDest.html?id=' + ajdi;
});