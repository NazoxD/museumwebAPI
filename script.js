function setHome() {
  document.getElementById("home").style = "display: block";
  document.getElementById("news").style = "display: none";
  document.getElementById("display").style = "display: none";
  document.getElementById("guestbook").style = "display: none";
}

function setNews() {
  document.getElementById("home").style = "display: none";
  document.getElementById("news").style = "display: block";
  document.getElementById("display").style = "display: none";
  document.getElementById("guestbook").style = "display: none";
  getNews();
}

function setDisplay() {
  document.getElementById("home").style = "display: none";
  document.getElementById("news").style = "display: none";
  document.getElementById("display").style = "display: block";
  document.getElementById("guestbook").style = "display: none";
  getDisplay();
}
function setGuestBook() {
  document.getElementById("home").style = "display: none";
  document.getElementById("news").style = "display: none";
  document.getElementById("display").style = "display: none";
  document.getElementById("guestbook").style = "display: block";
}


function getNews() {
const uri= "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
const xhr= new XMLHttpRequest();
xhr.open("GET", uri, true);
xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
xhr.onload= () => {
  const resp= JSON.parse(xhr.responseText);
  displayNews(resp);
}
  xhr.send(null);
}


function displayNews(news) {
  let htmlDisplay = "";
  for (let i = 0; i < news.length; i++) {
    htmlDisplay += "<img class='newsImage' src=" + news[i].enclosureField.urlField + ">";
    htmlDisplay += "<p class='newsTitle'>" + news[i].titleField + "</p>";
    htmlDisplay += "<p class='newsDate'>" + news[i].pubDateField + "</p>";
    htmlDisplay += "<p class='newsDescription'>" + news[i].descriptionField + "</p>";
    htmlDisplay += "<hr class='newsHr'>";
  }
  document.getElementById("newsItems").innerHTML = htmlDisplay;
}


function getDisplay() {
  const uri= "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items";
  const xhr= new XMLHttpRequest();
  xhr.open("GET", uri, true);
  xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
  xhr.onload= () => {
    const resp= JSON.parse(xhr.responseText);
    console.log(resp);
    displayDisplay(resp);
  }
    xhr.send(null);
  }

  function displayDisplay(display) {
    let htmlDisplay = "";
    let uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=";
    for (let i = 0; i < display.length; i++) {
      htmlDisplay += "<img class='newsImage' src=" + uri + display[i].ItemId + ">";
      htmlDisplay += "<p class='newsTitle'>" + display[i].Title + "</p>";
      htmlDisplay += "<p class='newsDescription'>" + display[i].Description +"</p>";
      htmlDisplay += "<hr class='newsHr'>";
    }
    document.getElementById("displayItems").innerHTML = htmlDisplay;
  }
  
  function displaySearch() {
    const xhr= new XMLHttpRequest();
    const term= document.getElementById("searchInput").value;
    const uri= "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=" + term;
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
    xhr.onload= () => {
      const resp= JSON.parse(xhr.responseText);
      displayDisplay(resp);

    }
      xhr.send(null);
    }
  
  



function postComment() {
  const xhr= new XMLHttpRequest();
  const uri= "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=" + document.getElementById("myName").value;
  xhr.open("POST", uri, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload= () => {
    document.getElementById("iframeID").src = document.getElementById("iframeID").src;
    document.getElementById("myName").value = "";
    document.getElementById("myComment").value = "";
  }
  xhr.send(JSON.stringify(document.getElementById("myComment").value));
}
