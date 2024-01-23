module.exports = {
  'Creazione storia corretta': (browser) => {
    browser
      // Login
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id="div-caregiver"]', 1000)
      .assert.textContains(
        'div[id="div-caregiver"]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      // Navigazione sulla pagina di creazione storia
      .waitForElementVisible('button[id=creaStoria]', 1000)
      .click('button[id=creaStoria]')

      // Caricamento storia
      .waitForElementVisible('body')
      .assert.visible('input[name=testo]')
      .assert.visible('input[name=descrizione]')
      .setValue('input[name=testo]', 'Che belli i boschi e i gattini')
      .setValue('input[name=descrizione]', 'Miao')

      .waitForElementVisible('input[type="file"]', 1000)
      .setValue('input[type="file"]', 'assets/story.png')

      .click('button[id=caricaFile]')

      .waitForElementVisible('div[id=test]', 1000)

      .assert.containsText(
        'div[id=test]',
        'Caricamento storia effettuato con successo!'
      )
      .end();
  },
};
