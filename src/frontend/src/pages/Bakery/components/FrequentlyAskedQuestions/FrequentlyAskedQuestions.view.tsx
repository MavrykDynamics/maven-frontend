import React, { useState } from "react"

// styles
import { FrequentlyAskedQuestionsStyled, FrequentlyAskedQuestionsCard } from "./FrequentlyAskedQuestions.style"

// helpers
import frequentlyAskedQuestionsData from './FrequentlyAskedQuestions.json'

export function FrequentlyAskedQuestions () {
  const [activeCard, setActiveCard] = useState('')

  const handleClickCard = (title: string) => {
    setActiveCard(activeCard !== title ? title : '')
  }

  return (
    <FrequentlyAskedQuestionsStyled>
      <div className='centring-wrapper'>
        <h1>Frequently Asked Questions</h1>
      </div>

      {frequentlyAskedQuestionsData.map((item) => {
        const isActive = activeCard === item.title

        return (
          <FrequentlyAskedQuestionsCard
            key={item.title}
            className={isActive ? 'active' : ''}
            onClick={() => handleClickCard(item.title)}
          >
            <h2>{item.title}</h2>
            {isActive && <p>{item.description}</p>}
          </FrequentlyAskedQuestionsCard>
        )}
      )}
    </FrequentlyAskedQuestionsStyled>
  )
}