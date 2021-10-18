
// On récupère l'id du produit dans l'URL  
const queryString = window.location.search
let id = queryString.slice(4)


const produitIMG = document.querySelector(".img")
const produitDescription = document.querySelector(".produitDescription")
const produitPrix = document.querySelector("#prix")
const produitName = document.querySelector(".produitName")
const typesLentilles = document.querySelector("#lentilles-select")

// On récupère le produit depuis L'API grace a son ID
fetch('http://localhost:3000/api/cameras/'+ id)
    .then(
        res => res.json()
    )
    .then(
        (data) => {
            produitIMG.src = data.imageUrl
            produitDescription.innerHTML = `<p>${data.description}</p>`
            produitPrix.innerHTML = `${data.price/100}€`
            produitName.innerHTML = data.name
            for(let i = 0; i<data.lenses.length; i++){
                typesLentilles.innerHTML +=
                `<option value="${data.lenses[i]}">${data.lenses[i]}</option>
                `
            }
        }
    )

// Function pour ajouter le produit au panier donc au localstorage et le recupere plus tard
function ajouterPanier() {
    let loc = window.localStorage;
    let quantite = parseFloat(document.querySelector("#nombreproduits").value)
    let order = loc.getItem('commande')
    
    if (order === null) { 
        order = {};
    } else {
        order = JSON.parse( order );
    }
    if (id in order) {
        order[id] = String(parseInt(order[id]) + quantite);
    } else {
        order[id] = String(quantite);
    }
    loc.setItem('commande', JSON.stringify(order))
}

