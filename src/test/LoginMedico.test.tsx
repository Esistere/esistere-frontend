module.exports = {
  'Login Test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'aleparziale@example.it')
      .setValue('input[name=passwd]', 'AleParz2000?')
      .click('button[id=login]')
      .waitForElementVisible('div[id=div-medico]', 40000)
      .assert.containsText('div[id=div-medico]', 'Visualizza la lista dei tuoi pazienti')
      .end();
  },
};
