function handleSubmit(event) {
    event.preventDefault()

    const url = document.getElementById('url').value
    const isValid = Client.checkForName(url);

    if (isValid) {
        fetch(' http://localhost:8081/addData', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        })
        .then(res => res.json())
        .then(function (res) {
            console.log(res);
            let content =  `<div class="data-box">
                                <div class = "data name">${res.polarity}<div>
                                <div class = "data score">${res.polarity_confidence}<div>
                            </div>
                            <div class="data-box">
                                <div class = "data name">${res.subjectivity}<div>
                                <div class = "data score">${res.subjectivity_confidence}<div>
                            </div>
                            <div class="data-box">${res.content}</div>`
            document.getElementById('results').innerHTML = content;
        })
    } else {
        return ;
    }
}

export { handleSubmit }