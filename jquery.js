/* fonction qui enregistre en localStorage un objet puis le met à jour dans la variable globale */
function saveLS(obj_name, obj) {
  if (obj === "null" || typeof obj === "object") {
    obj_to_json = JSON.stringify(
      obj
    ); /* transforme un objet en chaîne de caractères JSON */
    window.localStorage.setItem(obj_name, obj_to_json);
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
/* verif string */
function str(msg) {
  if (isNaN(msg) && msg !== "") {
    return true;
  } else {
    return false;
  }
}
/* fonction qui check si c'est un nombre entier positif*/
function NombreEntierPositif(nbProduit) {
  if (!isNaN(nbProduit) && nbProduit % 1 === 0 && nbProduit >= 0) {
    return true;
  } else {
    return false;
  }
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
var stocks = {};
var clients = {};
var employes = {};
var fournisseurs = {};
// /* initialisation des données enregistrées en localStorage sur mes variables globales */
stocks = getLS("stocks");
clients = getLS("clients");
employes = getLS("employes");
fournisseurs = getLS("fournisseurs");
/* fonction de suppression d'un élément dans un objet */
function deleteItem(item_name, obj_name, obj) {
  console.log(obj.item_name);
  delete obj[item_name];
  if (saveLS(obj_name, obj)) {
    console.log(obj);
    return true;
  }
  console.log("Il y a une erreur");
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
function ajouterHTML(key, $idTable) {
  var obj = JSON.parse(window.localStorage.getItem(key));
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      $($idTable).append(
        `<tr>
        <td>${key}</td>
        <td>${obj[key]}</td>
        </tr>`
      );
    }
  }
}
function ajt(nom_obj, val1, val2) {
  var stocks = getLS(nom_obj);
  if (stocks === null || typeof stocks !== "object") {
    stocks = {};
  }
  stocks[val1] = val2;
  saveLS(nom_obj, stocks);
}
function check_nom($inputVal1) {
  var pattern = /^[a-zA-Z]*$/;
  var fname = $($inputVal1).val();
  if (pattern.test(fname) && fname !== "") {
    $($inputVal1).css("border", "2px solid green");
    return true;
  } else {
    $($inputVal1).css("border", "2px solid red");
    return false;
  }
}
function check_qunatite(quan, $inputVal2, $key) {
  if ($key === "employes") {
    if (check_nom($inputVal2) && $inputVal2 !== "") {
      $($inputVal2).css("border", "2px solid green");
      return true;
    } else {
      $($inputVal2).css("border", "2px solid red");
      return false;
    }
  } else if ($key === "fournisseurs") {
    if (!NombreEntierPositif(quan)) {
      $($inputVal2).css("border", "2px solid green");
      return true;
    } else {
      $($inputVal2).css("border", "2px solid red");
      return false;
    }
  } else {
    if (NombreEntierPositif(quan) && $inputVal2.val() !== "") {
      $($inputVal2).css("border", "2px solid green");
      return true;
    } else {
      $($inputVal2).css("border", "2px solid red");
      return false;
    }
  }
}
function revealSection($btn, $param2) {
  $($btn).click(function () {
    $("h5").html("");
    $(".content").slideUp(100);
    $("#bienvenue").hide();
    $param2.slideDown(1000);
  });
}
function champsVide($inputVal1) {
  var input = $inputVal1.val();
  if (input === "") {
    $($inputVal1).css("border", "2px solid red");
    return true;
  } else {
    return false;
  }
}
function rougeVert($inputVal1, $inputVal2, $key) {
  $($inputVal1).focusout(function () {
    check_nom($inputVal1);
  });
  $($inputVal2).focusout(function () {
    let quantite = $inputVal2.val();
    check_qunatite(quantite, $inputVal2, $key);
  });
}
function ajouterElement($param1,$param2,$h2,$key,$btnEl,$inputVal1,$inputVal2,$htmlText) {
  $param1.click(function () {
    $h2.text($htmlText);
    $(".content").slideUp(1000);
    $("h5").html("");
    $param2.slideDown(600);
  });
  rougeVert($inputVal1, $inputVal2, $key);
  $btnEl.click(function () {
    var medicament = $inputVal1.val();
    var quantite = $inputVal2.val();
    if (check_nom($inputVal1) &&check_qunatite(quantite, $inputVal2, $key) &&!champsVide($inputVal1) & !champsVide($inputVal2)) {
      ajt($key, medicament, quantite);
      $($inputVal1).val("").css("border", "2px solid transparent");
      $($inputVal2).val("").css("border", "2px solid transparent");
      $("h5").html($key.toUpperCase().slice(0, -1) + " ajouté").css("color", "green");
      $("#1").append(`<tr><td>${medicament}</td><td>${quantite}</td></tr>`);
      console.log("SUCCESS MEDICAMENT");
    } else {
      $("h5").html("Champ/s incorrect/s").css("color", "red");
      console.log("ERROR " + $key + "//////////////////////////////");
    }
  });
}
function modifElement($key,$param1,$param2,$h2,$btnEl,$inputVal1,$inputVal2,$htmlText,$idTable) {
  $param1.click(function () {
    $h2.text($htmlText);
    $("h5").html("");
    $(".content").slideUp(1000);
    $("#bienvenue").hide(500);
    $param2.slideDown(600);
  });
  rougeVert($inputVal1, $inputVal2, $key);
  $btnEl.click(function (e) {
    e.preventDefault();
    var medicament = $inputVal1.val();
    var quantite = $inputVal2.val();

    if (check_nom($inputVal1) &&check_qunatite(quantite, $inputVal2, $key) &&searchItem(medicament, $key) &&!champsVide($inputVal2)) {
      modifier($key, medicament, quantite);
      $($inputVal1).val("").css("border", "2px solid transparent");
      $($inputVal2).val("").css("border", "2px solid transparent");
      $("h5").html($key.toUpperCase().slice(0, -1) + " modifié").css("color", "green");
      $($idTable).append(`<tr><td>${medicament}</td><td>${quantite}</td><td>modifié</td></tr>`);
    } else {$("h5").html("Champ/s incorrect/s. Cet " +$key.toUpperCase().slice(0, -1) +" n'existe pas.").css("color", "red");
      $($inputVal1).css("border", "2px solid red");
    }
  });
}
function suppElement($key,$varGl,$param1,$param2,$h2,$btnEl,$inputVal1,$htmlText
  ) {
  $param1.click(function () {
    $h2.text($htmlText);
    $("h5").html("");
    $(".content").slideUp(1000);
    $param2.slideDown(600);
  });
  rougeVert($inputVal1, ($inputVal2 = ""), $key);
  $btnEl.click(function () {
    var medicament = $inputVal1.val();
    $("#trueBtn").click(function () {
      console.log();
      if (
        check_nom($inputVal1) &&
        searchItem(medicament, $key) &&
        !champsVide($inputVal1)
      ) {
        var hey = JSON.parse(window.localStorage.getItem($key));
        deleteItem(medicament, $key, hey);
        $($inputVal1).val("").css("border", "2px solid transparent");
        $("h5").html($key.toUpperCase().slice(0, -1) + " supprimé").css("color", "green");
      } else {
        $("h5").html("Champ/s incorrect/s. Ce " +$key.toUpperCase().slice(0, -1) +" n'existe pas.").css("color", "red");
        $($inputVal1).css("border", "2px solid red");
      }
    });
  });
}
$(document).ready(function () {
  $(document).mousemove(function (e) {
    e.preventDefault();
    var p_left = e.pageX;
    var p_top = e.pageY;
    $("#img").css({ left: p_left, top: p_top });
  });
  // Accueil
  $('#menu').click(function () {$(".content").slideUp(1000);$("#bienvenue").hide(500);$('#menu1').slideDown(600);});
  // Ajouter
  ajouterElement($("#ajouterFournisseur1"),$("#ajouterFournisseur"),$("#ajouterFournisseur h2"),"fournisseurs",$("#ajoutFournisseur"),$("#nomFA"),$("#adresseFA"),"Ajouter fournisseurs" );
  ajouterElement($("#ajouterMedicament1"),$("#ajouterMedicament"),$("#ajouterMedicament h2"),"stocks",$(".subMed"),$("#nom"),$("#quantite"),"Ajouter medicament");
  ajouterElement($("#ajouterStaff1"),$("#ajouterStaff"),$("#ajouterStaff h2"),"employes",$("#subStaff"),$("#nomStaff"),$("#posteStaff"),"Ajouter employées");
  ajouterElement($("#ajouterClient1"),$("#ajouterClient"),$("#ajouterClient h2"),"clients",$("#ajouterClient2"),$("#nomA"),$("#telA"),"Ajouter clients");
  // Modifier
  modifElement("stocks",$("#modifierMedicament1"),$("#modifierMedicament"),$("#modifierMedicament h2"),$("#modifMed"),$("#nomM"),$("#quantiteM"),"Modifier medicament",$('#1'));
  modifElement("employes",$("#modifierStaff1"),$("#modifierStaff"),$("#modifierStaff h2"),$("#modifStaff"),$("#nomModifier"),$("#posteModifier"),"Modifier Employées",$('#2'));
  modifElement("clients",$("#modifierClient1"),$("#modifierClient"),$("#modifierClient h2"),$("#modifClient"),$("#nomC"),$("#telC"),"Modifier clients",$('#3'));
  modifElement("fournisseurs",$("#modifierFournisseur1"),$("#modifierFournisseur"),$("#modifierFournisseur h2"),$("#modifFournisseur"),$("#nomFM"),$("#adresseFM"),"Modifier fournisseurs",$('#4'));
  // Supprimer
  suppElement("employes",employes,$("#supprimerStaff1"),$("#supprimerStaff"),$("#supprimerStaff h2"),$("#supStaff"),$("#nomSupStaff"),"Supperimer employées");
  suppElement("stocks",stocks,$("#supprimerMedicament1"),$("#supprimerMedicament"),$("#supprimerMedicament h2"),$("#supMed"),$("#nomS"),"Supprimer medicament");
  suppElement("clients",clients,$("#supprimerClient1"),$("#supprimerClient"),$("#supprimerClient h2"),  $("#suppClient"),("#clientSUP"),"Supprimer clients");
  suppElement("fournisseurs",fournisseurs,$("#supprimerFournisseur1"),$("#supprimerFournisseur"),$("#supprimerFournisseur h2"),$("#supFournisseur"),$("#nomFSUP"),"Supprimer fournisseurs");
});
//Tables
ajouterHTML("stocks", $("#1"));
ajouterHTML("employes", $("#2"));
ajouterHTML("clients", $("#3"));
ajouterHTML("fournisseurs", $("#4"));
revealSection("#stockMedicament1", $("#stockMedicament"));
revealSection("#staff1", $("#staff"));
revealSection("#client1", $("#client"));
revealSection("#fournisseur", $("#fournisseur1"));
