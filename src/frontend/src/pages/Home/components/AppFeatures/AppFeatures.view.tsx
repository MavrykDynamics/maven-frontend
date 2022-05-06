import * as React from 'react'
import { AppFeaturesSection, AppFeaturesList, AppFeaturesFigure } from './AppFeatures.style'
import data from './AppFeatures.data.json'

export const AppFeaturesView = () => {
  if (!data.length) return null

  return (
    <AppFeaturesSection id="features">
      <h2>App Features</h2>
      <AppFeaturesList>
        {data.map((item) => (
          <AppFeaturesFigure key={item.id}>
            <img src={item.img} alt={item.header} />
            <h3>{item.header}</h3>
            <figcaption>{item.text}</figcaption>
          </AppFeaturesFigure>
        ))}
      </AppFeaturesList>
    </AppFeaturesSection>
  )
}
