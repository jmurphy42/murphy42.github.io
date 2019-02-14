/**
 * Created by murphyjp on 1/23/2017.
 */

var lastRequestTime = 0;
var timeWarningOn = false;
var queryWarning = false;

// Initializes mouse and key events onload
function initBooks() {
    var $query = $("#books-query");
    var $qBtn = $("#books-qButton");

    $qBtn.click(sendQuery);
    $query.on("focus", function () {
        $(this).one("mouseup", function () {
            $(this).select();
            return false;
        })
            .select();
    });
    $query.keypress(function (e) {
        var key = (e.keyCode ? e.keyCode : e.which);
        if (key == '13') { //enter
            $query.blur();
            $qBtn.click();
        }
    });
}

// Sends an AJAX query to the Books service
function sendQuery() {

    if (!timeWarningOn) {

        //timer check to avoid spamming the Goodreads server
        //limits queries to 1 every 5 seconds.
        //   [Goodreads limits users to 1 per second, but all website users
        //    are using my one key.]
        var currentTime = Date.now();
        var timeElapsed = currentTime - lastRequestTime;
        if (timeElapsed > 5000) {
            lastRequestTime = currentTime;

        } else {
            displayTimeError();
            return;
        }

        if (queryWarning) {
            fadeQueryError(100);
        }

        //this was originally written as a Java query service using Tomcat
        //this portfolio host doesn't allow for Tomcat, and so it has been
        //adapted to pure JavaScript using Yahoo's YQL service to bypass
        //cross-origin request problems.
        var query = $("#books-query").prop("value");
        var key = getKey();
        if (query === undefined || query === null || query === '') {
            displayData('');
        } else {
            queryGR(key, query);
        }
    }
}

// Displays the data retrieved from the AJAX query to the books.html page.
function displayData(responseText) {
    if (responseText === undefined || responseText === null || responseText === "") {
        $("#books-title").html("book title");
        $("#books-author").html("author name");
        $("#books-rating").html("#");
        $("#books-numRatings").html("#");
        $("#books-cover").attr('src', '');
        return;
    }
    var title = responseText.getElementsByTagName("title")[0];
    var author = responseText.getElementsByTagName("name")[0];
    var rating = responseText.getElementsByTagName("average_rating")[0];
    var numRatings = responseText.getElementsByTagName("ratings_count")[0];
    var cover = responseText.getElementsByTagName("image_url")[0].textContent;
    $("#books-title").html(title);
    $("#books-author").html(author);
    $("#books-rating").html(rating);
    $("#books-numRatings").html(numRatings);
    $("#books-cover").attr('src', cover);
}

// Displays time error if user has made too many requests in a short time.
function displayTimeError() {
    $("#books-timeWarning").fadeIn(250, "swing");
    timeWarningOn = true;
    setTimeout(fadeTimeError, 5000);
}

// Fades time error
function fadeTimeError() {
    $("#books-timeWarning").fadeOut(1000, "swing");
    timeWarningOn = false;
}

// Displays query error if Goodreads query failed.
function displayQueryError(error) {
    $('#books-error').html(error);
    $("#books-queryWarning").fadeIn(250, "swing");
    queryWarning = setTimeout(function () {
        fadeQueryError(1000)
    }, 5000);
}

// Fades query error
function fadeQueryError(duration) {
    clearTimeout(queryWarning);
    $("#books-queryWarning").fadeOut(duration, "swing");
    queryWarning = false;
}

// Gets key for request
function getKey() {

    // Don't look at this. It's private!
    // (Okay, I know this is entirely insecure,
    // but the information is trivial.)
    var key = '526e3965393857496443684957324b66684f536851';
    var k = "";
    var i = 0, len = key.length;

    for (i; i < len; i += 2) {
        k += String.fromCharCode(parseInt(key.substring(i, i + 2), 16));
    }

    return k;
}

// Query the Goodreads API and handle the result when complete
function queryGR(key, query) {
    query = query.split(" ").join("%2b");
    query = encodeURI(query);

    var yql = "https://query.yahooapis.com/v1/public/yql?" +
        "q=select%20*%20from%20xml%20where%20url%3D%22https%3A%2F%2F" +
        "www.goodreads.com%2Fsearch%2Findex.xml%3Fkey%3D" + key +
        "%26q%3D" + query + "%22&format=xml&env=store%3A%2F%2Fdatatables.org" +
        "%2Falltableswithkeys";

    $.ajax({
        method: "GET",
        dataType: "xml",
        url: yql,
        success: function (data) {
            displayData(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            displayQueryError("Error: " + xhr.status + " " +
                textStatus + " " + errorThrown);
        }
    });
}