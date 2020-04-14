const validUrl = require('valid-url');

function checkForName(inputText) {
    if (!inputText || inputText.lenght == 0) {
        return "the URL is empty - you have to Enter a Valid URL";
    }
     if (validUrl.isUri(inputText)){
        console.log('Looks like an URI');
        return true;
    } else {
        alert('Please input a validUrl');
        return false
    }
}

export { checkForName };