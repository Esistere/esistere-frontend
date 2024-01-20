module.exports = {
  'Login Test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.it')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('[datatext-id="support-text"]', 40000)
      .assert.textContains('[datatext-id="support-text"]', 'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test')
      .end();
  },
};
