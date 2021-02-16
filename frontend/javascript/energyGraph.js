function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}



function headname(roomname){
    a = document.createElement("h2");
    a.innerText = "Energy in room " + roomname;
    return a
}

var roomid = getUrlParam('roomid', 'outside')
console.log(roomid)

var namer = headname(roomid)
console.log(namer)
head = document.querySelector("#energyhead");
head.appendChild(headname(roomid));