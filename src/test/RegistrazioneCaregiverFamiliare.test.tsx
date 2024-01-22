module.exports = {
  'Caregiver/Familiare Registration Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-caregiver-familiare]')
      .waitForElementVisible('h1[id=cg-title]', 1000)

      .setValue('input[name=nome]', 'Saverio')
      .setValue('input[name=cognome]', 'Napolitano')
      .setValue('input[name=indirizzo]', 'Via di Arlecchino Incantato')
      .setValue('input[name=numero_civico]', '7')
      .setValue('input[name=citta]', 'Teatropolis')
      .setValue('input[name=data_di_nascita]', '1999-01-01')
      .setValue('input[name=numero_di_telefono]', '0987234532')
      .setValue('input[name=email]', 'savnapolitano@example.it')
      .setValue('input[name=passwd]', 'SavNap1999!')

      .click('button[id=paziente-button]')
      .assert.textContains(
        'div[id=cg-fam-title]',
        'Inserisci i dati del tuo paziente!'
      )

      .end();
  },

  'Caregiver/Familiare: Email Fail Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-caregiver-familiare]')
      .waitForElementVisible('h1[id=cg-title]', 1000)

      .setValue('input[name=nome]', 'Martin Luther')
      .setValue('input[name=cognome]', 'King')
      .setValue('input[name=indirizzo]', 'Strada delle Stelle')
      .setValue('input[name=numero_civico]', '924')
      .setValue('input[name=citta]', 'Maricosta')
      .setValue('input[name=data_di_nascita]', '1929-01-15')
      .setValue('input[name=numero_di_telefono]', '1234567891')
      .setValue('input[name=email]', 'martin@example')
      .setValue('input[name=passwd]', 'Martin1929@!')

      .assert.textContains('body', 'Inserisci un indirizzo email valido.')

      .end();
  },

  'Caregiver/Familiare: Password Fail Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-caregiver-familiare]')
      .waitForElementVisible('h1[id=cg-title]', 1000)

      .setValue('input[name=nome]', 'Samantha')
      .setValue('input[name=cognome]', 'Cristoforetti')
      .setValue('input[name=indirizzo]', 'Via del Tramonto')
      .setValue('input[name=numero_civico]', '77')
      .setValue('input[name=citta]', 'Argentovia')
      .setValue('input[name=data_di_nascita]', '1977-01-01')
      .setValue('input[name=numero_di_telefono]', '7897897897')
      .setValue('input[name=email]', 'samantha@example.com')
      .setValue('input[name=passwd]', 'Cristoforetti1977')

      .assert.textContains('body', 'Inserisci una password valida.')

      .end();
  },

  'Caregiver/Familiare: Nome Fail Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-caregiver-familiare]')
      .waitForElementVisible('h1[id=cg-title]', 1000)

      .setValue(
        'input[name=nome]',
        'Teodolinda Anastasia Rosalinda Caterina Esmeralda'
      )
      .setValue('input[name=cognome]', 'Fioravantirossi')
      .setValue('input[name=indirizzo]', 'Vicolo dell\'Antica Fontana')
      .setValue('input[name=numero_civico]', '167')
      .setValue('input[name=citta]', 'Solleone')
      .setValue('input[name=data_di_nascita]', '1970-01-01')
      .setValue('input[name=numero_di_telefono]', '9876546370')
      .setValue('input[name=email]', 'tea@example.it')
      .setValue('input[name=passwd]', 'Teodolinda53!?')

      .assert.textContains('body', 'Inserisci un nome valido')

      .end();
  },
  'Caregiver/Familiare: Cognome Fail Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-caregiver-familiare]')
      .waitForElementVisible('h1[id=cg-title]', 1000)

      .setValue('input[name=nome]', 'Alessandro Marchesi')
      .setValue('input[name=cognome]', 'Ventimigliaresimostradivincenziano')
      .setValue('input[name=indirizzo]', 'Corso degli Ulivi')
      .setValue('input[name=numero_civico]', '90')
      .setValue('input[name=citta]', 'Acquafonte')
      .setValue('input[name=data_di_nascita]', '1980-01-01')
      .setValue('input[name=numero_di_telefono]', '9376452719')
      .setValue('input[name=email]', 'ale@example.it')
      .setValue('input[name=passwd]', 'AleMarchesi263?')

      .assert.textContains('body', 'Inserisci un cognome valido.')

      .end();
  },
  'Caregiver/Familiare: Indirizzo Fail Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-caregiver-familiare]')
      .waitForElementVisible('h1[id=cg-title]', 1000)

      .setValue('input[name=nome]', 'Alan')
      .setValue('input[name=cognome]', 'Turing')
      .setValue(
        'input[name=indirizzo]',
        'Viale dell\'Arcobaleno Splendente e Incantevole'
      )
      .setValue('input[name=numero_civico]', '12')
      .setValue('input[name=citta]', 'Rosavalle')
      .setValue('input[name=data_di_nascita]', '1912-01-01')
      .setValue('input[name=numero_di_telefono]', '0452819165')
      .setValue('input[name=email]', 'alan@example.it')
      .setValue('input[name=passwd]', 'Turing1912??')

      .assert.textContains('body', 'Inserisci un indirizzo valido.')

      .end();
  },
  'Caregiver/Familiare: Numero Civico Fail Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-caregiver-familiare]')
      .waitForElementVisible('h1[id=cg-title]', 1000)

      .setValue('input[name=nome]', 'Alber')
      .setValue('input[name=cognome]', 'Einstein')
      .setValue('input[name=indirizzo]', 'Via dell\'Alba Dorata')
      .setValue('input[name=numero_civico]', '45789642')
      .setValue('input[name=citta]', 'Brillacittà')
      .setValue('input[name=data_di_nascita]', '1879-03-14')
      .setValue('input[name=numero_di_telefono]', '1624582392')
      .setValue('input[name=email]', 'albert@example.it')
      .setValue('input[name=passwd]', 'Albert1879$')

      .assert.textContains('body', 'Inserisci un numero civico valido. Es. 34523 o 123/A')

      .end();
  },
  'Caregiver/Familiare: Citta Fail Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-caregiver-familiare]')
      .waitForElementVisible('h1[id=cg-title]', 1000)

      .setValue('input[name=nome]', 'Rosa Louise')
      .setValue('input[name=cognome]', 'Parks')
      .setValue('input[name=indirizzo]', 'Via della Luna Piena')
      .setValue('input[name=numero_civico]', '13')
      .setValue(
        'input[name=citta]',
        'Valleluceincantatadellasollevantebenevola'
      )
      .setValue('input[name=data_di_nascita]', '1913-02-04')
      .setValue('input[name=numero_di_telefono]', '2618346726')
      .setValue('input[name=email]', 'rosa@example.com')
      .setValue('input[name=passwd]', 'RosaParks1913!')

      .assert.textContains('body', 'Inserisci una città valida.')

      .end();
  },
  
  'Caregiver/Familiare: Numero Telefono Fail Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-caregiver-familiare]')
      .waitForElementVisible('h1[id=cg-title]', 1000)

      .setValue('input[name=nome]', 'Maria Salomea')
      .setValue('input[name=cognome]', 'Skłodowska')
      .setValue('input[name=indirizzo]', 'Corso dei Sogni Incantati')
      .setValue('input[name=numero_civico]', '56')
      .setValue('input[name=citta]', 'Valleblu')
      .setValue('input[name=data_di_nascita]', '1867-11-07')
      .setValue('input[name=numero_di_telefono]', '777444777888')
      .setValue('input[name=email]', 'marie@example.com')
      .setValue('input[name=passwd]', 'Marie1867@')

      .assert.textContains('body', 'Inserisci un numero di telefono valido.')

      .end();
  },



};
