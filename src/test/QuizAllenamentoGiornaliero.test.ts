module.exports = {
  'Quiz Allenamento: Success Test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id=div-caregiver]', 40000)

      .assert.textContains(
        'div[id=div-caregiver]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      .click('button[id=button-quiz-allenamento]')
      .assert.visible('div[id=home-quiz]')
      .click('button[id=crea-quiz]')
      .setValue('input[type=number]', 2)
  
      .assert.visible('div[id=Domanda-1]')
      .setValue('input[id="Domanda-1"]', 'Qual è la tua data di nascita?')
      .setValue('input[id="Risposta-1.1"]', '15 maggio 1950')
      .setValue('input[id="Risposta-1.2"]', '2 settembre 1985')
      .setValue('input[id="Risposta-1.3"]', '10 dicembre 1972')
      .setValue('input[id="Risposta-1.4"]', '10 settembre 1976')

      .click('input[type="radio"][value="15 maggio 1950"]')

      .setValue('input[id="Domanda-2"]', 'Puoi dirmi il nome di tre membri della tua famiglia?')
      .setValue('input[id="Risposta-2.1"]', 'Marco, Maria, Luigi')
      .setValue('input[id="Risposta-2.2"]', 'Paolo, Saverio, Alessandra')
      .setValue('input[id="Risposta-2.3"]', 'Luca, Sofia, Antonio')
      .setValue('input[id="Risposta-2.4"]', 'Luca, Saverio, Alessandra')
      
      .click('input[type="radio"][value="Paolo, Saverio, Alessandra"]')

      .click('button[id="crea-quiz-button"]')
      .assert.textContains(
        'div[id=test]',
        'Caricamento quiz effettuato con successo!'
      )
      .end();
  },
  'Quiz Allenamento: Input Fail Test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id=div-caregiver]', 40000)

      .assert.textContains(
        'div[id=div-caregiver]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      .click('button[id=button-quiz-allenamento]')
      .assert.visible('div[id=home-quiz]')
      .click('button[id=crea-quiz]')
      .setValue('input[type=number]', 0)
      


      .click('button[id="crea-quiz-button"]')
      .assert.visible('body')

      .assert.textContains(
        'body',
        'Riempi prima tutti i tuoi dati'
      )

      .end();
  },
 
  'Quiz Allenamento: Domanda Fail Test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id=div-caregiver]', 40000)

      .assert.textContains(
        'div[id=div-caregiver]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      .click('button[id=button-quiz-allenamento]')
      .assert.visible('div[id=home-quiz]')
      .click('button[id=crea-quiz]')
      .setValue('input[type=number]', 2)
  
      .assert.visible('div[id=Domanda-1]')
      .setValue('input[id="Domanda-1"]', 'Racconta con precisione l\'ultima volta che hai partecipato a un evento sociale. Descrivi il luogo, le persone coinvolte e le attività svolte, includendo dettagli come l\'ora dell\'evento e le tue emozioni durante l\'esperienza. Questa domanda mira a valutare la memoria episodica e la capacità del paziente di recuperare e comunicare dettagli specifici su eventi recenti, consentendo al medico di valutare la funzione cognitiva legata alle esperienze personali.')
      .setValue('input[id="Risposta-1.1"]', 'L\'ultima volta che ho partecipato a un evento sociale è stata una cena a casa con amici. Ci siamo riuniti nella mia sala da pranzo, ridendo e scherzando mentre condividevamo deliziosi piatti cucinati insieme. L\'atmosfera era calda e accogliente. Abbiamo condiviso aneddoti divertenti e discusso di vari argomenti. L\'evento si è prolungato fino a tarda serata, lasciandomi una sensazione di gioia e connessione con gli altri.')
      .setValue('input[id="Risposta-1.2"]', 'Recentemente, ho trascorso un pomeriggio al parco da solo. Ho passeggiato tra gli alberi, respirando l\'aria fresca e godendomi la tranquillità del momento. Ho osservato la natura circostante, ascoltato il canto degli uccelli e riflettuto sulla bellezza della vita. Nonostante fossi solo, ho apprezzato la pace e la serenità che il parco mi ha offerto.')
      .setValue('input[id="Risposta-1.3"]', 'Mi dispiace, ma non riesco a ricordare l\'ultimo evento sociale a cui ho partecipato. La mia mente sembra vuota quando cerco di richiamare i dettagli. Sento una certa confusione e frustrazione nel non riuscire a recuperare queste informazioni. Non riesco a fornire alcun dettaglio sull\'evento, creando un senso di smarrimento.')
      .setValue('input[id="Risposta-1.4"]', 'Recentemente, ho partecipato a una festa di compleanno di un amico, tenutasi sabato scorso nel suo giardino. C\'erano circa venti ospiti. Sono arrivato alle 19:00, sentendomi eccitato ma un po\' nervoso. Durante la serata, abbiamo fatto un barbecue e giocato a giochi di gruppo, che mi hanno fatto sentire rilassato e felice. Il momento clou è stato quando il festeggiato ha soffiato sulle candeline della torta.')

      .click('input[type="radio"][value="L\'ultima volta che ho partecipato a un evento sociale è stata una cena a casa con amici. Ci siamo riuniti nella mia sala da pranzo, ridendo e scherzando mentre condividevamo deliziosi piatti cucinati insieme. L\'atmosfera era calda e accogliente. Abbiamo condiviso aneddoti divertenti e discusso di vari argomenti. L\'evento si è prolungato fino a tarda serata, lasciandomi una sensazione di gioia e connessione con gli altri."]')
      
      .setValue('input[id="Domanda-2"]', 'Puoi dirmi il nome di tre membri della tua famiglia?')
      .setValue('input[id="Risposta-2.1"]', 'Marco, Maria, Luigi')
      .setValue('input[id="Risposta-2.2"]', 'Paolo, Saverio, Alessandra')
      .setValue('input[id="Risposta-2.3"]', 'Luca, Sofia, Antonio')
      .setValue('input[id="Risposta-2.4"]', 'Maria, Saverio, Alessandra')
      
      .click('input[type="radio"][value="Paolo, Saverio, Alessandra"]')
      
      .assert.textContains(
        'body',
        'Inserisci un argomento di al più 300 caratteri.'
      )

      .end();
  },

  'Quiz Allenamento: Risposta Fail Test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id=div-caregiver]', 40000)

      .assert.textContains(
        'div[id=div-caregiver]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      .click('button[id=button-quiz-allenamento]')
      .assert.visible('div[id=home-quiz]')
      .click('button[id=crea-quiz]')
      .setValue('input[type=number]', 2)
  
      .assert.visible('div[id=Domanda-1]')
      .setValue('input[id="Domanda-1"]', 'Racconta con precisione l\'ultima volta che hai partecipato a un evento sociale. Descrivi il luogo, le persone coinvolte e le attività svolte, includendo dettagli come l\'ora dell\'evento e le tue emozioni durante l\'esperienza. Questa domanda mira a valutare la memoria episodica.')
      .setValue('input[id="Risposta-1.1"]', 'L\'ultima volta che ho partecipato a un evento sociale è stata una cena a casa con amici. Ci siamo riuniti nella mia sala da pranzo, ridendo e scherzando mentre condividevamo deliziosi piatti cucinati insieme. L\'atmosfera era calda e accogliente. Abbiamo condiviso aneddoti divertenti e discusso di vari argomenti. L\'evento si è prolungato fino a tarda serata, lasciandomi una sensazione di gioia e connessione con gli altri. Questi momenti sono preziosi per me, poiché alimentano il mio spirito e creano legami significativi. Essi aggiungono colore alla mia vita e contribuiscono alla costruzione di ricordi che porterò con me. La bellezza di condividere esperienze con gli amici è insostituibile, e sono grato di poter vivere tali momenti speciali che arricchiscono il tessuto della mia esistenza.')
      .setValue('input[id="Risposta-1.2"]', 'Recentemente, ho trascorso un pomeriggio al parco da solo. Ho passeggiato tra gli alberi, respirando l\'aria fresca e godendomi la tranquillità del momento. Ho osservato la natura circostante, ascoltato il canto degli uccelli e riflettuto sulla bellezza della vita. Nonostante fossi solo, ho apprezzato la pace e la serenità che il parco mi ha offerto.')
      .setValue('input[id="Risposta-1.3"]', 'Mi dispiace, ma non riesco a ricordare l\'ultimo evento sociale a cui ho partecipato. La mia mente sembra vuota quando cerco di richiamare i dettagli. Sento una certa confusione e frustrazione nel non riuscire a recuperare queste informazioni. Non riesco a fornire alcun dettaglio sull\'evento, creando un senso di smarrimento.')
      .setValue('input[id="Risposta-1.4"]', 'L\'ultima volta che ho partecipato a un evento sociale è stato un sabato sera di gennaio 2023. L\'evento si è svolto in un ristorante elegante chiamato "La Luna Brillante". L\'atmosfera era incantevole, con luci soffuse, tavoli ben apparecchiati e una musica di sottofondo piacevole.')

      .click('input[type="radio"][value="L\'ultima volta che ho partecipato a un evento sociale è stata una cena a casa con amici. Ci siamo riuniti nella mia sala da pranzo, ridendo e scherzando mentre condividevamo deliziosi piatti cucinati insieme. L\'atmosfera era calda e accogliente. Abbiamo condiviso aneddoti divertenti e discusso di vari argomenti. L\'evento si è prolungato fino a tarda serata, lasciandomi una sensazione di gioia e connessione con gli altri. Questi momenti sono preziosi per me, poiché alimentano il mio spirito e creano legami significativi. Essi aggiungono colore alla mia vita e contribuiscono alla costruzione di ricordi che porterò con me. La bellezza di condividere esperienze con gli amici è insostituibile, e sono grato di poter vivere tali momenti speciali che arricchiscono il tessuto della mia esistenza.')

      .setValue('input[id="Domanda-2"]', 'Puoi dirmi il nome di tre membri della tua famiglia?')
      .setValue('input[id="Risposta-2.1"]', 'Marco, Maria, Luigi')
      .setValue('input[id="Risposta-2.2"]', 'Paolo, Saverio, Alessandra')
      .setValue('input[id="Risposta-2.3"]', 'Luca, Sofia, Antonio')
      .setValue('input[id="Risposta-2.4"]', 'Giovanni, Nicola, Gemma')
      
      .click('input[type="radio"][value="Paolo, Saverio, Alessandra"]')
      
      .assert.textContains(
        'body',
        'Inserisci un argomento di al più 300 caratteri.'
      )

      .end();
  },

  'Quiz Allenamento: Risposta Non Selezionata Fail Test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id=div-caregiver]', 40000)

      .assert.textContains(
        'div[id=div-caregiver]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      .click('button[id=button-quiz-allenamento]')
      .assert.visible('div[id=home-quiz]')
      .click('button[id=crea-quiz]')
      .setValue('input[type=number]', 2)
  
      .assert.visible('div[id=Domanda-1]')
      .setValue('input[id="Domanda-1"]', 'Qual è la tua data di nascita?')
      .setValue('input[id="Risposta-1.1"]', '15 maggio 1950')
      .setValue('input[id="Risposta-1.2"]', '2 settembre 1985')
      .setValue('input[id="Risposta-1.3"]', '10 dicembre 1972')
      .setValue('input[id="Risposta-1.4"]', '10 aprile 1954')

      .click('input[type="radio"][value="10 aprile 1954"]')

      .setValue('input[id="Domanda-2"]', 'Puoi dirmi il nome di tre membri della tua famiglia?')
      .setValue('input[id="Risposta-2.1"]', 'Marco, Maria, Luigi')
      .setValue('input[id="Risposta-2.2"]', 'Paolo, Saverio, Alessandra')
      .setValue('input[id="Risposta-2.3"]', 'Luca, Sofia, Antonio')
      .setValue('input[id="Risposta-2.4"]', 'Saverio. Alessandra, Sara')
      
      .click('button[id="crea-quiz-button"]')
      .assert.textContains(
        'body',
        'Riempi prima tutti i tuoi dati'
      )
      .end();
  },
};
