const carContainer = document.querySelector('#single-car-container')


// CODE THAT WILL GO TO placeBid.js


const getCarInfoJson = async (bidAmount, carId, userEmail) => {
    // get info from submit form on single car page
    // get info from user who placed bid
    // add sum to json db
    // as we are getting information from json db in the first place, this means that new information will be present after refresh


    var xhr = new XMLHttpRequest();
    let carInfo

    await fetch(`http://localhost:3000/cars/${carId}`)
        .then(res => { return res.json() })
        .then(data => {
            let bidFinal = parseInt(data.currentBid) + parseInt(bidAmount)
            console.log("BIDFINAL =", bidFinal)

                carInfo = {
                    "car": `${data.car}`,
                    "model": `${data.model}`,
                    "year": `${data.year}`,
                    "price": `${data.price}`,
                    "image": `${data.image}`,
                    "saleDate": `${data.saleDate}`,
                    "currentBid": `${bidFinal.toString()}`,
                    "lastBidder": userEmail
            }
        })

    if (carInfo.car !== undefined){
        xhr.open("PUT", `http://localhost:3000/cars/${carId}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(carInfo));
    } else {
        alert('undefined value in carInfo')
    }
}


// CODE THAT WILL GO TO placeBid.js

const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const saleCountDown = (saleDate, id) => {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let countDown = new Date(saleDate).getTime(),
        x = setInterval(function() {

            let now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById(`days-${id}`).innerText = Math.floor(distance / (day));
            document.getElementById(`hours-${id}`).innerText = Math.floor((distance % (day)) / (hour));
            document.getElementById(`minutes-${id}`).innerText = Math.floor((distance % (hour)) / (minute));
            // document.getElementById(`seconds-${id}`).innerText = Math.floor((distance % (minute)) / second);
        }, 0)
}

const getCarData = (id) => {
    fetch(`http://localhost:3000/cars/${id}`)
        .then(res => {
            return res.json()
        })
        .then(temporaryElement => {
            const newRow = document.createElement(`DIV`)
            newRow.classList.add('row')
            const newCol = document.createElement(`DIV`)
            newCol.classList.add('.col')
            newCol.innerHTML =
                `<div class="row">
  <div class='col'>
    <div class="card mb-3">
      <img class="card-img-top" src="${temporaryElement.image}" class="card-img-top" alt="Car image">
    </div>
  </div>
  <div class='col'>
    <div class="card mb-3">
        <div class="card-body">
        <h5 class="card-title font-weight-bold">${temporaryElement.car}</h5>
         <ul class="card-text list-group-flush">
            <li class="list-group-item"><span class="font-weight-bold">Model: </span>${temporaryElement.model}</li>
            <li class="list-group-item"><span class="font-weight-bold">Year: </span>${temporaryElement.year}</li>
            <li class="list-group-item" ><span class="font-weight-bold">Original price: </span>$ ${temporaryElement.price}</li>
            <li class="list-group-item"><small><span class="font-weight-bold">Time left:</span> Days <span id="days-${temporaryElement.id}"></span> / Hrs <span id="hours-${temporaryElement.id}"></span> / Mins <span id="minutes-${temporaryElement.id}"></span><span class="text-danger font-weight-bold"> (live)</span></small></li>
            <li class="list-group-item"><span class="font-weight-bold">ID: </span>${temporaryElement.id}</li>
            <li class="list-group-item"><p class="p-3 mb-2 bg-warning text-dark">Current bid: $ ${temporaryElement.currentBid}</p></li>
            <li class="list-group-item"><p class="p-3 mb-2 bg-warning text-dark">Last bidder: ${temporaryElement.lastBidder}</p></li>
        </ul>
      </div>
    </div>
      <div class="form-row align-items-center">
        <div class="col-sm-3 my-1">
          <label class="sr-only" for="inlineFormInputName">Your bid</label>
          <input type="text" class="form-control" id="inlineFormInputName" placeholder="$100">
        </div>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-success" id="bidButton">Place bid</button>
        </div>
      </div>
  </div>
</div>
`
            saleCountDown(temporaryElement.saleDate, temporaryElement.id)
            newRow.appendChild(newCol)
            carContainer.appendChild(newRow)
        })
        .then(() => {
            if (document.querySelector('#bidButton')){
                document.querySelector('#bidButton')
                    .addEventListener("click", function (event){


                        const bidAmount = document.querySelector('#inlineFormInputName')

                        console.log('session-key = ', `"${typeof localStorage.getItem('session-key')}"`)

                        if (localStorage.getItem('session-key') !== '' && localStorage.getItem('session-key') !== null){
                            if (bidAmount.value !== ''){
                                alert(`Your bid of $${bidAmount.value} was placed!`)
                                console.log("localstorage email = ", localStorage.getItem('user-email'))
                                getCarInfoJson(bidAmount.value, getParameterByName('id'), localStorage.getItem("user-email"))
                                location.reload();
                            }
                        } else if(bidAmount.value === '') {
                            alert('Bid field cannot be empty!')
                            bidAmount.style.borderColor = 'RED'
                        } else if(localStorage.getItem('session-key') === '' || localStorage.getItem('session-key') === null){
                            alert('User should be logged in to place bid')
                            alert('Redirecting to login page')
                            window.location.href = "./login-page.html";
                        }
                    })
            }
        })
}




if (getParameterByName('id') !== null){
    getCarData(getParameterByName('id'));
}




