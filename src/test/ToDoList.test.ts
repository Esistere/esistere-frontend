module.exports = {
  'Creazione ToDoList: test corretto': (browser) => {
    browser
      // Login
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'aleparziale@example.com')
      .setValue('input[name=passwd]', 'AleParz2000?')
      .click('button[id=login]')
      .waitForElementVisible('div[id=div-medico]', 40000)
      .assert.textContains(
        'div[id=div-medico]',
        'Visualizza la lista dei tuoi pazienti'
      )

      .waitForElementVisible('button[id=visualizzaPazienti]', 40000)
      .click('button[id=visualizzaPazienti]')
      .waitForElementVisible('div[id=paziente0]', 40000);
    browser
      .execute(() => {
        const element = document.querySelector('div[id=paziente0]');
        if (element instanceof HTMLElement) {
          element.click();
        }
      })
      .waitForElementVisible('button[id=crea-todolist-button]', 40000)
      .click('button[id="crea-todolist-button"]')

      .assert.visible('input[type=number]')
      .setValue('input[type=number]', '2')

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

  'Creazione ToDoList: descrizione attività non nei limiti': (browser) => {
    browser
      // Login
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'aleparziale@example.com')
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
      .waitForElementVisible('div[id=paziente0]', 40000);
    browser
      .execute(() => {
        const element = document.querySelector('div[id=paziente0]');
        if (element instanceof HTMLElement) {
          element.click();
        }
      })
      .waitForElementVisible('button[id=crea-todolist-button]', 40000)
      .click('button[id="crea-todolist-button"]')

      // Caricamento storia
      .assert.visible('input[type=number]')
      .setValue('input[type=number]', '2')

      // Set delle attività
      .assert.visible('input[id=attivita1]')
      .setValue(
        'input[id=attivita1]',
        'Il paziente deve partecipare a un\'attività musicale interattiva, come suonare strumenti a percussione leggera o seguire melodie con piccoli movimenti'
      )
      .assert.visible('input[id=attivita2]')
      .setValue(
        'input[id=attivita2]',
        'Il paziente deve partecipare attivamente a un coinvolgente processo di riconoscimento olfattivo, avvicinandosi alla sperimentazione sensoriale attraverso la percezione di odori familiari, quali fragranze di erbe aromatiche o delicati profumi di fiori. Questo coinvolgimento in un\'attività di stimolazione sensoriale mirata potrebbe non solo favorire il rafforzamento delle connessioni cognitive, ma anche contribuire al benessere generale del paziente, stimolando la memoria olfattiva e suscitando ricordi associati a esperienze passate. In tal modo, si potrebbe promuovere un ambiente terapeutico che va oltre la semplice gestione dei sintomi, offrendo un\'opportunità di esplorazione sensoriale e connessione emotiva attraverso il riconoscimento di odori che evocano un mondo di sensazioni e ricordi, arricchendo così l\'esperienza terapeutica complessiva del paziente'
      )
      
      .assert.containsText(
        'body',
        'Inserisci un argomento di al più 300 caratteri.'
      )
      .end();
  },
  'Creazione ToDoList: numero attività non nei limiti': (browser) => {
    browser
      // Login
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'aleparziale@example.com')
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
      .waitForElementVisible('div[id=paziente0]', 40000);
    browser
      .execute(() => {
        const element = document.querySelector('div[id=paziente0]');
        if (element instanceof HTMLElement) {
          element.click();
        }
      })
      .waitForElementVisible('button[id=crea-todolist-button]', 40000)
      .click('button[id="crea-todolist-button"]')

      // Caricamento storia
      .assert.visible('input[type=number]')
      .setValue('input[type=number]', '0')
      
      .click('button[id=salvaToDoList]')
      .assert.containsText(
        'body',
        'Riempi prima tutti i tuoi dati'
      )
      .end();
  },
};
