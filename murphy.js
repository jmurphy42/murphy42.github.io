/**
 * Created by murphyjp on 2/22/2017.
 */

var scissorsInterval = false;
var displayCatTime = 0;
var hoverTime = 0;
var secretCount = -1;
var secretInterval = false;

/**
 * On load, initialize...
 */
function init() {

    setLogoHover();
    $('#scissors').click(function () {
        cutPage();
    });

    $('#name').click(function () {
        displayTagline();
        display('about');
    });

    //set email link
    var account = 'jason', service = 'murphy42';
    $('#email').attr('href', 'mailto:' + account + '@' + service + '.com');

    //get view
    var view = getUrlVariable();
    getView(view);

}

/**
 * Gets view to display by parameter, sends to appropriate method
 * @param view view to display
 */
function getView(view) {
    switch (view) {
        case "hangman":
        case "gameoflife":
        case "books":
            displayPortfolio(view);
            break;
        case "about":
        case "downloads":
            display(view);
            break;
        case "picture":
            displayFamilyPicture();
            break;
        default:
            break;
    }
}

/**
 * Displays view to the page
 * @param view view to display
 */
function display(view) {
    var $c = $('#content');
    $c.fadeOut(10);
    $.get('views/' + view + '.html', function (content) {
        $c.html(content);
        $c.fadeIn(150);
        $('#x').fadeIn(100);
    });
}

/**
 * Displays portfolio view to page
 * @param portfolio view to load
 */
function displayPortfolio(portfolio){
    var $c = $('#content');
    $c.fadeOut(10);
    $.get('portfolio/'+portfolio+'/'+portfolio+'.html', function (content) {
        $c.html(content);
        $c.fadeIn(150);
        $('#x').fadeIn(100);
    });
}

/**
 * Hides content from view
 */
function hideContent(){
    var $c = $('#content');
    $c.fadeOut(250);
    $('#x').fadeOut(100);
    setTimeout(function(){
        $c.empty();
    },250);
}

/**
 * Displays and hides tagline
 */
function displayTagline() {
    var $tl = $('#tagline');
    var $me = $('#selfie img');
    $tl.css('-webkit-transition','all 250ms ease-out');
    $tl.css('-moz-transition','all 250ms ease-out');
    $tl.css('-ms-transition','all 250ms ease-out');
    $tl.css('-o-transition','all 250ms ease-out');
    $tl.css('transition','all 250ms ease-out');
    $tl.css('top', '105px');
    $me.css('-webkit-transition','all 250ms ease-out');
    $me.css('-moz-transition','all 250ms ease-out');
    $me.css('-ms-transition','all 250ms ease-out');
    $me.css('-o-transition','all 250ms ease-out');
    $me.css('transition','all 250ms ease-out');
    $me.css('top', '12px');
    $me.css('left', '106px');
    $me.css('width', '88px');
    $me.css('height', '88px');
    setTimeout(function () {
        $tl.css('-webkit-transition','all 600ms ease-in');
        $tl.css('-moz-transition','all 600ms ease-in');
        $tl.css('-ms-transition','all 600ms ease-in');
        $tl.css('-o-transition','all 600ms ease-in');
        $tl.css('transition','all 600ms ease-in');
        $tl.css('top', '150px');
        $me.css('-webkit-transition','all 600ms ease-in');
        $me.css('-moz-transition','all 600ms ease-in');
        $me.css('-ms-transition','all 600ms ease-in');
        $me.css('-o-transition','all 600ms ease-in');
        $me.css('transition','all 600ms ease-in');
        $me.css('top', '151px');
        $me.css('left', '128px');
        $me.css('width', '44px');
        $me.css('height', '44px');
    }, 2500);
}

/**
 * Display my family picture
 */
function displayFamilyPicture() {
    var $c = $('#content');
    $c.fadeOut(10);
    $.get('views/picture.html', function (content) {
        $c.html(content);
        setUpFamilyPictureHoverBoxes();
        $c.fadeIn(150);
        $('#x').fadeIn(100);
    });

    function setUpFamilyPictureHoverBoxes() {
        var hoverBoxes = ['dad', 'mom', 'daughter', 'son', 'sister',
            'brother-in-law', 'me', 'wife', 'brother', 'sister-in-law'];
        var i = 0, len = hoverBoxes.length;
        for (i; i < len; i++) {
            var tag = hoverBoxes[i];
            var element = $('#' + tag);
            element.hover(function () {
                    var name = $(this).attr('id');
                    $(this).html('<p>' + name + '</p>')
                },
                function () {
                    $(this).html('<p></p>')
                });
        }
        $('#not-pictured').hover(function () {
                var name = 'not pictured: nieces, nephews, cats';
                $(this).html('<p>' + name + '</p>')
            },
            function () {
                $(this).html('<p></p>')
            });
    }
}

/**
 * Displays random cat gif
 */
function displayCat() {
    var $c = $('#content');
    if (displayCatTime < Date.now() - 1000) {
        $c.fadeOut(10);
        $c.empty();
        displayCatTime = Date.now();
        var gifs = [
            "http://i.giphy.com/QyygZ4Ajs8Jlm.gif",
            "http://i.giphy.com/auvPdJqCpMA4E.gif",
            "http://i.giphy.com/83ZUpar3IT2mY.gif",
            "http://i.giphy.com/11p6Lx6ftf83pm.gif",
            "http://i.giphy.com/91YdWmtW6OEU.gif",
            "http://i.giphy.com/7F7PTT8djQvkY.gif",
            "http://i.giphy.com/pxnDujIbv4hZ6.gif",
            "http://i.giphy.com/NejoIyBmGoR3i.gif",
            "http://i.giphy.com/IaBSXUS9SIde8.gif",
            "http://i.giphy.com/R52934IAVt4jK.gif",
            "http://i.giphy.com/DXv8sXIiCNYwU.gif",
            "http://i.giphy.com/iYsBdgm00OMGA.gif"];
        var r = Math.floor(Math.random() * gifs.length);
        var gif = gifs[r];
        $c.prepend($('<img>', {
            id: 'cat',
            src: gif,
            alt: 'random cat gif',
            onclick: 'displayCat()'
        }));
        $c.fadeIn(150);
        $('#x').fadeIn(100);
    } else {
        console.log("You are trying to spam the cat gif. " +
            "Understandable, as they are super cute, " +
            "but be patient please. " +
            "Loading them is only allowed every 1 second.")
    }
}

/**
 * Reads URL and returns page variable
 * @returns {string} value, or "" if none
 */
function getUrlVariable() {
    var urlVariable = decodeURIComponent(
        window.location.search.substring(1));

    if (urlVariable !== undefined) {
        return urlVariable;
    }

    return ""; //no page variable
}

/**
 * Sets the behavior when user hovers over the logo
 */
function setLogoHover() {
    var colorInterval = false;
    var i = 0;
    $('#logo').hover(function () { //flash the logo on hover
        hoverTime = Date.now();
        colorInterval = setInterval(function () {
            i++;
            if (i > 15) {
                i = 0;
            }
            flashLogoColor(i);
            if (secretCount === -1 && Date.now() > hoverTime + 6000) { //secret method!
                //hovered for 6 seconds and secret not yet shown, so show secret
                console.log("shhhhhhhh");
                secretCount = 0;
                displaySecretMessage();
            }
        }, 40);
    }, function () { //reset the logo color on un-hover
        hoverTime = 0;
        clearInterval(colorInterval);
        colorInterval = false;
        i = 0;
        setLogoColor('#7C9E14');

        //also reset secret, if necessary
        hideSecret();
    });
}

/**
 * Sets the color of the logo
 * @param color
 */
function setLogoColor(color) {
    $('#logo').css('color', color);
}

/**
 * Flashes the color of the logo
 * @param i flash state
 */
function flashLogoColor(i) {
    // var colors = [
    //     '#95ab63', '#a2b576', '#afc08a', '#bcca9d', '#cad5b1', '#d7dfc4', '#e4e9d8', '#f1f4eb',
    //     '#FFFFFF', '#f1f4eb', '#e4e9d8', '#d7dfc4', '#cad5b1', '#bcca9d', '#afc08a', '#a2b576'];
    var colors = [
        '#7C9E14',
        '#8Caa31',
        '#9db64f',
        '#adc36c',
        '#bdcf89',
        '#cedba7',
        '#dee8c4',
        '#eff4e2',
        '#FFFFFF',
        '#eff4e2',
        '#dee8c4',
        '#cedba7',
        '#bdcf89',
        '#adc36c',
        '#9db64f',
        '#8Caa31'];
    var color = colors[i];
    setLogoColor(color);
}

/**
 * Shows secret message
 */
function displaySecretMessage() {
    $('#secret').fadeIn(10);
    var secret =
        '00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 ' +
        '00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 ' +
        '00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 ' +
        '01100101 01101101 01100001 01101001 01101100 00100000 01101101 01100101 ' +
        '00100000 01100001 01110100 00100000 01101010 01100001 01110011 01101111 ' +
        '01101110 01000000 01101101 01110101 01110010 01110000 01101000 01111001 ' +
        '00110100 00110010 00101110 01100011 01101111 01101101';

    //it says 'email me at jason@murphy42.com
    var len = secret.length;

    secretInterval = setInterval(function () {
        var c = secret[len - secretCount - 1];
        scrollSecret(c);
        secretCount++;
        if (secretCount >= 280) {
            hideSecret();
        }
    }, 100);

}

/**
 * Hides the secret message
 */
function hideSecret() {
    var $secret = $('#secret');
    $secret.fadeOut(2500);
    setTimeout(function () {
        clearInterval(secretInterval);
        secretCount = -1;
        document.getSelection().removeAllRanges(); //deselect text
        $secret.empty(); //remove text
    }, 2500);
}

/**
 * Adds secret message to window character by character
 * @param c character to add
 */
function scrollSecret(c) {
    var $secret = $('#secret');
    $secret.html(c + $secret.html());
}

/**
 * Cuts the page
 */
function cutPage() {
    startScissors();
}

/**
 * Starts interval that sets scissors every 5ms.
 */
function startScissors() {
    $('#scissors').addClass('scissors-running');
    $('#main-menu').addClass('container-scissors-running');

    if (!scissorsInterval) {
        scissorsInterval = setInterval(function () {
            if (setScissors()) { //scissors is done
                stopScissors();
            }
        }, 5);
    }
}

/**
 * Stop scissors, reset css, and display cat
 */
function stopScissors() {
    clearInterval(scissorsInterval);
    scissorsInterval = false;
    var $s = $('#scissors');
    $s.removeClass('scissors-running');
    $('#main-menu').removeClass('container-scissors-running');
    $s.css('top', 'calc(100% - 80px)');

    $(":first-child", $s).html('v');

    displayCat();
}

/**
 * Sets and moves scissors until off the page.
 * @returns {boolean} true when done
 */
function setScissors() {
    var $scissors = $('#scissors');
    var topInt = parseInt($scissors.css('top'));

    if (topInt % 50 >= 25) { //every 25 pixels, open/close scissors
        $(":first-child", $scissors).html('v');
    } else {
        $(":first-child", $scissors).html('|');
    }

    $scissors.css('top', (topInt - 2) + 'px');

    return (topInt < -20); //true = done
}