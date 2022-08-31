const loadPhone = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(dataLimit)
    displayPhone(data.data, dataLimit)
}

// comon function

const procesSearch = (dataLimit) => {
    let getInput = document.getElementById('searchInput')
    let getInputValue = getInput.value;
    loadPhone(getInputValue, dataLimit)
    getInputValue = '';
}


const worningText = document.getElementById('wornigText');

const displayPhone = (phone, dataLimit) => {

    console.log(phone.length, dataLimit)

    const showMorePost = document.getElementById('showMore');

    if (dataLimit && phone.length > 12) {
        phone = phone.slice(0, 12)
        showMorePost.classList.remove('d-none')
    } else {
        showMorePost.classList.add('d-none')
    }

    //
    const phoneContainerDiv = document.getElementById('phoneContainerDiv');
    phoneContainerDiv.innerHTML = '';

    //  show search worning
    if (phone.length === 0) {
        worningText.classList.remove('d-none')
    } else {
        worningText.classList.add('d-none')
    }

    //  show phone
    phone.forEach(element => {
        let { image, slug, phone_name, brand } = element;
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card h-100 p-3">
        <div class="d-flex justify-content-center align-content-center">
        <img src="${image}" class="card-img-top img-fluid h-60 w-50" alt="...">
        </div>
            <div class="card-body">
                <h5 class="card-title">Phone Name : ${phone_name}</h5>
                <h5 class="card-title">Phone Brand : ${brand}</h5>
                <p class="card-text">Phone Details : ${slug} </p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal" onclick=" lodadPhoneDetails('${element.slug}')">
                Show Details
            </button>
            
            </div>
        </div>
    `
        phoneContainerDiv.appendChild(phoneDiv)
    });
    // stop lodaer 
    toggoleSpiner(false)
}

// search input fild enter ============


// document.getElementById("searchBtn").addEventListener("keydown", function (event) {
//     // console.log(event)
//     if (event.key === "Enter") {
//         toggoleSpiner(true)
//         procesSearch(10)

//     }
// });

document.getElementById("searchBtn").addEventListener("click", function () {
    // console.log(event)

    toggoleSpiner(true)
    procesSearch(12)

});


// lodad sppinar ==========

const toggoleSpiner = (isLodaing) => {
    const loadingSection = document.getElementById('loading')
    if (isLodaing) {
        loadingSection.classList.remove('d-none')
    } else {
        loadingSection.classList.add('d-none')
    }
}

// loda all phone in show all 

document.getElementById('showMoreBtn').addEventListener('click', function () {
    toggoleSpiner(true)
    procesSearch();
    // console.log('showMoreBtn clicked')
})

//================================

const lodadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = (phone) => {
    const { name, image, brand, mainFeatures, releaseDate } = phone

    const modalTitle = document.getElementById('phoneDeailsModal')
    modalTitle.innerText = `${name}`

    const modalMainDiv = document.getElementById('modalBodyDiv')

    const div = document.createElement('div')
    div.classList.add('modal-body')
    div.innerHTML = `
    <img src="${image}" class="card-img-top img-fluid h-60 w-50" alt="...">
    <div class="modal-body-inner p-3">
    <hr>
        <h5 class="card-text">brand : ${brand}</h5>
        <p class="card-text">Releas Date : ${releaseDate ? releaseDate : 'No Release Date Found'}</p>
        <p class="card-text">Phone Storeg : ${mainFeatures.storage}</p>
        <p class="card-text">Display Size : ${mainFeatures.displaySize}</p>
        <p class="card-text">ChipSet : ${mainFeatures.chipSet}</p>
        <p class="card-text">Releas Date : ${mainFeatures.memory}</p>
    <ul class="sensors-list">
        <h5 class="card-text">Sensors:</h5> 
        <li>${mainFeatures.sensors[0]}</li>
        <li>${mainFeatures.sensors[1]}</li>
        <li>${mainFeatures.sensors[2]}</li>
        <li>${mainFeatures.sensors[3]}</li>
        <li>${mainFeatures.sensors[4] ? mainFeatures.sensors[4] : 'No Data Available'}</li>
    </ul>
    </div>

    `
    modalMainDiv.appendChild(div)

}


loadPhone('a')