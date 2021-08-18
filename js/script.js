function saleCountDown (saleDate, id) {
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

            //deleted seconds for now
            // document.getElementById(`seconds-${id}`).innerText = Math.floor((distance % (minute)) / second);
        }, 0)
}


const carContainer = document.querySelector('#car-container')

fetch('http://localhost:3000/cars')
    .then(res => { return res.json() })
    .then(data => {


        var i,j, temporary, chunk = 3;
        for (i = 0,j = data.length; i < j; i += chunk) {
            temporary = data.slice(i, i + chunk);
            // do whatever
            const newRow = document.createElement(`DIV`)
            newRow.classList.add('row')

            for (const temporaryElement of temporary) {
                const newCol = document.createElement(`DIV`)
                newCol.classList.add('.col')
                newCol.innerHTML =

                    `<div class="card" style="width: 18rem;">

  <img src="${temporaryElement.image}" class="card-img-top img-thumbnail" alt="...">
  <div class="card-body">
    <h5 class="card-title">${temporaryElement.car}</h5>
  </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"><span class="font-weight-bold">Model: </span>${temporaryElement.model}</li>
        <li class="list-group-item"><span class="font-weight-bold">Year: </span>${temporaryElement.year}</li>
        <li class="list-group-item" ><span class="font-weight-bold">Original price: </span>$ ${temporaryElement.price}</li>
        <li class="list-group-item"><small><span class="font-weight-bold">Time left:</span> Days <span id="days-${temporaryElement.id}"></span> / Hrs <span id="hours-${temporaryElement.id}"></span> / Mins <span id="minutes-${temporaryElement.id}"></span></small></li>
        <li class="list-group-item"><span class="font-weight-bold">ID: </span>${temporaryElement.id}</li>
        <li class="list-group-item"><a href="./car-page.html?id=${temporaryElement.id}" class="link-primary font-weight-bold car-link">Go to car page</a></li>
        <li class="list-group-item"><p class="p-3 mb-2 bg-warning text-dark">Current bid: $ ${temporaryElement.currentBid}</p></li>
    </ul>
</div>`

                newRow.appendChild(newCol)
                saleCountDown(temporaryElement.saleDate, temporaryElement.id)
            }
            carContainer.appendChild(newRow)
        }
    })





