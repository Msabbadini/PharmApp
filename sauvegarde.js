/* fonction qui enregistre en localStorage un objet puis le met à jour dans la variable globale */
function saveLS(obj_name, obj) {
  if (obj === "null" || typeof obj === "object") {
    obj_to_json = JSON.stringify(
      obj
    ); /* transforme un objet en chaîne de caractères JSON */
    window.localStorage.setItem(obj_name, obj_to_json);
    updateObj(obj, obj_name);
    console.log("Mise à jour localStorage de l'objet '" + obj_name + "' :");
    console.log(obj);
    return true;
  }
  console.log(
    "Erreur lors de l'enregistrement en storageLocal de l'objet '" +
      obj_name +
      "'"
  );
  console.log("Contenu de l'objet : " + obj);
  return false;
}

/* fonction qui récupère un élément du localStorage puis qui retourne son objet */
function getLS(nom) {
  var val = window.localStorage.getItem(nom);
  console.log("La val est " + val);
  if (val !== "null") {
    json_to_obj = JSON.parse(
      val
    ); /* transforme une chaîne de caractères JSON en objet */
    if (typeof json_to_obj === "object") {
      console.log("Récupération en localStorage de l'objet '" + nom + "' :");
      console.log(json_to_obj);
      return json_to_obj;
    }
  } else {
    console.log("Recuperation de l'objet " + nom + " impossible");
  }
  return {}; /* retourne un objet vide */
}

/* déclaration de mes variables globales */
// var stock = {};
var clients = {};
var employes = {};
var fournisseurs = {};

// /* initialisation des données enregistrées en localStorage sur mes variables globales */
stock = getLS("stock");
clients = getLS("clients");
employes = getLS("employes");
fournisseurs = getLS("fournisseurs");

console.log(stock);

/* fonction de suppression d'un élément dans un objet */
function deleteItem(item_name, obj_name, obj) {
  delete obj[item_name];
  if (saveLS(obj_name, obj)) {
    return true;
  }
  return false;
}

/* fonction de recherche d'un élément dans un objet */
function searchItem(name_item, obj_name) {
  let obj = getLS(obj_name);
  if (obj && typeof obj === "object" && obj[name_item]) {
    return obj[name_item];
  }
  console.log(
    "L'élément '" +
      name_item +
      "' dans l'objet '" +
      obj_name +
      "' n'existe pas."
  );
  return false;
}

/* fonction d'affichage de tous les éléments d'un objet dans un tableau html */
function listItems(obj_name) {
  let obj = getObj(obj_name);
  if (obj && obj !== "null" && typeof obj === "object") {
    //à compléter
  }
}

/* fonction d'ajout d'un élément */
function ajouter(obj_name, val1, val2) {
  if (!searchItem(val1, obj_name)) {
    //à compléter
  } else {
    alert("Cet élément existe déjà.");
  }
  return false;
}

/* fonction de modification d'un élément */
function modifier(obj_name, val1, val2) {
  if (searchItem(val1, obj_name)) {
    var obj = JSON.parse(window.localStorage.getItem(obj_name));
    obj[val1] = val2;
    console.log(obj);
    window.localStorage.setItem(obj_name, JSON.stringify(obj));
  } else {
    alert("Modification impossible. Voir la console.");
  }
  return false;
}
function ajouter(nom_obj, val1, val2) {
  var stock = getLS(nom_obj);
  if (stock === null || typeof stock !== "object") {
    stock = {};
  }
  stock[val1] = val2;

  console.log("Le stock est " + stock);
  saveLS(nom_obj, stock);
}

$(document).ready(function () {
  /* Modifier Produit START*/
  $("#modifierMedicament1").click(function () {
    $("#modifierMedicament h2").text("Veuillez modifier des medicaments");
    $(".content").hide();
    $("#modifierMedicament").fadeIn().show();
  });
  $("#modifMed").click(function (e) {
    e.preventDefault();
    var medicament = $("#nomM").val();
    var quantite = $("#quantiteM").val();
    modifier("stock", medicament, quantite);
  });

  /* Modifier Produit END*/

  /* Ajouter produit START */
  $("#ajouterMedicament1").click(function () {
    $("#ajouterMedicament h2").text("Veuillez ajouter des medicaments");
    $(".content").fadeOut(1000).hide();
    $("#ajouterMedicament").fadeIn().show();
  });

  $(".subMed").click(function (e) {
    var medicament = $("#nom").val();
    var quantite = $("#quantite").val();
    e.preventDefault();
    ajouter("stock", medicament, quantite);
  });

  /* Ajouter produit END */

  /* SUPPRIMER produit START */

  $("#supprimerMedicament1").click(function () {
    $("#supprimerMedicament h2").text("Veuillez supprimer des medicaments");
    $(".content").hide();
    $("#supprimerMedicament").fadeIn().show();
  });

  $("#stockMedicament1").click(function () {
    $("#stockMedicament h2").text("TOUS LES MEDICAMENTS");
    $(".content").hide();
    $("#stockMedicament").fadeIn().show();
  });

  $("#supMed").click(function (e) {
    e.preventDefault();
    var medicament = $("#nomS").val();
    deleteItem(medicament, "stock", stock);
    console.log(stock);
  });

  /* SUPPRIMER produit END */

  /* Staff */
  $("#ajouterStaff1").click(function () {
    $("#ajouterStaff h2").text(
      "Veuillez saisir le nom et le poste occupe de l'emplyee"
    );
    $(".content").fadeOut(1000).hide();
    $("#ajouterStaff").fadeIn().show();
  });

  $("#modifierStaff1").click(function () {
    $("#modifierStaff h2").text(
      "Veuillez modifier le poste ou le nom de l'emplyee"
    );
    $(".content").hide();
    $("#modifierStaff").fadeIn().show();
  });

  $("#supprimerStaff1").click(function () {
    $("#supprimerStaff h2").text("Veuillez supprimer un employee");
    $(".content").hide();
    $("#supprimerStaff").fadeIn().show();
  });
  $("#staff1").click(function () {
    $("#staff h2").text("TOUS LES EMPLOYEES");
    $(".content").hide();
    $("#staff").fadeIn().show();
  });

  $("#subStaff").click(function (e) {
    e.preventDefault();
    var nom = $("#nomStaff").val();
    var poste = $("#posteStaff").val();
    console.log(nom, poste);
    ajouter("employes", nom, poste);
  });
  $("#supStaff").click(function (e) {
    e.preventDefault();
    var nom = $("#nomSup").val();
    console.log(nom, poste);
    deleteItem(nom, "employes", employes);
  });

  $("#modifStaff").click(function (e) {
    e.preventDefault();
    var nom = $("#nomModifier").val();
    var poste = $("#posteModifier").val();
    modifier("employes", nom, poste);
  });

  /* Staff END */

  /* client START */
  $("#ajouterClient1").click(function () {
    $("#ajouterClient h2").text("Veuillez saisir le nom et le tel du client");
    $(".content").fadeOut(1000).hide();
    $("#ajouterClient").fadeIn().show();
  });

  $("#modifierClient1").click(function () {
    $("#modifierClient h2").text(
      "Veuillez saisir le nom et le tel du client pour modifier ses données"
    );
    $(".content").hide();
    $("#modifierClient").fadeIn().show();
  });

  $("#supprimerClient1").click(function () {
    $("#supprimerClient h2").text("Veuillez supprimer un client via son nom");
    $(".content").hide();
    $("#supprimerClient").fadeIn().show();
  });

  $("#client1").click(function () {
    $("#client h2").text("TOUS LES CLIENTS");
    $(".content").hide();
    $("#client").fadeIn().show();
  });

  $("#ajouterClient2").click(function (e) {
    e.preventDefault();
    var nom = $("#nomA").val();
    var tel = $("#telA").val();
    console.log(nom, tel);
    ajouter("clients", nom, tel);
  });
  $("#suppClient").click(function (e) {
    e.preventDefault();
    var nom = $("#clientSUP").val();
    console.log(nom, clients);
    deleteItem(nom, "clients", clients);
  });
  $("#modifClient").click(function (e) {
    e.preventDefault();
    var nom = $("#nomC").val();
    var tel = $("#telC").val();
    modifier("clients", nom, tel);
  });
  /* client END */
  /* FOURNISSEUR START*/
  $("#ajouterFournisseur1").click(function () {
    $("#ajouterFournisseur h2").text(
      "Veuillez saisir le nom et l'adresse du fournisseur"
    );
    $(".content").fadeOut(1000).hide();
    $("#ajouterFournisseur").fadeIn().show();
  });

  $("#supprimerFournisseur1").click(function () {
    $("#supprimerFournisseur h2").text("Veuillez supprimer le fournisseur");
    $(".content").fadeOut(1000).hide();
    $("#supprimerFournisseur").fadeIn().show();
  });

  $("#modifierFournisseur1").click(function () {
    $("#modifierFournisseur h2").text(
      "Veuillez modifier le nom et l'adresse du fournisseur"
    );
    $(".content").fadeOut(1000).hide();
    $("#modifierFournisseur").fadeIn().show();
  });
  $("#fournisseur").click(function () {
    $("#fournisseur1 h2").text("TOUS LES CLIENTS");
    $(".content").hide();
    $("#fournisseur1").fadeIn().show();
  });
  $("#ajoutFournisseur").click(function (e) {
    e.preventDefault();
    var nom = $("#nomFA").val();
    var adresse = $("#adresseFA").val();
    console.log(nom, adresse);
    ajouter("fournisseurs", nom, adresse);
  });
  $("#modifFournisseur").click(function (e) {
    e.preventDefault();
    var nom = $("#nomFM").val();
    var adresse = $("#adresseFM").val();
    modifier("fournisseurs", nom, adresse);
  });
  $("#supprimerFournisseur").click(function (e) {
    e.preventDefault();
    var nom = $("#nomFSUP").val();
    console.log(nom, fournisseurs);
    deleteItem(nom, "fournisseurs", fournisseurs);
  });
  /* FOURNISSEUR END*/
  /* Displaying localStorage data in HTML table */
});
