module.exports = {
  'Login: successo login medico': (browser) => {
    browser
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
      .end();
  },

  'Login: email non corrispondente': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'alessandra@gmail.com')
      .setValue('input[name=passwd]', 'Medico01!')
      .click('button[id=login]')
      .waitForElementVisible('div[id=test]', 3000)
      .assert.textContains('div[id=test]', 'Login Fallito!')
      .end();
  },

  'Login: password non corrispondente': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'alessandramed@gmail.com')
      .setValue('input[name=passwd]', 'Medic01!')
      .click('button[id=login]')
      .waitForElementVisible('div[id=test]', 3000)
      .assert.textContains('div[id=test]', 'Login Fallito!')
      .end();
  },
};
