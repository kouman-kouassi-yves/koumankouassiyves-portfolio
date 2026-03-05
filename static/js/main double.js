// main.js

// Quand la page est complètement chargée
document.addEventListener("DOMContentLoaded", () => {

  // On récupère le formulaire et la section contact
  const form = document.querySelector("form");
  const contactSection = document.querySelector("#contact");

  // Quand on clique sur "Envoyer" du formulaire
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // On récupère les valeurs des champs
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Si un champ est vide → afficher un message d'erreur
    if (name === "" || email === "" || message === "") {
      showMessage("⚠️ Remplis tous les champs avant d’envoyer.", "error");
      return;
    }

    // Si tout est rempli → afficher un message de succès
    showMessage(`✅ Merci ${name} ! Ton message a été envoyé.`, "success");

    // On vide les champs du formulaire
    form.reset();
  });

  // Fonction qui affiche un message sous le formulaire
  function showMessage(texte, type) {
    // Supprime l’ancien message s’il y en a un
    const ancien = document.querySelector(".form-message");
    if (ancien) ancien.remove();

    // Crée une nouvelle boîte de message
    const messageBox = document.createElement("div");
    messageBox.classList.add("form-message", type);
    messageBox.textContent = texte;

    // L’ajoute à la section contact
    contactSection.appendChild(messageBox);

    // Fait disparaître le message après 4 secondes
    setTimeout(() => {
      messageBox.remove();
    }, 4000);
  }
});
