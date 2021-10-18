const prixtotal = document.querySelector(".prixtotal")
const orderID = document.querySelector(".orderID")

//on recupere l'order id depuis l'url
let params = new URL(document.location).searchParams
let orderid = params.get("orderid")


affichage()

//Function pour afficher le prix et l'orderid 
function affichage(){
    prixtotal.innerText = localStorage.getItem("prix");
    orderID.innerText = orderid
    localStorage.clear()
}

