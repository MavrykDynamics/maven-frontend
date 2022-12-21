// styles
import { FrequentlyAskedQuestionsStyled, FrequentlyAskedQuestionsCard } from "./FrequentlyAskedQuestions.style"

// helpers
import frequentlyAskedQuestionsData from './FrequentlyAskedQuestions.json'

export function FrequentlyAskedQuestions () {
  return (
    <FrequentlyAskedQuestionsStyled>
      <div className='centring-wrapper'>
        <h1>Frequently Asked Questions</h1>
      </div>

      {frequentlyAskedQuestionsData.map((item) => (
        <FrequentlyAskedQuestionsCard>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </FrequentlyAskedQuestionsCard>
      ))}
    </FrequentlyAskedQuestionsStyled>
  )
}