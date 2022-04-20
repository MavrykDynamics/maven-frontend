import * as React from 'react'
import { useSelector } from 'react-redux'

import data from './Team.data.json'
import { TeamCityDecor, TeamFigure, TeamsGrid, TeamStyled } from './Team.style'

type Props = {
  name: string
  avatar: string
  job: string
  link: string
}

const TeamFigureView = (props: Props) => {
  const { name, avatar, job, link } = props
  return (
    <TeamFigure>
      <a href={link} target="_blank" rel="noreferrer">
        <img src={avatar} alt={name} />
        <h3>{name}</h3>
        <figcaption>{job}</figcaption>
        <svg>
          <use xlinkHref="/icons/sprites.svg#linkedin-round" />
        </svg>
      </a>
      <TeamCityDecor />
    </TeamFigure>
  )
}

export const TeamView = () => {
  if (!data.length) return null
  return (
    <TeamStyled>
      {data.map((item) => (
        <article key={item.id}>
          <h2>{item.header}</h2>
          <TeamsGrid>
            {item.profiles.map((profile) => (
              <TeamFigureView
                key={`${item.id}-${profile.id}`}
                name={profile.name}
                avatar={profile.avatar}
                job={profile.job}
                link={profile.link}
              />
            ))}
          </TeamsGrid>
        </article>
      ))}
    </TeamStyled>
  )
}
