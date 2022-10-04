"use strict";

var x = 0;
var y = 0;
var r = 90;

var nr = 0;

function getForward(command, pos) {
    if(command.length != 2) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " has 1 parameters, you wrote " + command.length);
        return;
    }
    if(isNaN(command[1]) == true) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " parameter 1 requires a number, you wrote " + command[1]);    
        return;
    }
    if(case0repeat == true) {
        return;
    }
    var angle = r*Math.PI/180;
    
    x += parseInt(command[1])*Math.cos(angle);
    y += parseInt(command[1])*Math.sin(angle);
    x = Math.round(x);
    y = Math.round(y);
    
   console.log("OK " + x + ", " + y + ", " + r);
}

function getBackward(command, pos) {
    if(command.length != 2) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " has 1 parameters, you wrote " + command.length);
        return;
    }
    if(isNaN(command[1]) == true) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " parameter 1 requires a number, you wrote " + command[1]);    
        return;
    }
    if(case0repeat == true) {
        return;
    }
    var angle = r*Math.PI/180;
    x -= command[1]*Math.cos(angle);
    y -= command[1]*Math.sin(angle);
    x = Math.round(x);
    y = Math.round(y);
    console.log("OK " + x + ", " + y + ", " + r);
}

function getTurn(command, pos) {
    if(command.length != 3) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " has 2 parameters, you wrote " + (command.length-1));
        return;
    }
    if(command[1] != "left" && command[1] != "right") {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " parameter 1 requires a left/right, you wrote " + command[1]);
        return;
    }
    if(isNaN(command[2]) == true) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " parameter 2 requires a number, you wrote " + command[2]);    
        return;
    }
    if(case0repeat == true) {
        return;
    }
    if(command[1] == "left") {
        r += parseInt(command[2]);
    } else {
        r -= parseInt(command[2]);
    }
    while(r < 0) {
        r += 360;
    }
    r %= 360;
    console.log("OK " + x + ", " + y + ", " + r);
}

function getJump(command, pos) {
    if(command.length != 3) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " has 2 parameters, you wrote " + (command.length-1));
        return;
    }
    if(isNaN(parseInt(command[1])) == true && command[1] != '~') {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " parameter 1 requires a number or ~, you wrote " + command[1]);    
        return;
    }
    if(isNaN(parseInt(command[2])) == true && command[2] != '~') {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " parameter 2 requires a number or ~, you wrote " + command[2]);    
        return;
    }
    if(case0repeat == true) {
        return;
    }
    if(command[2] == '~') {
        x = command[1];
        console.log("OK " + x + ", " + y + ", " + r);
        return;
    }
    if(command[1] == '~') {
        y = command[2];
        console.log("OK " + x + ", " + y + ", " + r);
        return;
    }
    x = command[1];
    y = command[2];
    console.log("OK " + x + ", " + y + ", " + r);
}

var nr_repeat = 0;
var linie_repeat = 0;
var inRepeat = false;
var case0repeat = false;
var verifEnd;

function getRepeat(array, pos) {
    verifEnd = false;
    if(array.length != 2) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " has 1 parameters, you wrote " + (array.length-1));
        return;
    }
    if(isNaN(parseInt(array[1])) == true) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " parameter 1 requires a number, you wrote " + array[1]);    
        return;
    }
    if(parseInt(array[1]) < 0) {
        console.log("ERROR LINE " + noline[pos] + ": " + cmdoriginal + " parameter 1 requires a positive number, you wrote " + array[1]);
        case0repeat = true;
        return;
    }
    if(parseInt(array[1]) == 0) {
        case0repeat = true;
    }
    if(inRepeat == false) {
        console.log("OK " + x + ", " + y + ", " + r);
        inRepeat = true;
        linie_repeat = noline[pos];
        nr_repeat = parseInt(array[1]);
        nr_repeat--;
        return;
    }
    return;
}

function getEnd(array, pos) {
    verifEnd = true;
    if(array.length != 1) {
        console.log("ERROR LINE " + noline[pos] + ": END has 0 parameters, you wrote " + (array.length-1));
        return;
    }
    if(case0repeat == true) {
        return;
    }
    if(inRepeat == false) {
        console.log("ERROR LINE " + noline[pos] + ": END and no REPEAT");
        return;
    } else {
        if(nr_repeat != 0) {
            nr = linie_repeat-2;
            console.log("OK " + x + ", " + y + ", " + r);
            nr_repeat--;
            return;
        } else {
            console.log("OK " + x + ", " + y + ", " + r);
            inRepeat = false;
            return;
        }
    }
}

var fs = require('fs');

try {
    var file = fs.readFileSync(process.argv[2]).toString();
    var line = file.split('\n');
    var cmd, cmdoriginal;
    var command = [];
    var noline = [];
    for(var i=0; i<line.length; i++) {
        line[i] = line[i].trim();
        if(line[i].length == 0)
            continue;
        if((line[i])[0] == '#')
            continue;
        for(var w = 0; w < line[i].length; w++) {
            if((line[i])[w] == ' ' || (line[i])[w] == ',') {
                break;
            }
        }
        var commandlocal = [];
        if(w == line[i].length) {
            commandlocal.push(line[i]);
        } else {
            commandlocal.push(line[i].substring(0, w));
            line[i] = line[i].substring(w+1);
            var splitter = line[i].split(',');
            for(var z = 0; z < splitter.length; z++) {
                splitter[z] = splitter[z].trim();
            }
            for(var z = 0; z < splitter.length; z++) {
                commandlocal.push(splitter[z]);
            }
        }
        command.push(commandlocal);
        noline.push(i+1);
    }
        for(nr = 0; nr < noline.length; nr++) {    
        var cmd_list = (command[nr])[0];
        cmdoriginal = cmd_list;
        cmd = cmdoriginal.toUpperCase();
        switch(cmd) {
            case "FORWARD":
                getForward(command[nr], nr);
                break;
            case "BACKWARD":
                getBackward(command[nr], nr);
                break;
            case "TURN":
                getTurn(command[nr], nr);
                break;
            case "JUMP":
                getJump(command[nr], nr);
                break;
            case "REPEAT":
                linie_repeat = noline[nr];
                getRepeat(command[nr], nr);
                break;
            case "END":
                getEnd(command[nr], nr);
                break;
            default:
                console.log("ERROR LINE " + noline[nr] + ": Unknown command " + cmd);
                break;
        }
    }
    if(verifEnd == false) {
        console.log("ERROR LINE " + line.length + ": You have 1 REPEAT without END");
    }
}
catch(error) {
    console.log(error);
}