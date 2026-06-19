(function () {
  const introDialogue = `<strong>Alerte générale.</strong> Un pic de consommation frappe la ville pendant une vague de chaleur. Nous prenons le relais comme techniciens Engie, coincés dans la salle de contrôle : la porte est reliée au tableau électrique.

Nous avons <strong>12 minutes</strong> pour réussir à <strong>déverrouiller la porte finale</strong> !

Pas besoin d'être expert : chaque salle nous apprend une idée simple. Nous observons, utilisons les indices si nécessaire, récupérons les <strong>fragments de code</strong> et ramenons la fréquence à <strong>95 Hz</strong>.

<strong>Attention :</strong> <strong>3 easter eggs</strong> sont aussi cachés dans les salles.`;

  const roomGuides = {
    control: "Salle de contrôle : nous comparons les deux chiffres. S'il manque de la puissance, nous devons ajouter de la production ou réduire la demande.",
    mixroom: "Bureau du mix : nous pensons aux grandes familles de production. En France, le nucléaire arrive très haut dans le classement.",
    weatherroom: "Station météo : nous regardons le contexte avant de choisir. La nuit, le solaire produit très peu ; sans vent, l'éolien est limité.",
    laundry: "Local technique : ici, nous devons comprendre que la question n'est pas seulement combien nous consommons, mais quand nous consommons.",
    electrical: "Tableau final : nous entrons les fragments dans l'ordre. En mode jury, nous pouvons aussi utiliser le code final directement pour montrer la fin."
  };

  const juryMessages = {
    control: "Message jury : nous découvrons que l'électricité se stocke très peu à grande échelle. Le réseau doit donc équilibrer production et consommation à chaque instant.",
    mixroom: "Message jury : nous reconstituons le mix français, majoritairement nucléaire, puis hydraulique, éolien, solaire et moyens fossiles d'appoint.",
    weatherroom: "Message jury : nous voyons que toutes les énergies ne sont pas disponibles au même moment. La météo et la pilotabilité changent la stratégie du réseau.",
    laundry: "Message jury : nous montrons que déplacer certains usages en dehors des pics peut aider le réseau autant qu'une baisse de consommation.",
    electrical: "Message jury : la victoire assemble tout. Nous stabilisons le réseau grâce au bon équilibre, au bon mix et au bon moment de consommation."
  };

  window.BlackoutDialogues = {
    introDialogue,
    roomGuides,
    juryMessages
  };
})();
