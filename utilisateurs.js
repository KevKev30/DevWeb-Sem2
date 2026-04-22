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


function verifierMdp() {
    let mdp = document.getElementsByName("password")[0];
    if (mdp.value.trim() === "") {
        afficherErreur(mdp, "<br>Le champ est vide.");
        return false;
    } else if (mdp.value.length < 6) {
        afficherErreur(mdp, "<br>Le mot de passe doit contenir au moins 6 caractères.");
        return false;
    } else {
        afficherErreur(mdp, "");
        return true;
    }
}


function visibilite() {
    let champ = document.getElementsByClassName("champ")[0];
    if (champ.type === "password"){
        champ.type = "text";
    }
    else{
        champ.type = "password";
    }
}


function estEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}


function verifierEmail() {
    let email = document.getElementsByName("email")[0];
    if (email.value.trim() === "") {
        afficherErreur(email, "<br>Le champ est vide.");
        return false;
    } else if (!estEmail(email.value)) {
        afficherErreur(email, "<br>L'email n'est pas valide.");
        return false;
    } else {
        afficherErreur(email, "");
        return true;
    }
}