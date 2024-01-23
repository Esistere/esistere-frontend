module.exports = {
  // 'Creazione filastrocca: test corretto': (browser) => {
  //   browser
  //     // Login
  //     .url('http://localhost:3000/esistere-frontend#/login')
  //     .waitForElementVisible('body')
  //     .assert.visible('input[name=email]')
  //     .assert.visible('input[name=passwd]')
  //     .setValue('input[name=email]', 'emailsaverio@example.com')
  //     .setValue('input[name=passwd]', 'passwordSaverio24!')
  //     .click('button[id=login]')
  //     .waitForElementVisible('div[id="div-caregiver"]', 40000)
  //     .assert.textContains(
  //       'div[id="div-caregiver"]',
  //       'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
  //     )

  //     // Navigazione sulla pagina di creazione filastrocca
  //     .waitForElementVisible('button[id=creaFilastrocca]', 40000)
  //     .click('button[id=creaFilastrocca]')

  //     // Caricamento storia
  //     .waitForElementVisible('body')
  //     .assert.visible('textarea[id=titolo-text-area]')
  //     .assert.visible('textarea[id=testo-text-area]')
  //     .assert.visible('textarea[id=autore-text-area]')
  //     .setValue('textarea[id=titolo-text-area]', 'L’inverno')
  //     .setValue(
  //       'textarea[id=testo-text-area]',
  //       'Guanti, sciarpa, cappotto e berretto, scialle e calde pantofole mi metto, quando l’inverno è all’uscio. Chiusa sta la chiocciola nel guscio; molti animali non lascian la tana, quando fiocca o soffia tramontana.'
  //     )
  //     .setValue('textarea[id=autore-text-area]', 'Francesca')

  //     .click('button[id=creaFilastrocca]')

  //     .assert.containsText(
  //       'div[id=test]',
  //       'Caricamento filastrocca effettuato con successo!'
  //     )
  //     .end();
  // },
  // 'Creazione filastrocca: autore non nei limiti': (browser) => {
  //   browser
  //     // Login
  //     .url('http://localhost:3000/esistere-frontend#/login')
  //     .waitForElementVisible('body')
  //     .assert.visible('input[name=email]')
  //     .assert.visible('input[name=passwd]')
  //     .setValue('input[name=email]', 'emailsaverio@example.com')
  //     .setValue('input[name=passwd]', 'passwordSaverio24!')
  //     .click('button[id=login]')
  //     .waitForElementVisible('div[id="div-caregiver"]', 40000)
  //     .assert.textContains(
  //       'div[id="div-caregiver"]',
  //       'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
  //     )

  //     // Navigazione sulla pagina di creazione filastrocca
  //     .waitForElementVisible('button[id=creaFilastrocca]', 40000)
  //     .click('button[id=creaFilastrocca]')

  //     // Caricamento storia
  //     .waitForElementVisible('body')
  //     .assert.visible('textarea[id=titolo-text-area]')
  //     .assert.visible('textarea[id=testo-text-area]')
  //     .assert.visible('textarea[id=autore-text-area]')
  //     .setValue('textarea[id=titolo-text-area]', 'L’inverno')
  //     .setValue(
  //       'textarea[id=testo-text-area]',
  //       'L’inverno è arrivato col naso un po’ ghiacciato silenzio c’è nel bosco natura addormentata soffice gelida bianca e lieve vola leggera nel cielo la neve. '
  //     )
  //     .setValue(
  //       'textarea[id=autore-text-area]',
  //       'La tua nipote preferita Francesca'
  //     )

  //     .assert.containsText(
  //       'body',
  //       'Il campo Autore deve essere lungo al più 30 caratteri.'
  //     )
  //     .end();
  // },
  'Creazione filastrocca: testo non nei limiti': (browser) => {
    browser
      // Login
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id="div-caregiver"]', 40000)
      .assert.textContains(
        'div[id="div-caregiver"]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      // Navigazione sulla pagina di creazione filastrocca
      .waitForElementVisible('button[id=creaFilastrocca]', 40000)
      .click('button[id=creaFilastrocca]')

      // Caricamento storia
      .waitForElementVisible('body')
      .assert.visible('textarea[id=titolo-text-area]')
      .assert.visible('textarea[id=testo-text-area]')
      .assert.visible('textarea[id=autore-text-area]')
      .setValue('textarea[id=titolo-text-area]', 'Il castello sul colle')
      .setValue(
        'textarea[id=testo-text-area]',
        'Sul verde colle sorge un borgo medioevale, protetto da mura esterne e dominato da un castello centrale. Avvolto da un’atmosfera incantevole e misteriosa, ospita i suoi principi in una reggia fastosa. Si narra che un tempo un principe giunse sul colle, accompagnato dal suo cavallo e da un giullare un po’ folle. Passando per le vie vide una bella creatura, affacciata ad un balcone di un palazzo tra le mura. La dolce fanciulla lo guardò così intensamente, che da quel giorno il principe se ne innamorò perdutamente. Di lì a poco, nel vecchio castello disabitato, si celebrarono le nozze del principe innamorato. Nel borgo medioevale, come per magia, da quel giorno regnarono pace ed armonia. Il principe e la sua principessa chiamarono a corte buffoni, trovatori e musicanti d’ogni sorte. Aprendo il castello alla gioia e all’allegria sparirono di colpo malanni, guerre e carestia. Per chi volesse visitare il castello sul lontano colle basta avere un cavallo e un giullare un pò folle. Poi attraversando a cavallo una foresta incantata, si segue un grande fiume lungo una verde vallata. Guidati dalla musica sarà poi uno scherzo trovare il piccolo sentiero che porta al borgo medioevale!'
      )
      .setValue('textarea[id=autore-text-area]', 'Aurora')

      .assert.containsText(
        'body',
        'Il campo Testo deve essere lungo al più 300 caratteri.'
      )
      .end();
  },
  'Creazione filastrocca: titolo non nei limiti': (browser) => {
    browser
      // Login
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id="div-caregiver"]', 40000)
      .assert.textContains(
        'div[id="div-caregiver"]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      // Navigazione sulla pagina di creazione filastrocca
      .waitForElementVisible('button[id=creaFilastrocca]', 40000)
      .click('button[id=creaFilastrocca]')

      // Caricamento storia
      .waitForElementVisible('body')
      .assert.visible('textarea[id=titolo-text-area]')
      .assert.visible('textarea[id=testo-text-area]')
      .assert.visible('textarea[id=autore-text-area]')
      .setValue(
        'textarea[id=titolo-text-area]',
        'Chi ama la pace non pratica la guerra'
      )
      .setValue(
        'textarea[id=testo-text-area]',
        'Non si uccide per comandare. Non si conquista per liberare. Non si invade per difendere. I diritti non possono offendere. L’odio è nemico di tutta la Terra. Chi ama la pace non fa la guerra. Attenti a questi falsi sinonimi: Hanno ingannato fin troppi uomini.'
      )
      .setValue('textarea[id=autore-text-area]', 'Emanuele')

      .assert.containsText(
        'body',
        'Il campo Titolo deve essere lungo al più 30 caratteri.'
      )
      .end();
  },
};
