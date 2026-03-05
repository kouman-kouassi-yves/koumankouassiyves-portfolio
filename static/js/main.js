// main.js

// Attend que tout le contenu de la page (HTML) soit chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", () => {

  // Sélectionne le premier élément <form> trouvé dans la page
  const form = document.querySelector("form");

  // Sélectionne la section <section id="contact"> pour y afficher les messages
  const contactSection = document.querySelector("#contact");

  // Écouteur d'événement : quand on "soumet" (submit) le formulaire
  form.addEventListener("submit", (e) => {

    // Empêche le rechargement de la page (comportement par défaut du formulaire)
    e.preventDefault();

    // Récupère et nettoie le texte saisi dans les champs du formulaire
    const name = form.name.value.trim();    // champ Nom
    const email = form.email.value.trim();  // champ Email
    const message = form.message.value.trim(); // champ Message

    // Vérifie si un des champs est vide
    if (!name || !email || !message) {
      // Si oui → afficher un message d'erreur
      showMessage("⚠️ Veuillez remplir tous les champs du formulaire.", "error");
      return; // Stoppe le code ici
    }

    // Si tous les champs sont remplis → afficher un message de succès
    showMessage(`✅ Merci ${name} ! Votre message a bien été envoyé.`, "success");

    // Réinitialise les champs du formulaire (vide les inputs et le textarea)
    form.reset();
  });

  // Fonction personnalisée pour afficher un message dans la page
  function showMessage(text, type) {

    // Vérifie s’il y a déjà un message affiché et le supprime
    const oldMsg = document.querySelector(".form-message");
    if (oldMsg) oldMsg.remove();

    // Crée un nouvel élément <div> pour le message
    const msg = document.createElement("div");

    // Ajoute les classes CSS "form-message" + le type ("success" ou "error")
    msg.classList.add("form-message", type);

    // Ajoute le texte du message à l’intérieur de la div
    msg.textContent = text;

    // Insère le message à la fin de la section #contact
    contactSection.appendChild(msg);

    // Fait disparaître le message automatiquement après 4 secondes
    setTimeout(() => {
      msg.remove();
    }, 4000);
  }
});
