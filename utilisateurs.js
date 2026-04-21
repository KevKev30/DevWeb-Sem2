function supprimerMsg(name){
    name.forEach(function(em){em.remove();});
}

function afficherErreur(element, message) {
    let parent = element.parentNode;
    let anciens = parent.querySelectorAll("em");
    supprimerMsg(anciens);

    if (message){
        let em = document.createElement("em");
        em.style.color = "red";
        em.innerHTML = message;
        parent.appendChild(em);
    }
}

function estVide(name){
    let elt = document.getElementsByName(name)[0];

    if (elt.value.trim() === ""){
        afficherErreur(elt, "<br>Le champ est vide.");
        return true;
    }
    afficherErreur(elt, "");
    return false;
}