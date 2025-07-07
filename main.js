import './style.css';

document.getElementById("btnRechercher").addEventListener("click", () => {
  const nomPays = document.getElementById("inputPays").value.trim();
  const url = `https://restcountries.com/v3.1/name/${nomPays}?fullText=true`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pays introuvable");
      }
      return response.json();
    })
    .then(data => {
      const pays = data[0];
      const drapeau = pays.flags.svg;
      const nom = pays.name.common;
      const capitale = pays.capital[0];
      const population = pays.population.toLocaleString();
      const langue = Object.values(pays.languages)[0];
      const devise = Object.values(pays.currencies)[0].name;

      document.getElementById("resultat").innerHTML = `
        <h2>${nom}</h2>
        <img src="${drapeau}" alt="Drapeau de ${nom}" width="150">
        <p><strong>Capitale :</strong> ${capitale}</p>
        <p><strong>Population :</strong> ${population}</p>
        <p><strong>Langue :</strong> ${langue}</p>
        <p><strong>Devise :</strong> ${devise}</p>
      `;
    })
    .catch(error => {
      document.getElementById("resultat").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});
