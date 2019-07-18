let matrix = [];
function changeColor()
{
    console.log(this);
    console.log($(this));
    $(".selectedCell").removeClass("selectedCell");
    $(this).addClass("selectedCell");
}
$(document).ready(function() {
    $('td').attr("tabindex", "0");
    $('td').click(changeColor);

    console.log($("#" + 11).text());
    for(var i = 0; i < 9; i++) {
        var temp = [];
        for (var j = 0; j < 9; j++) {
            temp[j] = $("#" + (i + 1) + (j + 1)).text();
        }
        matrix.push(temp);
    }

});
let previousId = 0;
let counter = 0;
document.onkeydown = function (e) {

    let key = e.key;
    console.log(key);
    let id = $(".selectedCell").attr('id');
    switch (key) {
        case "ArrowUp":
        {
            if(id.substring(0,1) !== "1") {
                $(".selectedCell").removeClass("selectedCell");
                id -= 10;
                $("#" + id).addClass("selectedCell");
            }
            break;
        }
        case "ArrowDown":
        {
            if(id.substring(0,1) !== "9") {
                $(".selectedCell").removeClass("selectedCell");
                id = parseInt(id) + 10;
                $("#" + id).addClass("selectedCell");
            }
            break;
        }
        case "ArrowLeft":
        {
            if(!(id.substring(1,2) === "1")) {
                $(".selectedCell").removeClass("selectedCell");
                id -= 1;
                $("#" + id).addClass("selectedCell");
            }
            break;
        }
        case "ArrowRight":
        {
            if(!(id.substring(1,2) === "9")) {
                $(".selectedCell").removeClass("selectedCell");
                id = parseInt(id) + 1;
                $("#" + id).addClass("selectedCell");
            }
            break;
        }
        case "Delete":
        case "Backspace":
        {
            if (!$("#" + id).hasClass("givenCell")) {
                var i = id.substring(0,1) - 1;
                var j = id.substring(1,2) - 1;
                matrix[i][j] = "-";
                $("#" + id).text("");
                deleteRedOnLine(id);
                deleteRedOnColumn(id);
                deleteRedInSquare(id);
                verifyLine(id);
                verifyColumn(id);
                verifySquare(id);
            }

            break;
        }
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        {
            if (!$("#" + id).hasClass("givenCell"))
            {
                if(previousId === id)
                    counter++;
                else
                    counter = 0;
                if(counter > 0)
                {
                    deleteRedOnLine(id);
                    deleteRedOnColumn(id);
                    deleteRedInSquare(id);
                }

                $("#" + id).text(key);
                var i = id.substring(0,1) - 1;
                var j = id.substring(1,2) - 1;
                matrix[i][j] = key;
                verifyLine(id);
                verifyColumn(id);
                verifySquare(id);
                previousId = id;
            }

            break;
        }
        default:
        {
        }
    }
};

function verifyLine(id) {
    var i = id.substring(0,1) - 1;
    var j = id.substring(1,2) - 1;
    var count = 0;
    for(var x = 0; x < 9; x++)
    {
        if(matrix[i][j] !== "-" && matrix[i][x] === matrix[i][j])
        {
            count++;
            if (count > 0)
            {
                    $("#" + (i + 1) + (x + 1)).addClass("redCell");
            }
        }
    }
}

function deleteRedOnColumn(id)
{
    var i = id.substring(0,1) - 1;
    var j = id.substring(1,2) - 1;
    var count = 0;
    for(var x = 0; x < 9; x++) {
        $("#" + (x + 1) + (j + 1)).removeClass("redCell");
    }
}

function deleteRedOnLine(id)
{
    var i = id.substring(0,1) - 1;
    var j = id.substring(1,2) - 1;
    var count = 0;
    for(var x = 0; x < 9; x++)
    {
        $("#" + (i + 1) + (x + 1)).removeClass("redCell");
    }
}

function deleteRedInSquare(id)
{
    let i = id.substring(0,1) - 1;
    let j = id.substring(1,2) - 1;
    m = parseInt(i/3)*3;
    n = parseInt(j/3)*3;
    var count = 0;
    for(let x = m; x < m + 3; x++)
        for(let y = n; y < n + 3; y++)
            $("#" + (x + 1) + (y + 1)).removeClass("redCell");

}

function verifyColumn(id) {
    var i = id.substring(0,1) - 1;
    var j = id.substring(1,2) - 1;
    var count = 0;
    for(var x = 0; x < 9; x++) {
        if (matrix[i][j] !== "-" && matrix[x][j] === matrix[i][j]) {
            count++;
            if (count > 0) {
                $("#" + (x + 1) + (j + 1)).addClass("redCell");
            }
        }
    }
}

function verifySquare(id)
{
    let i = id.substring(0,1) - 1;
    let j = id.substring(1,2) - 1;
    m = parseInt(i/3)*3;
    n = parseInt(j/3)*3;
    var count = 0;
    for(let x = m; x < m + 3; x++)
        for(let y = n; y < n + 3; y++)
        {
            if(matrix[i][j] !== "-" && matrix[x][y] === matrix[i][j])
            {
                count++;
                if (count > 0)
                    $("#" + (x + 1) + (y + 1)).addClass("redCell");
            }
        }
}
