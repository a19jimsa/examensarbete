'use strict'

function store(data, name){
    // Make anchor and click it!
    var anchor = document.createElement("a");
    anchor.setAttribute("href", encodeURI(data));
    anchor.setAttribute("download", name+"Test.csv");
    anchor.innerHTML= "Click Here to download";
    document.body.appendChild(anchor);
    anchor.click();
}

export default store;