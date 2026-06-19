(function () {
  const INITIAL_SECONDS = 12 * 60;
  const FINAL_CODE = "4268891";

  const helper = (name) => (...args) => window.BlackoutPuzzleHelpers[name](...args);
  const checkbox = helper("checkbox");
  const checked = helper("checked");
  const value = helper("value");
  const selectRow = helper("selectRow");
  const availabilityRow = helper("availabilityRow");

  function shuffled(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function randomizedOptions(options) {
    const [placeholder, ...choices] = options;
    return [placeholder, ...shuffled(choices)];
  }

  function shuffledCheckboxes(choices) {
    return shuffled(choices)
      .map(([name, label]) => checkbox(name, label))
      .join("");
  }

  const easterPuzzles = {
    "egg-control": {
      order: 3,
      label: "Livre",
      index: 6,
      digit: "1",
      title: "Le Super Pouvoir de l'IA",
      question: "Quel est le prix de ce superbe ouvrage ?",
      answerType: "price",
      answer: "18.95",
      acceptedAnswers: ["18,95", "18.95 euros", "18,95 euros", "18 euros 95", "18e95", "18€95", "1895"],
      hint: "Vérifie son prix sur les plateformes.",
      success: "Bien vu. Le <strong>prix</strong> cache le <strong>troisième fragment bonus</strong>."
    },
    "egg-laundry": {
      order: 2,
      label: "Engie",
      index: 5,
      digit: "9",
      title: "Engie",
      question: "Quel est son slogan iconique ?",
      answerType: "slogan",
      answer: "J'agis avec Engie",
      acceptedAnswers: ["J agis avec Engie", "J'agis Engie", "Agis avec Engie", "Agir avec Engie", "J'agis avec ENGIE"],
      hint: "Il provient d'une campagne publicitaire lancée en 2018.",
      success: "Exact. Nous avons retrouvé leur <strong>slogan iconique</strong>. Voici le <strong>deuxième fragment bonus</strong> !"
    },
    "egg-mix": {
      order: 1,
      label: "OpenAI",
      index: 4,
      digit: "8",
      title: "OpenAI",
      question: "En quelle année ChatGPT est-il apparu au grand public ?",
      answerType: "year",
      answer: "2022",
      acceptedAnswers: ["en 2022", "novembre 2022", "2022."],
      hint: "Impossible d'oublier ça : nous l'avons tous vu passer.",
      success: "Correct. ChatGPT est arrivé au grand public en <strong>novembre 2022</strong>. Voici le <strong>premier fragment bonus</strong> !"
    }
  };

  const puzzles = {
    balance: {
      index: 0,
      digit: "4",
      title: "Le réseau est déséquilibré",
      kicker: "Énigme 1",
      room: "control",
      startDialogue: `Premier diagnostic : l'écran de contrôle compare la <strong>production</strong> et la <strong>consommation</strong>.

Nous devons trouver ce qui <strong>manque au réseau</strong>, puis choisir les bons leviers pour combler l'écart.`,
      endDialogue: `Nous avons rééquilibré la première alerte.

Ce que nous retenons : l'électricité doit être <strong>produite au moment où elle est consommée</strong>. Si la demande dépasse la production, la <strong>fréquence baisse</strong> et le réseau devient <strong>instable</strong>.`,
      fact: "Production et consommation doivent rester égales à chaque instant. Si la consommation dépasse la production, la fréquence baisse.",
      hints: [
        "Compare la consommation et la production : il manque une puissance précise.",
        "Il manque 3 GW d'équilibre. Ajouter 1 GW de production ou réduire la demande de 1 GW diminue l'écart de 1 GW."
      ],
      render() {
        return `
          <p>L'écran affiche <strong>79 GW</strong> de production, <strong>82 GW</strong> de consommation et une fréquence de <strong>74,0 Hz</strong>.</p>
          <p>Il y a donc <strong>3 GW d'écart</strong> à combler. Chaque action choisie doit réduire cet écart.</p>
          <div class="control-grid">
            ${shuffledCheckboxes([
              ["hydro", "Utiliser une réserve hydraulique : +1 GW de production"],
              ["offload", "Décaler des usages flexibles : -1 GW de demande"],
              ["gas", "Activer une centrale pilotable : +1 GW de production"],
              ["solar", "Compter sur le solaire de nuit : +2 GW annoncés, mais indisponible"]
            ])}
          </div>
        `;
      },
      validate(root) {
        return checked(root, "hydro") && checked(root, "offload") && checked(root, "gas") && !checked(root, "solar");
      },
      correction: {
        type: "checkbox",
        expected: {
          hydro: true,
          offload: true,
          gas: true,
          solar: false
        }
      }
    },
    mix: {
      index: 1,
      digit: "2",
      title: "Reconstituer le mix français",
      kicker: "Énigme 2",
      room: "mixroom",
      startDialogue: `Dans cette salle, nous devons reconstituer le <strong>mix électrique français</strong>.

Nous classons les moyens de production du <strong>plus utilisé</strong> au <strong>moins utilisé</strong> pour comprendre d'où vient l'électricité qui circule sur le réseau.`,
      endDialogue: `Nous avons reconstitué le mix.

Ce que nous retenons : le mix énergétique français repose surtout sur le <strong>nucléaire</strong>, puis sur l'<strong>hydraulique</strong> et les renouvelables comme l'<strong>éolien</strong> et le <strong>solaire</strong>. Les centrales <strong>fossiles</strong> existent surtout comme appoint lors des tensions.`,
      fact: "En France, le nucléaire domine la production d'électricité. L'hydraulique est la première source renouvelable historique, puis viennent l'éolien et le solaire. Le gaz et le charbon servent surtout en appoint.",
      hints: [
        "La source la plus présente en France n'est pas une énergie fossile.",
        "Ordre attendu : nucléaire, hydraulique, éolien, solaire, gaz, charbon."
      ],
      render() {
        const options = randomizedOptions(["", "Nucléaire", "Hydraulique", "Éolien", "Solaire", "Gaz", "Charbon"]);
        return `
          <p>Classe les filières du plus utilisé au moins utilisé dans la production électrique française.</p>
          <div class="sort-list">
            ${selectRow(1, options)}
            ${selectRow(2, options)}
            ${selectRow(3, options)}
            ${selectRow(4, options)}
            ${selectRow(5, options)}
            ${selectRow(6, options)}
          </div>
        `;
      },
      validate(root) {
        const answer = ["Nucléaire", "Hydraulique", "Éolien", "Solaire", "Gaz", "Charbon"];
        return answer.every((source, position) => root.querySelector(`[name="rank-${position + 1}"]`).value === source);
      },
      correction: {
        type: "select",
        expected: {
          "rank-1": "Nucléaire",
          "rank-2": "Hydraulique",
          "rank-3": "Éolien",
          "rank-4": "Solaire",
          "rank-5": "Gaz",
          "rank-6": "Charbon"
        }
      }
    },
    weather: {
      index: 2,
      digit: "6",
      title: "Qui produit quand ?",
      kicker: "Énigme 3",
      room: "weatherroom",
      startDialogue: `La météo change tout. Il fait <strong>nuit</strong>, il y a <strong>peu de vent</strong> et la demande reste <strong>forte</strong>.

Nous devons associer chaque moyen de production à ce qu'il peut vraiment fournir dans ces conditions.`,
      endDialogue: `Nous avons lu la météo comme des opérateurs réseau.

Ce que nous retenons : toutes les sources ne jouent pas le même rôle. Certaines <strong>dépendent de la météo</strong>, d'autres peuvent <strong>réagir vite</strong>. Un réseau stable a besoin de production, mais aussi de <strong>flexibilité</strong>.`,
      fact: "Les moyens de production n'ont pas tous le même rôle. Le solaire et l'éolien dépendent de la météo, l'hydraulique et le gaz peuvent réagir vite, le nucléaire fournit une base importante.",
      hints: [
        "Regarde le contexte : il fait nuit et il y a peu de vent.",
        "Le solaire est faible la nuit, l'éolien dépend du vent, l'hydraulique est réactif, le gaz peut couvrir les pics et le nucléaire est important et stable."
      ],
      render() {
        const options = randomizedOptions(["", "Très faible", "Dépend du vent", "Réactif", "Pilotable pour les pics", "Important et stable"]);
        const rows = shuffled([
          ["solar", "Solaire"],
          ["wind", "Éolien"],
          ["hydro", "Hydraulique"],
          ["gas", "Gaz"],
          ["nuclear", "Nucléaire"]
        ]);
        return `
          <p>Contexte : <strong>nuit</strong>, <strong>peu de vent</strong>, <strong>forte demande</strong>.</p>
          <div class="sort-list">
            ${rows.map(([name, label]) => availabilityRow(name, label, options)).join("")}
          </div>
        `;
      },
      validate(root) {
        return value(root, "solar") === "Très faible"
          && value(root, "wind") === "Dépend du vent"
          && value(root, "hydro") === "Réactif"
          && value(root, "gas") === "Pilotable pour les pics"
          && value(root, "nuclear") === "Important et stable";
      },
      correction: {
        type: "select",
        expected: {
          solar: "Très faible",
          wind: "Dépend du vent",
          hydro: "Réactif",
          gas: "Pilotable pour les pics",
          nuclear: "Important et stable"
        }
      }
    },
    offpeak: {
      index: 3,
      digit: "8",
      title: "Les heures creuses",
      kicker: "Énigme 4",
      room: "laundry",
      startDialogue: `Dernier levier côté consommation : le <strong>moment où nous consommons</strong>.

Nous programmons uniquement les <strong>appareils qui peuvent attendre</strong> afin de soulager le pic entre <strong>18 h</strong> et <strong>21 h</strong>.`,
      endDialogue: `Nous avons soulagé le pic.

Ce que nous retenons : <strong>économiser</strong> compte, mais <strong>décaler</strong> compte aussi. Reporter les <strong>usages flexibles</strong> aide le réseau à passer les pointes sans produire davantage dans l'urgence.`,
      fact: "Le réseau n'est pas seulement sensible à la quantité consommée. Il est aussi sensible au moment où l'on consomme. Décaler les usages flexibles aide à passer les pics.",
      hints: [
        "Cherche les usages qui peuvent attendre sans gêner l'utilisateur.",
        "À déplacer : voiture électrique, lave-linge, sèche-linge, ballon d'eau chaude."
      ],
      render() {
        return `
          <p>Le pic de consommation est prévu entre <strong>18 h</strong> et <strong>21 h</strong>. Programme seulement les usages qui peuvent attendre.</p>
          <div class="choice-list">
            ${shuffledCheckboxes([
              ["ev", "Voiture électrique"],
              ["washer", "Lave-linge"],
              ["dryer", "Sèche-linge"],
              ["water", "Ballon d'eau chaude"],
              ["hob", "Plaque de cuisson"],
              ["meeting", "Ordinateur en visio"]
            ])}
          </div>
        `;
      },
      validate(root) {
        return checked(root, "ev")
          && checked(root, "washer")
          && checked(root, "dryer")
          && checked(root, "water")
          && !checked(root, "hob")
          && !checked(root, "meeting");
      },
      correction: {
        type: "checkbox",
        expected: {
          ev: true,
          washer: true,
          dryer: true,
          water: true,
          hob: false,
          meeting: false
        }
      }
    },
    final: {
      title: "Sauver le réseau",
      kicker: "Finale",
      room: "electrical",
      startDialogue: `Nous entrons le <strong>code final</strong> sur le tableau électrique.

Si nous connaissons déjà les <strong>sept chiffres</strong>, nous pouvons tenter notre chance directement et <strong>stabiliser la fréquence</strong>.`,
      endDialogue: `Réseau stabilisé.

Nous avons compris la logique complète : <strong>équilibrer production et consommation</strong>, connaître le <strong>mix</strong>, tenir compte de la <strong>météo</strong> et déplacer les <strong>usages flexibles</strong>.`,
      hints: [
        "Les sept chiffres sont dans le panneau de progression.",
        `Entre le code ${FINAL_CODE} pour stabiliser la fréquence.`
      ],
      render() {
        return `
          <p>Entre les sept chiffres dans l'ordre pour ramener le réseau à <strong>95 Hz</strong>.</p>
          <input type="text" inputmode="numeric" maxlength="7" name="finalCode" aria-label="Code final" placeholder="Code final">
        `;
      },
      validate(root) {
        const input = root.querySelector('[name="finalCode"]');
        return input && input.value.trim() === FINAL_CODE;
      },
      correction: {
        type: "text",
        field: "finalCode"
      }
    }
  };

  const roomPuzzleMap = {
    control: "balance",
    mixroom: "mix",
    weatherroom: "weather",
    laundry: "offpeak",
    electrical: "final"
  };

  const victoryLessons = [
    {
      title: "Équilibre",
      text: "Production = consommation à chaque instant."
    },
    {
      title: "Mix français",
      text: "Nucléaire en base, renouvelables en complément."
    },
    {
      title: "Disponibilité",
      text: "Météo et pilotage changent la réponse."
    },
    {
      title: "Heures creuses",
      text: "Décaler les usages soulage les pics."
    }
  ];

  window.BlackoutPuzzles = {
    INITIAL_SECONDS,
    FINAL_CODE,
    easterPuzzles,
    puzzles,
    roomPuzzleMap,
    victoryLessons
  };
})();
