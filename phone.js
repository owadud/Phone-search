
const notFound = document.getElementById("notFound");

document.getElementById('search').addEventListener('click', function () {

    const searchText = document.getElementById("searchText").value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))


});

const displayPhone = phones => {

    const parentDiv = document.getElementById('single-phone');

    //reset 
    parentDiv.innerHTML = '';
    notFound.innerHTML = "";

    document.getElementById('searchText').value = '';

    //---If meals not found---
    if (phones.length == 0) {
        return showNotFound();
    }

    //limit showing upto 20
    const phoneSlice = phones.slice(0,20);
    console.log(phones);
    phoneSlice.forEach(phone => {
      
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = ` <div class="single-result align-items-center my-3 p-3">
        <div class="col-md-12">
            <img  src=${phone.image} alt="">
            <h5 class="phone-brand mt-3">Brand: ${phone.brand}</h5>
            <h5 class="phone-name mt-3">Mobile: ${phone.phone_name}</h5>
            <button onclick="showDetails('${phone.slug}')" class="btn btn-success mt-3">Details</button>
    
        </div>
         
    </div>`;

        parentDiv.appendChild(phoneDiv);

    
    })

}

//Details section

const showDetails = (id) => {


    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data));

}

const displayDetails = detail => {

    const phone = document.getElementById('phone');

    const phoneDetails = `<div class="phoneDetails">
    <h2><span class="feature">Phone:</span> ${detail.name} </h2>
         <img src="${detail.image}"  class="details-img">
    <h5><span class="feature">Storage:</span> <li>${detail.mainFeatures.storage}</li>  </h5>
     <h5><span class="feature">Size:</span> <li> ${detail.mainFeatures.displaySize}</li></h5>
     <h5> <span class="feature"> ReleaseDate:</span> <li>${detail.releaseDate ? detail.releaseDate : 'Not available'}</li> </h5>

     <h5><span class="feature">Sensors:</span>
     <li> ${detail.mainFeatures.sensors}</li>
     </h5>
     <h5><span class="feature">Others:</span> <ul>
     <li>WLAN: ${detail.others ? detail.others.WLAN : 'Not Found'}</li>
     <li>Bluetooth: ${detail.others ? detail.others.Bluetooth : 'Not Found'}</li>
     <li>GPS: ${detail.others ? detail.others.GPS : 'Not Found'}</li>
     <li>USB: ${detail.others ? detail.others.USB : 'Not Found'}</li>
     
     </ul>

     </h5>
     
     </div>
     `;

    phone.innerHTML = phoneDetails;
    window.scroll(0, 0);
}

//Not found text
const showNotFound = () => {
    notFound.innerHTML = `<h1 class="not-found">This phone is not found. Please Try again with any other Name</h1>`;
}