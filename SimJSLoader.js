/*
 *
 *   SimJSLoader - Dynamic JS File Loader
 *   version 1.0.1
 *   Copyright © 2017 GAYTH BACCARI
 *
 */
/**
 * 
 * 
 * @param {string} racine // Exemple : /GADM/JS/Plugin/
 * @param {Object[]} file // list of file to load [GADM.JS , test/test.js]
 * @param {boolean} log_success //log success loads JS
 * @param {boolean} log_erro //log Error loads JS
 * @param {requestCallback} _callback //call back after load JS
 */
function SimJSLoader(racine, file, log_success, log_error, _callback) {
    log_success = typeof log_success !== 'undefined' ? log_success : false;
    log_error = typeof log_error !== 'undefined' ? log_error : false;
    var i = 0; // the index we're using
    var cmd; // basically a var just so we don't have to keep calling cmd_files[i]
    var totalCommands = file.length; // basically how many iterations to do
    function sendNextCommand() {
        if (i >= totalCommands) {
            _callback();
            return;
        } // end it if it's done
        cmd = file[i]; // again, just so we don't have to keep calling cmd_files[i]
        //update_log("Waiting for CMD " + cmd + " to complete...");
        $.getScript(racine + cmd).done(onCommandComplete).fail(function(jqxhr, settings, exception) {
            if (log_error) console.log('%c File : ' + link + ' /> ' + exception, 'background: #900; color: #fff');
        });;
        // above line does what needs to be done (sends to PHP) and then adds the event listener 'done'
    }

    function onCommandComplete(value) {
        if (log_success) console.log('%c File : ' + cmd + ' => ' + 'Done!', 'background: #bada55; color: #222');
        i++; // up the index
        sendNextCommand(); // start the next iteration
    }
    sendNextCommand(); // start the first iteration manually
}