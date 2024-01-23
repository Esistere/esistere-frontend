module.exports = {
  'Creazione filastrocca corretta': (browser) => {
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
      .setValue('textarea[id=titolo-text-area]', 'Titolo')
      .setValue('textarea[id=testo-text-area]', 'Testo')
      .setValue('textarea[id=autore-text-area]', 'Autore')

      .click('button[id=creaFilastrocca]')

      .assert.containsText(
        'div[id=test]',
        'Caricamento filastrocca effettuato con successo!'
      )
      .end();
  },
};
