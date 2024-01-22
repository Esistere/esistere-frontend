module.exports = {
  'Login Giusto Test': (browser) => {
    browser
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
      .end();
  },
};
