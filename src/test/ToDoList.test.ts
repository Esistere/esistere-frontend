module.exports = {
  'Creazione ToDoList: test corretto': (browser) => {
    browser
      // Login
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'aleparziale@example.it')
      .setValue('input[name=passwd]', 'AleParz2000?')
      .click('button[id=login]')
      .waitForElementVisible('div[id=div-medico]', 40000)
      .assert.textContains(
        'div[id=div-medico]',
        'Visualizza la lista dei tuoi pazienti'
      )

      // Navigazione sulla pagina di creazione ToDoList
      .waitForElementVisible('button[id=visualizzaPazienti]', 40000)
      .click('button[id=visualizzaPazienti]')
      .waitForElementVisible('div[id=paziente0]', 40000)
      .click('div[id=paziente0]', 40000)
      .waitForElementVisible('button[id=creaToDoList]', 40000)
      .click('button[id=creaToDoList]', 40000)

      // Caricamento storia
      .assert.visible('input[type=number]')
      .setValue('input[type=number]', '2')

      // Set delle attività
      .assert.visible('input[id=attivita1]')
      .setValue(
        'input[id=attivita1]',
        'Il paziente deve partecipare a un’attività culinaria leggera, coinvolgendosi nella preparazione di piatti semplici come frullati di frutta o biscotti.'
      )
      .assert.visible('input[id=attivita2]')
      .setValue(
        'input[id=attivita2]',
        'Il paziente deve partecipare a un’attività di assemblaggio creativo, creando collages con immagini e materiali tattili.'
      )

      .click('button[id=salvaToDoList]')
      .waitForElementVisible('div[id=test]', 40000)

      .assert.containsText(
        'div[id=test]',
        'Caricamento ToDoList effettuato con successo!'
      )
      .end();
  },
};
