"use strict";
// Node-Http-Modul importieren
const Http = require("http");
// Node-Url-Modul importieren
const Url = require("url");
var ServerTest;
(function (ServerTest) {
    // Port vom Process-Objekt erfragen 
    let port = process.env.PORT;
    // Port nicht definiert -> lokale Maschine, Port selbst definieren
    if (port == undefined)
        port = 8100;
    // Server-Objekt kreieren
    let server = Http.createServer();
    // Event-Handler installieren
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    // Auf dem Port horchen
    server.listen(0);
    // Listening-Event: Rückmeldung wenn horchen läuft
    function handleListen() {
        console.log(port);
        port = server.address().port;
        console.log("Server listening");
    }
    // Request-Event: Verarbeiten der Request und erstellen der Response
    function handleRequest(_request, _response) {
        console.log("Ich höre Stimmen!!");
        // Header: Antwort kommt im HTML-Format mit uft-8
        _response.setHeader("content-type", "text/html; charset=utf-8");
        // Header: Kommunikation mit allen Quellen erlaubt
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write("Ich höre Stimmen!!<br>");
        _response.write("Port: " + port + "<br>");
        _response.write("Method: " + _request.method + "<br>");
        _response.write("Url: " + _request.url + "<br>");
        _response.write("Headers: " + _request.headers + "<br>");
        // Query-Teil der URL wird in homogenes, assoziatives Array überführt
        let query = Url.parse(_request.url, true).query;
        // Array durchlaufen und key-value-Paare in Antwort schreiben
        for (let key in query)
            _response.write(key + ": " + query[key] + "<br>");
        // Antwort abschließen und abschicken
        _response.end();
    }
})(ServerTest || (ServerTest = {}));
//# sourceMappingURL=ServerTest.js.map