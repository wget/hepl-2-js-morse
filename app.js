document.addEventListener("DOMContentLoaded", function() {
    morseApp();
});

var morseApp = function() {

    var morseText;
    var morseCode = {
        "a": "*-",
        "b": "-***",
        "c": "-*-*",
        "d": "-**",
        "e": "*",
        "f": "**-*",
        "g": "--*",
        "h": "****",
        "i": "**",
        "j": "*---",
        "k": "-*-",
        "l": "*-**",
        "m": "--",
        "n": "-*",
        "o": "---",
        "p": "--*-",
        "q": "--*-",
        "r": "*-*",
        "s": "***",
        "t": "-",
        "u": "**-",
        "v": "***-",
        "w": "*--",
        "x": "-**-",
        "y": "-*--",
        "z": "--**",
        "1": "*----",
        "2": "**---",
        "3": "***--",
        "4": "****-",
        "5": "*****",
        "6": "-****",
        "7": "--***",
        "8": "---**",
        "9": "----*",
        "0": "-----"
    };

    function keyPressHandler(e) {
        // If we are trying to remove
        if (e.keyCode == 8) {
            
        } else if (e.keyCode == 46) {

        }

        var toMorseWarning = document.getElementById("toMorseWarning");
        var keyValue = morseCode[e.key];
        if (keyValue === undefined) {
            toMorseWarning.style.display = "block";
            return;
        }
        // var node = document.createTextNode(keyValue);
        // var node = document.createElement("span");
        // node.innerText = keyValue;
        //
        // var morseBox = document.getElementById("morseBox");
        // morseBox.append(node);

        // this.morseText.push(keyValue);
        drawCanvasFromString(document.getElementById("morseBox"), keyValue);

        toMorseWarning.style.display = "none";
    }

    // src.: https://stackoverflow.com/a/3368118/3514658
    function drawRoundRect(ctx, x, y, width, height, radius) {
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
    }

    function drawCanvasFromString(destination, string) {
        var newCanvas = document.createElement("canvas");
        var ctx = newCanvas.getContext("2d");
        var pathTypeJustDrawn;
        var x = 5;
        ctx.beginPath();

        for (var i = 0; i < string.length; i++) {
            if (string[i] == "*") {
                if (pathTypeJustDrawn == "rect") {
                    x += 40;
                } else {
                    x += 20;
                }
                // x, y, radius, start (in radians), end (in radians)
                ctx.arc(x, 5, 5, 0, 2 * Math.PI);
                pathTypeJustDrawn = "arc";
            } else if (string[i] == "-") {
                if (pathTypeJustDrawn == "rect") {
                    x += 35;
                } else {
                    x += 20;
                }
                drawRoundRect(ctx, x, 0, 25, 10, 5);
                pathTypeJustDrawn = "rect";
            }
        }

        // ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        destination.append(newCanvas);
    }

    // Use keypress instead of keydown in order to avoid Ctr, Alt, etc. to
    // be taken into account.
    document.getElementById("textToMorseBox").addEventListener("keypress", keyPressHandler);
    drawCanvasFromString(document.getElementById("testcanvas"), "*--");
}
