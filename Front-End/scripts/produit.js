
// On récupère l'id du produit dans l'URL  
const queryString = window.location.search
let id = queryString.slice(4)
console.log(id)


const produitIMG = document.querySelector(".img")
const produitDescription = document.querySelector(".produitDescription")
const produitPrix = document.querySelector("#prix")
const produitName = document.querySelector(".produitName")

// On récupère le produit depuis L'API grace a son ID
fetch('http://localhost:3000/api/cameras/'+ id)
    .then(
        response => response.json()
    )
    .then(
        (data) => {
            console.log(data)
            produitIMG.src = data.imageUrl
            produitDescription.innerHTML = `<p>${data.description}</p>`
            produitPrix.innerHTML = `${data.price/100}€`
            produitName.innerHTML = data.name
            console.log(produitIMG);
            console.log(produitDescription);
            console.log(produitName);
        }
    )

function AjouterPanier() {
    let loc = window.localStorage;

    let order = loc.getItem('commande');
    
    if (order === null) { 
        order = {};
    } else {
        order = JSON.parse( order );
    }

    if (id in order) {
        order[id] += 1;
    } else {
        order[id] = 1;
    }
    
    loc.setItem('commande', JSON.stringify(order) )
    
    console.log(order)
}

/*function afficheProduit(camera){
    const produit = document.createElement('div')
    console.log("si")
    produit.innerHTML = `
        <div class="cameramain">
            <img class="imgproduit" src="${camera['imageUrl']}">
        </div>
    `;
    document.getElementsByTagName('body').appendChild(produit);
}*/
