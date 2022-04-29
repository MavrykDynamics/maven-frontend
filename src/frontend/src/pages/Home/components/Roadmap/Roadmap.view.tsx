import * as React from 'react'

import data from './Roadmap.data.json'
import { RoadmapArticle, RoadmapArticles, RoadmapStyled } from './Roadmap.style'

export const RoadmapView = () => {
  if (!data.length) return null

  return (
    <RoadmapStyled>
      <h2>Roadmap</h2>
      <RoadmapArticles>
        {data.map((item) => (
          <RoadmapArticle key={item.value}>
            <div />
            <figure>
              <img src="/images/flag.svg" alt={item.header} />
              <figcaption>{item.value}</figcaption>
            </figure>
            <blockquote>
              <div>
                <h3>{item.header}</h3>
                <ul>
                  {item.list.map((li) => (
                    <li key={`${item.value}-${li}`}>{li}</li>
                  ))}
                </ul>
              </div>
            </blockquote>
          </RoadmapArticle>
        ))}
      </RoadmapArticles>
    </RoadmapStyled>
  )
}
