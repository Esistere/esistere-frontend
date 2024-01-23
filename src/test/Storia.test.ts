module.exports = {
  'Creazione storia corretta': (browser) => {
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

      .waitForElementVisible('button[id=creaStoria]', 40000)
      .click('button[id=creaStoria]')

      .waitForElementVisible('body')
      .assert.visible('div[id=text-area]')
      .assert.visible('div[id=descrizione-file]')
      .setValue(
        'textarea[id=testo]',
        'Quella foto rappresenta un attimo speciale '+
        'della nostra vita, mamma. Ricordo il giorno' +
          'in cui abbiamo portato a casa Patato, il '+ 
          'nostro primo cane. Avevo solo qualche anno e' +
          'lo stringevo forte tra le braccia, emozionato.'+
          ' La tua presenza accanto a me rende questo' +
          'ricordo ancora più prezioso.' 
      )

      .execute(function () {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput instanceof HTMLInputElement) {
          const fileType = 'image/png';
          const file = new File([''], 'story.png', { type: fileType });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;
          fileInput.dispatchEvent(new Event('change', { bubbles: true }));

          console.log(fileInput.files?.length);
          console.log(fileInput.files[0].type);
        }
      })

      .setValue(
        'textarea[id=descrizione]',
        'Riccardo da piccolo stringe tra le braccia il '+ 
        'cucciolo appena arrivato. La tua figura' +
        'amorevole accanto a lui cattura la dolcezza di quei momenti. '        
      )

      .click('button[id=salvaStoria]')
      .waitForElementVisible('div[id=test]', 40000)

      .assert.containsText(
        'div[id=test]',
        'Caricamento storia effettuato con successo!'
      )
      .end();
  },

  'Storia: Testo Fail test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id="div-caregiver"]', 4000)
      .assert.textContains(
        'div[id="div-caregiver"]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      .waitForElementVisible('button[id=creaStoria]', 4000)
      .click('button[id=creaStoria]')

      .waitForElementVisible('body')
      .assert.visible('div[id=text-area]')
      .assert.visible('div[id=descrizione-file]')
      .setValue(
        'textarea[id=testo]',
        'Era una giornata magica al parco ' +
          'insieme al mio amato nonno. Il ' +
          'sole splendeva alto nel cielo e gli alberi ondeggiavano' +
          ' leggermente con la brezza estiva. Ricordo il profumo dolce' +
          ' dei fiori e il suono allegro dei bambini che ridevano e' +
          ' giocavano intorno a noi. Nonno, con il suo sorriso gentile ' +
          'e gli occhi rugosi pieni di saggezza, mi teneva la mano mentre ' +
          'esploravamo il mondo insieme. Ci siamo avventurati attraverso' +
          ' prati verdi e sentieri tortuosi, godendo della natura e della ' +
          'compagnia l\'uno dell\'altro.' +
          ' Ogni passo era un piccolo viaggio, e ' +
          ' ogni sorriso condiviso rendeva quel momento ' +
          'un ricordo indelebile nella trama della mia ' +
          ' infanzia. Quella foto cattura un attimo di tale ' +
          'felicità. Il calore del sole sul nostro viso, le ' +
          'risate condivise, e la sensazione di sicurezza' +
          ' accanto al nonno sono stati immortalati in quell\'istantanea.' +
          ' È un ricordo che mi accompagna attraverso gli anni,' +
          ' un frammento di gioia che tengo nel mio cuore.'
      )

      .execute(function () {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput instanceof HTMLInputElement) {
          const fileType = 'image/jpg';
          const file = new File([''], 'giornata_al_parco', { type: fileType });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;
          fileInput.dispatchEvent(new Event('change', { bubbles: true }));

          console.log(fileInput.files?.length);
          console.log(fileInput.files[0].type);
        }
      })

      .setValue(
        'textarea[id=descrizione]',
        'Una bambina radiante tiene la mano del nonno in un' +
          'parco colorato. Il sole crea giochi di luce su prati' +
          ' verdi e fiori. I loro sguardi si incontrano, esprimendo' +
          ' amore e connessione. Un istante di felicità immortalato,' +
          ' un ricordo eterno.'
      )

      .assert.containsText(
        'body',
        'Il campo testo deve essere lungo al più 30 caratteri.'
      )
      .end();
  },

  'Storia: Foto/Audio Fail test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id="div-caregiver"]', 4000)
      .assert.textContains(
        'div[id="div-caregiver"]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      .waitForElementVisible('button[id=creaStoria]', 4000)
      .click('button[id=creaStoria]')

      .waitForElementVisible('body')
      .assert.visible('div[id=text-area]')
      .assert.visible('div[id=descrizione-file]')
      .setValue(
        'textarea[id=testo]',
        'Il mio 60° Compleanno è uno dei ricordi ' +
          'più belli che ho della nostra storia ' +
          'd’amore. Mi organizzasti una festa a sorpresa ' +
          ' e mi regalasti la riproduzione di un anello di' +
          ' quando ero bambina. Piansi così tanto di gioia ' +
          'quel giorno. Ogni volta che lo vedo mi ricorda ' +
          'perché il nostro amore è così profondo.'
      )

      .execute(function () {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput instanceof HTMLInputElement) {
          const fileType = 'video/mp4';
          const file = new File([''], 'festa_di_compleanno', {
            type: fileType,
          });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;
          fileInput.dispatchEvent(new Event('change', { bubbles: true }));

          console.log(fileInput.files?.length);
          console.log(fileInput.files[0].type);
        }
      })

      .setValue(
        'textarea[id=descrizione]',
        'La foto cattura l\'istante ' +
          'felice del mio compleanno. ' +
          'Siamo al centro, sorrisi radianti, ' +
          'illuminati dal sole. Vestito leggero,' +
          ' atmosfera estiva. Candeline e risate ' +
          'congelate nell\'immagine raccontano storie ' +
          'di gioia e amore. Il nostro mondo, ' +
          'sfocati gli amici, testimonia la magia' +
          ' di quel momento. Un ricordo tangibile ' +
          'del nostro amore eterno'
      )

      .assert.containsText(
        'body',
        'Il file selezionato non è un file immagine o audio.'
      )
      .end();
  },

  'Storia: Descrizione Fail test': (browser) => {
    browser
      .url('http://localhost:3000/esistere-frontend#/login')
      .waitForElementVisible('body')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=passwd]')
      .setValue('input[name=email]', 'emailsaverio@example.com')
      .setValue('input[name=passwd]', 'passwordSaverio24!')
      .click('button[id=login]')
      .waitForElementVisible('div[id="div-caregiver"]', 4000)
      .assert.textContains(
        'div[id="div-caregiver"]',
        'Supporta il tuo paziente entrando nel suo mondo tramite il Sage Test'
      )

      .waitForElementVisible('button[id=creaStoria]', 4000)
      .click('button[id=creaStoria]')

      .waitForElementVisible('body')
      .assert.visible('div[id=text-area]')
      .assert.visible('div[id=descrizione-file]')
      .setValue(
        'textarea[id=testo]',
        'Diciassette anni fa giurai di amarti ' +
          'per sempre. Ricordo ancora il tuo sguardo,' +
          ' il nostro primo ballo. Il tempo può cambiare ' +
          'molte cose, ma non il nostro amore. Questa foto' +
          ' cattura l\'inizio di una storia che ' +
          'continua a crescere ogni giorno. ' +
          'Ti amo più di ieri, meno di domani.'
      )

      .execute(function () {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput instanceof HTMLInputElement) {
          const fileType = 'image/jpg';
          const file = new File([''], 'matrimonio.jpg', { type: fileType });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;
          fileInput.dispatchEvent(new Event('change', { bubbles: true }));

          console.log(fileInput.files?.length);
          console.log(fileInput.files[0].type);
        }
      })

      .setValue(
        'textarea[id=descrizione]',
        'Nella foto che ho appena condiviso,' +
          ' ritrae un momento indimenticabile ' +
          'del nostro giorno delle nozze, avvenuto' +
          ' ormai 17 anni fa. Siamo avvolti dalla ' +
          'luce dorata del sole, i nostri volti ' +
          'risplendono di felicità e promesse. ' +
          'Indosso un vestito bianco, il tuo sguardo' +
          ' è rivolto a me con amore e ammirazione. I' +
          ' fiori nel mio bouquet emanano un profumo delicato' +
          ', simbolo della freschezza e della bellezza di quel' +
          ' giorno. Ricordo il tepore del sole sulla nostra pelle' +
          ' mentre ci scambiammo le promesse sotto un cielo' +
          ' azzurro. La gioia si riflette nei nostri occhi, ' +
          'testimoniando il nostro impegno reciproco. Le risate' +
          ' degli amici e familiari risuonano nell\'aria, creando' +
          ' un\'atmosfera di calore e affetto. Il nostro' +
          ' primo bacio da marito e moglie è immortalato in ' +
          'questa foto, un momento carico di emozioni ' +
          'e significato. Posso ancora percepire la' +
          ' dolcezza di quel momento, il gusto salato ' +
          'delle lacrime di gioia. La nostra storia ' +
          'd\'amore è incisa in ogni sorriso, in ogni ' +
          'sguardo tenero che scambiamo. Il vestito' +
          ' da sposa è un simbolo di purezza e speranza, ' +
          'mentre il tuo abito scuro incarna la forza e la' +
          ' protezione che hai portato nella mia vita.' +
          ' I nostri abbracci sono un rifugio sicuro, e la ' +
          'promessa di affrontare insieme le sfide che ' +
          'la vita ci riserverà. Guardando questa foto,' +
          ' rifletto sul viaggio che abbiamo percorso insieme.' +
          ' Le rughe che ora solcano il nostro volto sono ' +
          'testimonianza delle esperienze condivise, dei' +
          ' momenti di gioia e delle sfide superate insieme. ' +
          'Ma il nostro amore è rimasto saldo, resistendo alle' +
          ' tempeste del tempo. In questa foto, vedo non solo il ' +
          'giorno delle nozze, ma anche tutti i giorni che sono' +
          ' seguiti. È un ritratto della nostra crescita individuale' +
          ' e come coppia. Attraverso ogni risata e ogni lacrima,' +
          ' il nostro amore è cresciuto, diventando più profondo' +
          ' e maturo. Siamo ancora quelli giovani innamorati, solo ' +
          'che ora abbiamo una storia più ricca da raccontare.' +
          ' E in questa foto, c\'è la promessa di continuare a ' +
          'scrivere il nostro racconto insieme, di invecchiare ' +
          'con grazia e di amarci sempre di più, giorno dopo giorno.'
      )

      .assert.containsText(
        'body',
        'Il campo descrizione deve essere lungo al più 30 caratteri.'
      )
      .end();
  },
};
