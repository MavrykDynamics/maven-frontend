import React, { useState } from "react"

// components
import { Description } from "../Description.view"

// styles
import { FrequentlyAskedQuestionsStyled, FrequentlyAskedQuestionsCard } from "./FrequentlyAskedQuestions.style"

// helpers
import frequentlyAskedQuestionsData from './FrequentlyAskedQuestions.json'

export function FrequentlyAskedQuestions () {
  const [activeCard, setActiveCard] = useState(0)

  const handleClickCard = (id: number) => {
    setActiveCard(activeCard !== id ? id : 0)
  }

  return (
    <FrequentlyAskedQuestionsStyled>
      <div className='centring-wrapper'>
        <h1>Frequently Asked Questions</h1>
      </div>

      {frequentlyAskedQuestionsData.map((item) => {
        const isActive = activeCard === item.id

        return (
          <FrequentlyAskedQuestionsCard
            key={item.id}
            className={isActive ? 'active' : ''}
            onClick={() => handleClickCard(item.id)}
          >
            <h2>{item.title}</h2>
            {isActive && <Description list={item.description} />}
          </FrequentlyAskedQuestionsCard>
        )}
      )}
    </FrequentlyAskedQuestionsStyled>
  )
}