
window.onload = load

function load(){
let button = document.getElementById("button-show");
let welcome = document.getElementById("welcome");
var chuckSay = document.getElementById("chuckNorris");
button.onclick = getRepositories;
welcome.classList.add("text-animate");
}

function getRepositories(){
  var url = "https://api.github.com/search/repositories?q=";

  if (document.getElementById("search").value){
     url += document.getElementById("search").value;
  }else{
    url += "Javascript";
  }

  request("GET", url).then(function(response){
      document.getElementById('github-repositories').innerHTML = "";
    if (response.data.items.length > 0){
        document.getElementById('github-repositories').appendChild(makeUL(response.data.items));
        document.getElementById("search").value= "";
    }else{
      document.getElementById('github-repositories').innerHTML = "No se encontraron repositorios";
    }
   }).catch(function(err){
    document.getElementById('github-repositories').innerHTML = "Error en el servidor";
   });

}

function makeUL(array) {
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i].full_name));
        list.appendChild(item);
    }
    return list;
}

function getData() {
request("GET", "http://api.icndb.com/jokes/random").then(function(response){
  document.getElementById("chuckNorris").innerHTML = response.data.value.joke;
 }).catch(function(err){
    document.getElementById("chuckNorris").innerHTML = "Error en el servidor";
    document.getElementById("chuckNorris").style.color ="red";
 });

}

function request(method, url){
  return new Promise(function (resolve, reject) {
     var xhr = new XMLHttpRequest();
     xhr.open(method, url);
     xhr.onload = function () {
       console.log(xhr.response);
       if (this.status >= 200 && this.status < 300) {
         resolve({
           status: this.status,
           data:JSON.parse(xhr.response)
         });
       }else{
         reject({
           status: this.status,
           data:JSON.parse(xhr.response)
         });
       }
     };
     xhr.onerror = function () {
       reject({
         status: this.status,
         data: xhr.response
       });
     };
     xhr.send();
   });
  }
