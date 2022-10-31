import * as React from 'react'

// hooks
import useMediaQuery from '../../../../hooks/useMediaQuery'

import Carousel from '../../../../app/App.components/Carousel/Carousel.view'
import data from './Team.data.json'
import { TeamCityDecor, TeamFigure, TeamsGrid, TeamStyled, TeamCarouselWrap } from './Team.style'

type Props = {
  name: string
  avatar: string
  job: string
  link: string
  title: string | undefined
}

const TeamFigureView = (props: Props) => {
  const { name, avatar, job, link, title } = props
  return (
    <TeamFigure>
      <a href={link} target="_blank" rel="noreferrer">
        <img src={avatar} alt={name} />
        <h3>{name}</h3>
        {title !== undefined && <figcaption>{title}</figcaption>}
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
  const isMobile = useMediaQuery('(max-width: 700px)')

  if (!data.length) return null

  if (isMobile)
    return (
      <TeamStyled>
        {data.map((item) => (
          <article key={item.id}>
            <h2>{item.header}</h2>
            <TeamCarouselWrap>
              <Carousel>
                {item.profiles.map((profile) => (
                  <TeamFigureView
                    key={`${item.id}-${profile.id}`}
                    name={profile.name}
                    avatar={profile.avatar}
                    job={profile.job}
                    link={profile.link}
                    title={profile.title ? profile.title : undefined}
                  />
                ))}
              </Carousel>
            </TeamCarouselWrap>
          </article>
        ))}
      </TeamStyled>
    )

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
                title={profile.title ? profile.title : undefined}
              />
            ))}
          </TeamsGrid>
        </article>
      ))}
    </TeamStyled>
  )
}
