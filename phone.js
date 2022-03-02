document.getElementById('search').addEventListener('click', function () {

    const searchText = document.getElementById("searchText").value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data =>displayPhone(data.data))

});

const displayPhone =phones =>  {

    const parentDiv = document.getElementById('single-phone');

    //reset 
    parentDiv.innerHTML = '';
    document.getElementById('searchText').value = '';

    phones.forEach(phone => {

        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = ` <div class="single-result align-items-center my-3 p-3">
        <div class="col-md-12">
            <img src=${phone.image} alt="">
            <h3 class="phone-brand">Brand: ${phone.brand}</h3>
            <h2 class="phone-name">Name: ${phone.phone_name}</h2>
            <button onclick="showDetails('${phone.slug}')" class="btn btn-success">Details</button>
    
        </div>
         
    </div>`;

        parentDiv.appendChild(phoneDiv);


    })

}

const showDetails = (id) =>{
    
    
    const url =` https://openapi.programming-hero.com/api/phone/${id}`;
    
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayDetails(data.data));
   
}

const displayDetails = detail =>{

    const phone = document.getElementById('phone');

    const phoneDetails = `
    <img src="${detail.image}">
    <h2>Storage: ${detail.mainFeatures.storage} </h2>
     <h3>Size: ${detail.mainFeatures.displaySize}</h3>
     `;

     phone.innerHTML=phoneDetails;
     window.scroll(0,0);
}

