$(document).ready(function () {
    var input = $("#result").text();
    var history = $('#history').text();
    var ops = ["+", "*", "/", "-"];
    var data = [];

    $(".num").click(function () {
        var value = $(this).text();
        history = $("#history").text();
        input = $("#result").text();
        if (data[0] !== "=") {
            if (input.length > 7 || history.length > 20) {
                $("#history").text("digit limit met, press AC");
                $(".dis").attr('disabled', 'disabled');
            } else {
                printNum(history, ops, value);
            }
        } else {
            $("#result").empty();
            $("#history").empty();
            data = [];
            printNum(history, ops, value);
        }
    });
    $(".op").click(function () {
        var opValue = $(this).text();
        input = $("#result").text();
        history = $("#history").text();
        if (!/[/+*-]/.test(input) && history[0] !== undefined) {
            $("#result").empty();
            $("#result").text(opValue);
            $("#history").append(opValue);
        }
        if (data[0] === "=") {
            $("#result").empty();
            $("#history").empty();
            $("#result").text(opValue);
            $("#history").append(data[1] + opValue);
            data = [];
        }
    });
    $("#decimal").click(function () {
        input = $("#result").text();
        history = $("#history").text();
        if (data[0] === "=") {
            data = [];
            $("#result").empty();
            $("#history").empty();
            $("#result").append("0.");
            $("#history").append("0.");
        } else if ((!/\./.test(input)) && (!ops.includes(history[history.length - 1]))) {
            if (history[0] === undefined) {
                $("#history").append("0.");
                $("#result").append(".");
            } else {
                $("#history").append(".");
                $("#result").append(".");
            }
        } else {
            $("#result").empty();
            $("#result").append("0.");
            $("#history").append("0.");
        }
    });
    $("#AC").click(function () {
        $("#result").empty();
        $("#history").empty();
        $("#result").text("0");
        $(".dis").removeAttr('disabled');
    });
    $("#CE").click(function () {
        history = $('#history').text();
        input = $('#result').text();
        var len = input.length;
        var historyArr = history.replace(/[/]/gi, ",").replace(/[*]/gi, ",*").replace(/[+]/gi, ",+").replace(/[-]/gi, ",-");
        var check = historyArr.split(",");
        var newInputHistory = history.substring(0, history.length - len);
        var newArr = newInputHistory.replace(/[/]/gi, ",/").replace(/[*]/gi, ",*").replace(/[+]/gi, ",+").replace(/[-]/gi, ",-");
        var lastRes = newArr.split(",");
        var newRes = lastRes[lastRes.length - 1];
        if (data[0] === "=") {
            data = [];
            $("#result").empty();
            $("#history").empty();
            $("#result").text("0");
        } else if (history === check[0]) {
            $("#history").empty();
            $("#result").empty();
            $("#result").text("0");
        } else {
            $("#history").empty();
            $("#result").empty();
            $("#history").append(newInputHistory);
            $("#result").text(newRes);
        }
    });
    $("#zero").click(function () {
        history = $('#history').text();
        input = $("#result").text();
        if (input.length > 7 || history.length > 21) {
            $("#history").text("digit limit met, press AC");
            $(".dis").attr('disabled', 'disabled');
        } else if (history[0] !== undefined) {
            $("#result").append("0");
            $("#history").append("0");
        }
    });
    $("#enter").click(function () {
        data.push("=");
        calculate(data);
    });
});

function calculate(data) {
    var nums = $("#history").text();
    var ans = (eval(nums)).toFixed(2);
    var round = parseFloat(ans);
    data.push(round);
    var finalAns = (nums + "=" + round.toString()).length;
    if (round.toString().length <= 8 && finalAns <= 21) {
        $("#result").text(round);
        $("#history").append("=" + round);
    } else {
        $("#result").empty();
        $("#history").empty();
        $("#result").text("0");
        $("#history").text("digit limit met, press AC");
        $(".dis").attr('disabled', 'disabled');
    }
}

function printNum(history, ops, value) {
    if (history[0] === undefined) {
        $("#result").empty();
        $("#result").append(value);
        $("#history").append(value);
    } else if (!ops.includes(history[history.length - 1])) {
        $("#result").append(value);
        $("#history").append(value);
    } else {
        $("#result").empty();
        $("#result").append(value);
        $("#history").append(value);
    }
}
