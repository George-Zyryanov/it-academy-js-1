const carBrandInputField = document.querySelector('#carBrand');
const carModelInputField = document.querySelector('#carModel');
const carYearInputField = document.querySelector('#carYear');
const carPriceInputField = document.querySelector('#carPrice');
const carImageInputField = document.querySelector('#carImage');
const carDateInputField = document.querySelector('#carDate');
const bodyHTML = document.body

const fieldCannotBeEmptyLabel = document.createElement('LABEL')

fieldCannotBeEmptyLabel.innerText = 'Field cannot be empty';
fieldCannotBeEmptyLabel.style.color = "RED"

function addNewCar(car, model, year, price, image, saleDate){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/cars", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    if (image === ''){
        image = './images/default.jpeg';
    }

    xhr.send(JSON.stringify({
        "car": car,
        "model": model,
        "year": year,
        "price": price,
        "image": image,
        "saleDate": saleDate,
        "currentBid": "1",
        "lastBidder": "Be the first to bid!",
    }));
}


window.addEventListener( "submit", function (event) {
    // event.preventDefault()

    addNewCar(carBrandInputField.value, carModelInputField.value, carYearInputField.value, carPriceInputField.value, carImageInputField.value, carDateInputField.value)

        // document.querySelector('#carBrand').value = ""
        // document.querySelector('#carModel').value = ""
        // document.querySelector('#carYear').value = ""
        // document.querySelector('#carPrice').value = ""
        // document.querySelector('#carImage').value = ""
        // document.querySelector('#carDate').value = ""
    // const newDiv = document.createElement('DIV')
    // newDiv.innerHTML = "<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n" +
    //     "  <strong>Holy guacamole!</strong> You should check in on some of those fields below.\n" +
    //     "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    //     "    <span aria-hidden=\"true\">&times;</span>\n" +
    //     "  </button>\n" +
    //     "</div>"
    //
    // bodyHTML.appendChild(newDiv)
    alert(`Your car was just added!`)

});