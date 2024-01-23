module.exports = {
  // 'Caregiver/Familiare Registration Test': function (browser) {
  //   browser
  //     .url('http://localhost:3000/esistere-frontend#/registrazione')
  //     .waitForElementVisible('body', 1000)

  //     .click('button[id=registrazione-caregiver-familiare]')
  //     .waitForElementVisible('h1[id=cg-title]', 1000)

  //     .setValue('input[name=nome]', 'Saverio')
  //     .setValue('input[name=cognome]', 'Napolitano')
  //     .setValue('input[name=indirizzo]', 'Via di Arlecchino Incantato')
  //     .setValue('input[name=numero_civico]', '7')
  //     .setValue('input[name=citta]', 'Teatropolis')
  //     .setValue('input[name=data_di_nascita]', '1999-01-01')
  //     .setValue('input[name=numero_di_telefono]', '0987234532')
  //     .setValue('input[name=email]', 'savnapolitano@example.it')
  //     .setValue('input[name=passwd]', 'SavNap1999!')
  //     .setValue('input[name=conferma-passwd]', 'SavNap1999!')

  //     .click('button[id=paziente-button]')
  //     .assert.textContains(
  //       'div[id=cg-fam-title]',
  //       'Inserisci i dati del tuo paziente!'
  //     )

  //     .setValue('input[name=codice_fiscale]', 'TTVNGL15M66A634I')
  //     .setValue('input[name=nome_paziente]', 'Angelo')
  //     .setValue('input[name=cognome_paziente]', 'Ottaviano')
  //     .setValue('input[name=data_di_nascita_paziente]', '1966-03-15') // Formato: YYYY-MM-DD
  //     .setValue('input[name=autocomplete]', 'Alessandra Parziale')
  //     .pause(500)
  //     .click('li[data-option-index="0"]')
  //     .pause(500)

  //     .click('button[id=registrazione-button]')
  //     .waitForElementVisible('img[id=login]', 1000)
  //     .assert.textContains('body', 'Accedi')

  //     .end();
  // },

  // 'Caregiver/Familiare Name Fail Test': function (browser) {
  //   browser
  //     .url('http://localhost:3000/esistere-frontend#/registrazione')
  //     .waitForElementVisible('body', 1000)

  //     .click('button[id=registrazione-caregiver-familiare]')
  //     .waitForElementVisible('h1[id=cg-title]', 1000)

  //     .setValue('input[name=nome]', 'Saverio')
  //     .setValue('input[name=cognome]', 'Napolitano')
  //     .setValue('input[name=indirizzo]', 'Via di Arlecchino Incantato')
  //     .setValue('input[name=numero_civico]', '7')
  //     .setValue('input[name=citta]', 'Teatropolis')
  //     .setValue('input[name=data_di_nascita]', '1999-01-01')
  //     .setValue('input[name=numero_di_telefono]', '0987234532')
  //     .setValue('input[name=email]', 'savnapolitano@example.it')
  //     .setValue('input[name=passwd]', 'SavNap1999!')
  //     .setValue('input[name=conferma-passwd]', 'SavNap1999!')

  //     .click('button[id=paziente-button]')
  //     .assert.textContains(
  //       'div[id=cg-fam-title]',
  //       'Inserisci i dati del tuo paziente!'
  //     )

  //     .setValue('input[name=codice_fiscale]', 'NCRPHN38R55F735Y')
  //     .setValue(
  //       'input[name=nome_paziente]',
  //       'Ernesto Giovanni Paolo Quarto Di Inghilterra'
  //     )
  //     .setValue('input[name=cognome_paziente]', 'Di Luccia')
  //     .setValue('input[name=data_di_nascita_paziente]', '1951-01-12')
  //     .setValue('input[name=autocomplete]', 'Alessandra Parziale')
  //     .pause(500)
  //     .click('li[data-option-index="0"]')
  //     .pause(500)

  //     .assert.textContains('div[id=nome-paziente]', 'Inserisci un nome valido.')

  //     .end();
  // },
  // 'Caregiver/Familiare Cognome Fail Test': function (browser) {
  //   browser
  //     .url('http://localhost:3000/esistere-frontend#/registrazione')
  //     .waitForElementVisible('body', 1000)

  //     .click('button[id=registrazione-caregiver-familiare]')
  //     .waitForElementVisible('h1[id=cg-title]', 1000)

  //     .setValue('input[name=nome]', 'Saverio')
  //     .setValue('input[name=cognome]', 'Napolitano')
  //     .setValue('input[name=indirizzo]', 'Via di Arlecchino Incantato')
  //     .setValue('input[name=numero_civico]', '7')
  //     .setValue('input[name=citta]', 'Teatropolis')
  //     .setValue('input[name=data_di_nascita]', '1999-01-01')
  //     .setValue('input[name=numero_di_telefono]', '0987234532')
  //     .setValue('input[name=email]', 'savnapolitano@example.it')
  //     .setValue('input[name=passwd]', 'SavNap1999!')
  //     .setValue('input[name=conferma-passwd]', 'SavNap1999!')

  //     .click('button[id=paziente-button]')
  //     .assert.textContains(
  //       'div[id=cg-fam-title]',
  //       'Inserisci i dati del tuo paziente!'
  //     )

  //     .setValue('input[name=codice_fiscale]', 'FLJFPS78B56G151X')
  //     .setValue('input[name=nome_paziente]', 'Pablo')
  //     .setValue(
  //       'input[name=cognome_paziente]',
  //       'Giacomo José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Martyr Patricio Clito Ruíz y Picasso'
  //     )
  //     .setValue('input[name=data_di_nascita_paziente]', '1970-03-30')
  //     .setValue('input[name=autocomplete]', 'Alessandra Parziale')
  //     .pause(500)
  //     .click('li[data-option-index="0"]')
  //     .pause(500)

  //     .assert.textContains(
  //       'div[id=cognome-paziente]',
  //       'Inserisci un cognome valido.'
  //     )

  //     .end();
  // },
  'Caregiver/Familiare Codice Fiscale Fail Test': function (browser) {
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
      .setValue('input[name=conferma-passwd]', 'SavNap1999!')

      .click('button[id=paziente-button]')
      .assert.textContains(
        'div[id=cg-fam-title]',
        'Inserisci i dati del tuo paziente!'
      )

      .setValue('input[name=codice_fiscale]', 'NCRPHN38R55F735Y24')
      .setValue('input[name=nome_paziente]', 'Cornelio')
      .setValue('input[name=cognome_paziente]', 'Esposito')
      .setValue('input[name=data_di_nascita_paziente]', '1930-06-01')
      .setValue('input[name=autocomplete]', 'Alessandra Parziale')
      .pause(500)
      .click('li[data-option-index="0"]')
      .pause(500)

      .assert.textContains(
        'div[id=codice-fiscale]',
        'Inserisci un codice fiscale valido.'
      )

      .end();
  },
  'Caregiver/Familiare Data di Nascita Fail Test': function (browser) {
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
      .setValue('input[name=conferma-passwd]', 'SavNap1999!')

      .click('button[id=paziente-button]')
      .assert.textContains(
        'div[id=cg-fam-title]',
        'Inserisci i dati del tuo paziente!'
      )

      .setValue('input[name=codice_fiscale]', 'TRWDSM87R44E135R')
      .setValue('input[name=nome_paziente]', 'Caterina')
      .setValue('input[name=cognome_paziente]', 'Spinelli')
      .setValue('input[name=data_di_nascita_paziente]', '3023-11-26')
      .setValue('input[name=autocomplete]', 'Alessandra Parziale')
      .pause(500)
      .click('li[data-option-index="0"]')
      .pause(500)

      .assert.textContains(
        'div[id=data-di-nascita-paziente]',
        'Inserisci una data di nascita valida.'
      )

      .end();
  },
  
};
