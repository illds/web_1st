let x, y, r;

$(document).ready(function () {
    $.get("main.php", {
        'state': 1
    }).done(function (data) {
        $('#result-table tr:first').after(data);
    });
});

function chooseR(element) {
    r = element.value;
    [...document.getElementsByClassName("r-button")].forEach(function (btn) {
        btn.style.transform = "";
    });
    element.style.transform = "scale(1.1)";
}

function submit() {
    $('#errors').empty();
    $('tr.hit-no').empty();
    $('tr.hit-yes').empty();

    y = document.querySelector("select[id=number]").value;
    if (validateX() & validateR()) {
        $.get("main.php", {
            'x': x,
            'y': y,
            'r': r,
            'timezone': new Date().getTimezoneOffset(),
            'state': 0
        }).done(function (data) {
            $('#result-table tr:first').after(data);
        });
    } else {
        $.get("main.php", {
            'state': 1
        }).done(function (data) {
            $('#result-table tr:first').after(data);
        });
    }
}

function clearTable() {
    $('#errors').empty();
    $('tr.hit-no').empty();
    $('tr.hit-yes').empty();

    $.get("main.php", {
        'state': 2
    });
}

function validateX() {
    x = document.querySelector("input[id=x-input]").value.replace(",", ".");
    if (x == undefined) {
        showError("Error: Type X!");
        return false;
    }
    if (!isNumeric(x)) {
        showError("Error: X is not numeric!");
        return false;
    }
    if (!((x > -5) && (x < 3))) {
        showError("Error: X does not fit in range of allowable values!");
        return false;
    }
    return true;
}

function validateR() {
    if (r)
        return true;

    showError("Error: Choose R!");
    return false;
}

function showError(message) {
    $('#errors').append(`<li>${message}</li>`);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}



