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
      .waitForElementVisible('div[id="div-caregiver"]', 40000)
      .assert.textContains(
        'div[id="div-caregiver"]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      // Navigazione sulla pagina di creazione storia
      .waitForElementVisible('button[id=creaStoria]', 40000)
      .click('button[id=creaStoria]')

      // Caricamento storia
      .waitForElementVisible('body')
      .assert.visible('div[id=text-area]')
      .assert.visible('div[id=descrizione-file]')
      .setValue('textarea[id=testo]', 'Che belli i boschi e i gattini')

      // .click('button[id=caricaFile]')
      // .waitForElementVisible('input[type="file"]', 40000)
      .setValue('input[type="file"]', 'assets/story.png')

      .setValue('textarea[id=descrizione]', 'Miao')

      .click('button[id=salvaStoria]')
      .waitForElementVisible('div[id=test]', 40000)

      .assert.containsText(
        'div[id=test]',
        'Caricamento storia effettuato con successo!'
      )
      .end();
  },
};
