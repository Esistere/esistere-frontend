import QuizAllenamentoControl from 'app/control/gestione_quiz_allenamento/QuizAllenamentoControl';
import { DomandaQuizAllenamento } from 'app/interfaces/gestione_quiz_allenamento/DomandaQuizAllenamento';
import { RispostaQuizAllenamento } from 'app/interfaces/gestione_quiz_allenamento/RispostaQuizAllenamento';
import { QuizAllenamentoGiornaliero } from 'app/interfaces/gestione_quiz_allenamento/QuizAllenamentoGiornaliero';

class SalvaRisposte {
  private risposte: RispostaQuizAllenamento[];
  private domanda: DomandaQuizAllenamento;
  private cont = 0;
  private corrette = 0;
  private lastCorretta = false;
  private quizAllenamentoControl: QuizAllenamentoControl;

  constructor() {
    this.risposte = new Array<RispostaQuizAllenamento>(0);
    this.domanda = {
      id: 0,
      quiz_ag: 0,
      domanda: '',
      corretta: false,
    };
    this.quizAllenamentoControl = new QuizAllenamentoControl();
  }

  getCont(): number {
    return this.cont;
  }

  getLastCorretta(): boolean {
    return this.lastCorretta;
  }

  setLastCorretta(lastCorretta: boolean): void {
    this.lastCorretta = lastCorretta;
  }

  addRisposta(risposta: RispostaQuizAllenamento): void {
    risposta.corretta ? this.corrette++ : null;
    risposta.corretta ? (this.lastCorretta = true) : null;
    console.log(this.risposte, this.cont);
    this.risposte.push(risposta);
  }

  addCont(): void {
    this.cont++;
  }

  addDomanda(domanda: DomandaQuizAllenamento): void {
    this.domanda = domanda;
  }

  salvaRisposte(): void {
    this.quizAllenamentoControl.aggiungiRisposte(this.risposte);
  }

  salvaDomanda(): void {
    this.quizAllenamentoControl.aggiornaDomanda(this.domanda);
  }

  reset(): void {
    this.risposte = new Array<RispostaQuizAllenamento>(0);
    this.domanda = {
      id: 0,
      quiz_ag: 0,
      domanda: '',
      corretta: false,
    };
  }

  async finishQuiz(quiz: QuizAllenamentoGiornaliero): Promise<boolean> {
    const result = await this.quizAllenamentoControl.aggiornaQuizAllenamento(
      quiz
    );
    return result ? true : false;
  }
}

export default SalvaRisposte;
