module.exports = {
  'Creazione storia corretta': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/caregiver/crea_storia')
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
