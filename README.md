# PharmApp
PharmApp : l’application du pharmacien
1 - Définition du projet :
Faire un site web qui permet à un pharmacien de :
- Enregistrer des médicaments en stock (nom du médicament + quantité en stock)
- Modifier un médicament en stock (nom + quantité).
- Supprimer un médicament du stock.
- Ajouter / modifier / supprimer des clients (nom + numéro de téléphone).
- Ajouter / modifier / supprimer des employés (nom + poste occupé au sein de la
pharmacie).
- Ajouter / modifier / supprimer des fournisseurs (nom + adresse).
2 - Technologies utilisés :
HTML / CSS / Javascript vanilla / jQuery
3 - Contraintes techniques :
Le stockage des données doit se faire via des objets qui eux-mêmes doivent être enregistré
en mémoire locale (« localStorage »).
Utiliser les « input type text » pour les noms / numéro de téléphone / poste occupé /
quantité.
Utiliser un « textarea » pour l’adresse des fournisseurs.
Utiliser en Javascript vanilla, au minimum : Number(), %1, isNaN(), confirm(), fonctions,
objets, boucles, variables, localStorage, JSON (pour l’enregistrement des données dans le
localStorage, voir fin du cours)
Utiliser en jQuery, au minimum : html(), e.preventDefault(), css() ou addClass() /
removeClass() / toggleClass(), focusin(), focusout(), click(), submit(), val().
4 - Contraintes fonctionnelles :
Tous les champs de formulaire doivent être vérifiés :
- Tous les champs sont obligatoires (mettre les champs de formulaire avec une
bordure rouge et un texte d’erreur si les champs sont mal remplis ou vides)
- Nom produit / nom client / nom employé / nom fournisseur : une chaîne de
caractères non nulle
- Quantité en stock / téléphone : un nombre entier positif
5 - Pages :
Page d’accueil : page présentant le site (l’application) avec logo centré + texte de
présentation
Page ajout médicaments : page permettant l’ajout d’un médicament (nom + quantité en
stock) via un formulaire.
Page liste des produits : page affichant la liste des produits en stock (nom + quantité +
bouton permettant sa modification + bouton permettant sa suppression avec message
d’alerte demandant la confirmation).
Page modification produit : page permettant la modification d’un produit (nom et quantité).
Page ajout client : page permettant l’ajout d’un client via un formulaire.
Page liste des clients : page affichant la liste des clients en stock (nom + numéro de
téléphone + bouton permettant sa modification + bouton permettant sa suppression avec
message d’alerte demandant la confirmation).
Page de modification d’un client : page permettant la modification d’un client (nom et
numéro de téléphone).
Page ajout employé : page permettant l’ajout d’un employé via un formulaire (nom + poste
occupé au sein de la pharmacie).
Page liste des employés : page affichant la liste des clients en stock (nom + poste occupé +
bouton permettant sa modification + bouton permettant sa suppression avec message
d’alerte demandant la confirmation).
Page de modification d’un employé : page permettant la modification d’un employé (nom et
poste occupé).
Page ajout fournisseur : page permettant l’ajout d’un fournisseur via un formulaire (nom +
adresse).
Page liste des fournisseurs : page affichant la liste des fournisseurs (nom + adresse +
bouton permettant sa modification + bouton permettant sa suppression avec message
d’alerte demandant la confirmation).
Page de modification d’un fournisseur : page permettant la modification d’un fournisseur
(nom et adresse).
6 - Charte graphique :
Couleur du texte (body) : #12263f
Gris éléments secondaires (bordures) : #95aac9
Couleurs principales :
- Bleu : # 44a6f1
- Vert : #88c250
Rouge pour les alertes : #E63757
