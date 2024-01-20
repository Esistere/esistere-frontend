module.exports = {
  'Registrazione medico: test corretto': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-medico]')
      .waitForElementVisible('h1[id=med-title]', 1000)

      .setValue('input[name=nome]', 'Alessandra')
      .setValue('input[name=cognome]', 'Parziale')
      .setValue('input[name=indirizzo_studio]', 'Via del Avenida')
      .setValue('input[name=citta]', 'Vallecanto')
      .setValue('input[name=numero_civico]', '20')
      .setValue('input[name=numero_telefono_studio]', '0987654321')
      .setValue('input[name=email]', 'aleparziale@example.it')
      .setValue('input[name=passwd]', 'AleParz2000?')

      .click('button[type=submit]')
      .assert.textContains(
        'div[id=test]',
        'Registrazione effettuata con successo!'
      )

      .end();
  },

  'Registrazione medico: numero di telefono troppo lungo': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-medico]')
      .waitForElementVisible('h1[id=med-title]', 1000)

      .setValue('input[name=nome]', 'Virginia')
      .setValue('input[name=cognome]', 'Woolf')
      .setValue('input[name=indirizzo_studio]', 'Piazza Crystallis')
      .setValue('input[name=citta]', 'Astralburg')
      .setValue('input[name=numero_civico]', '123')
      .setValue('input[name=numero_telefono_studio]', '1264872627291468')
      .setValue('input[name=email]', 'virginia@example.com')
      .setValue('input[name=passwd]', 'Virginia1882?')

      .click('button[type=submit]')
      .assert.textContains(
        'div[id=test]',
        'Registrazione effettuata con successo!'
      )

      .end();
  },

  'Registrazione medico: numero civico non inserito': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-medico]')
      .waitForElementVisible('h1[id=med-title]', 1000)

      .setValue('input[name=nome]', 'Grace Murray')
      .setValue('input[name=cognome]', 'Hopper')
      .setValue('input[name=indirizzo_studio]', 'Piazza degli Sussurri Arcani')
      .setValue('input[name=citta]', 'Rivendellia')
      .setValue('input[name=numero_telefono_studio]', '2618946372')
      .setValue('input[name=email]', 'gracehopper@example.it')
      .setValue('input[name=passwd]', 'GraceHopper1906#')

      .click('button[type=submit]')
      .assert.textContains(
        'div[id=test]',
        'Registrazione effettuata con successo!'
      )

      .end();
  },

  'Registrazione medico: indirizzo troppo corto': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-medico]')
      .waitForElementVisible('h1[id=med-title]', 1000)

      .setValue('input[name=nome]', 'Margherita')
      .setValue('input[name=cognome]', 'Hack')
      .setValue('input[name=indirizzo_studio]', 'V')
      .setValue('input[name=citta]', 'Spirandia')
      .setValue('input[name=numero_civico]', '23')
      .setValue('input[name=numero_telefono_studio]', '1237854312')
      .setValue('input[name=email]', 'marghe@example.it')
      .setValue('input[name=passwd]', 'MargheHack14@')

      .click('button[type=submit]')
      .assert.textContains(
        'div[id=test]',
        'Registrazione effettuata con successo!'
      )

      .end();
  },

  'Registrazione medico: cognome troppo lungo': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-medico]')
      .waitForElementVisible('h1[id=med-title]', 1000)

      .setValue('input[name=nome]', 'Archibald')
      .setValue('input[name=cognome]', 'Fitzherbert-McAllistersteinbergerson')
      .setValue('input[name=indirizzo_studio]', 'Via Celestiale')
      .setValue('input[name=citta]', 'Spirandia')
      .setValue('input[name=numero_civico]', '23')
      .setValue('input[name=numero_telefono_studio]', '1237854312')
      .setValue('input[name=email]', 'archie@example.it')
      .setValue('input[name=passwd]', 'Archibald4@')

      .click('button[type=submit]')
      .assert.textContains(
        'div[id=test]',
        'Registrazione effettuata con successo!'
      )

      .end();
  },

  'Registrazione medico: nome troppo lungo': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-medico]')
      .waitForElementVisible('h1[id=med-title]', 1000)

      .setValue(
        'input[name=nome]',
        'Eleonora Beatrice Isabella Margherita Seraphina'
      )
      .setValue('input[name=cognome]', 'Di Valois e Bourbon')
      .setValue('input[name=indirizzo_studio]', 'Corso delle Visioni Astrali')
      .setValue('input[name=citta]', 'Seraphilico')
      .setValue('input[name=numero_civico]', '432')
      .setValue('input[name=numero_telefono_studio]', '4562810987')
      .setValue('input[name=email]', 'elebea@exampleit')
      .setValue('input[name=passwd]', 'EleBea45?')

      .click('button[type=submit]')
      .assert.textContains(
        'div[id=test]',
        'Registrazione effettuata con successo!'
      )

      .end();
  },

  'Registrazione medico: password non valida': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-medico]')
      .waitForElementVisible('h1[id=med-title]', 1000)

      .setValue('input[name=nome]', 'Oscar')
      .setValue('input[name=cognome]', 'Schindler')
      .setValue(
        'input[name=indirizzo_studio]',
        'Via dell\u001BAlchimia Luminosa'
      )
      .setValue('input[name=citta]', 'Oz')
      .setValue('input[name=numero_civico]', '4567')
      .setValue('input[name=numero_telefono_studio]', '3333333333')
      .setValue('input[name=email]', 'oscar@example.com')
      .setValue('input[name=passwd]', 'Oscar!')

      .click('button[type=submit]')
      .assert.textContains(
        'div[id=test]',
        'Registrazione effettuata con successo!'
      )

      .end();
  },

  'Registrazione medico: email non valida': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-medico]')
      .waitForElementVisible('h1[id=med-title]', 1000)

      .setValue('input[name=nome]', 'Leonardo')
      .setValue('input[name=cognome]', 'Da Vinci')
      .setValue('input[name=indirizzo_studio]', 'Via dell\u001BIncanto Dorato')
      .setValue('input[name=citta]', 'Luminara')
      .setValue('input[name=numero_civico]', '1234')
      .setValue('input[name=numero_telefono_studio]', '1234567891')
      .setValue('input[name=email]', 'leodavinci')
      .setValue('input[name=passwd]', 'LeoDavinci45!!')

      .click('button[type=submit]')
      .assert.textContains(
        'div[id=test]',
        'Registrazione effettuata con successo!'
      )

      .end();
  },
};
