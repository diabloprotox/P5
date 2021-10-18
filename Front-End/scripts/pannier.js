const produitPrix = document.querySelector("#prix")
const produitName = document.querySelector(".produitName")
const produitQuantite = document.querySelector(".quantite")
const panier = document.querySelector("#panier")
let loc = window.localStorage;
let camera = JSON.parse(loc.getItem("commande"))
let produitachete = [];
for( let id in camera){
    produitachete.push(id)
}
let prixtotal = 0;



affichageProduits()
formRequest()

// Recuperation du produit selon son ID et affichage
function affichageProduits(){
    prixtotal = 0;
    document.querySelector('.prixtotal').innerHTML = prixtotal;
    panier.innerHTML = ' '
    camera = JSON.parse(loc.getItem('commande'))
    for (let id in camera){
        fetch('http://localhost:3000/api/cameras/'+id)
            .then(
                res => res.json()
            )
            .then(
                data =>{
                    panier.innerHTML += `
                        <tr>
                            <td class="produitName">${data.name}</td>
                            <td class="produitQuantite">${camera[id]}</td>
                            <td class="produitPrix">${(data.price/100)*camera[id]}€</td>
                            <td class="delete">
                            <button onclick="deleteProduit('${id}')"><i class="far fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    `
                    let quantite = parseFloat(camera[id])
                    let price = (data.price)/100
                    prixTotal(quantite,price)
                    document.querySelector('.prixtotal').innerHTML = prixtotal;
                }
            )
    }
}

// On calcule le prix total des tous les produits
function prixTotal(quantite,prix){
    prixtotal += quantite*prix
}

// Function pour effacer un produit
function deleteProduit(id){
    let produits = JSON.parse(loc.getItem("commande"))
    delete produits[id]
    loc.setItem("commande",JSON.stringify(produits))
    affichageProduits()
}

//Formulaire d'envoi des donnes au BackEnd
function formRequest(){
    let inputEmail = document.querySelector("#email")
    let inputCity = document.querySelector("#city")
    let inputNom = document.querySelector("#nom")
    let inputPrenom = document.querySelector("#prenom")
    let inputAdresse = document.querySelector("#adresse")
    let inputCommande = document.querySelector("#commander")
    inputCommande.addEventListener("click", () => {
        const order = {
        contact: {
            firstName: inputPrenom.value,
            lastName: inputNom.value,
            address: inputAdresse.value,
            city: inputCity.value,
            email: inputEmail.value,
        },
        products: produitachete,
        }

        if (validateOrder(order)) {        
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            fetch('http://localhost:3000/api/cameras/order',options)
            .then(
                res => res.json()
            )
            .then(
                data => {
                    loc.clear();
                    loc.setItem("prix",prixtotal)
                    document.location.href = "./confirmation.html?orderid="+data.orderId
                }
            )
        } else {
            alert('Champ non valide')
        }
    })
    
}


// Validations des donnes du formulaire 

function validateOrder(order) {
    let re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email_ok =  re_email.test(String(order.contact.email).toLowerCase());
    let re_alph = /^[\w\-\s]+$/;
    let fname_ok =  re_alph.test(String(order.contact.firstName).toLowerCase());
    let lname_ok =  re_alph.test(String(order.contact.lastName).toLowerCase());
    let add_ok =  re_alph.test(String(order.contact.address).toLowerCase());
    let city_ok =  re_alph.test(String(order.contact.city).toLowerCase());
    return email_ok && fname_ok && lname_ok && add_ok && city_ok;
}