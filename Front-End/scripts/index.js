
// Recuperation de L'API
fetch('http://localhost:3000/api/cameras')
            .then(
                response => response.json()
            )
            .then(
                (data) => {
                    for (var i = 0; i<data.length; i++) {
                        affiche(data[i]);
                    }
                }
            );

// Affichage des produits
function affiche(camera) {
    const produit = document.createElement('a');
    produit.setAttribute('href',`./produit.html?id=${camera['_id']}`);
    produit.innerHTML= `
        <div class="produit">
            <div class="produit_img">
                <img class="imgproduit" src="${camera['imageUrl']}">
            </div>
            <div class="produit_description">
                <h3>${camera['name']}</h3>
                ${camera['description']}
                <strong class="price">${camera['price']/100}€</strong>
            </div>
        </div>
    `;
    document.getElementById('produits_container').appendChild(produit);
}