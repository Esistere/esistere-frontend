module.exports = {
  'Medico Registration Test': function (browser) {
    browser
      .url('http://localhost:3000/esistere-frontend#/registrazione')
      .waitForElementVisible('body', 1000)

      .click('button[id=registrazione-medico]')
      .waitForElementVisible('h1[id=med-title]', 1000)

      .setValue('input[name=nome]', 'Alessandra')
      .setValue('input[name=cognome]', 'Parziale')
      .setValue(
        'input[name=indirizzo_studio]',
        'Via del Avenida de la Nina Brillante'
      )
      .setValue('input[name=citta]', 'Vallecanto')
      .setValue('input[name=numero_civico]', '20')
      .setValue('input[name=numero_telefono_studio]', '0987654321')
      .setValue('input[name=email]', 'aleparziale@example.it')
      .setValue('input[name=passwd]', 'AleParz2000?')

      .click('button[type=submit]')
      .assert.textContains(
        '[div=test]',
        'Registrazione effettuata con successo!'
      )

      .end();
  },
};
