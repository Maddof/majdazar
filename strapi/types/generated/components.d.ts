import type { Schema, Struct } from '@strapi/strapi'

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes'
  info: {
    description: 'Homepage hero content and assets'
    displayName: 'Hero'
    icon: 'landscape'
  }
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>
    location: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Stockholm, Sweden.'>
    portraitBlinkImage: Schema.Attribute.Media<'images'>
    portraitImage: Schema.Attribute.Media<'images'>
    summary: Schema.Attribute.Text
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Full-stack Dev | Founder @ Smokify'>
    typedName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Majd Azar'>
  }
}

export interface HomeMyProjects extends Struct.ComponentSchema {
  collectionName: 'components_home_my_projects'
  info: {
    displayName: 'My projects'
  }
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'From founder-led products to client platforms, these projects show how I design, build, and ship web experiences that solve real business problems.'>
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'My projects'>
  }
}

export interface HomeToolsOfTheTrade extends Struct.ComponentSchema {
  collectionName: 'components_home_tools_of_the_trades'
  info: {
    displayName: 'Tools of the trade'
  }
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"I\u2019m a firm believer in using the right tool for the job. My stack is built around a modern developer experience and a 'ship fast' mentality. From front-end finesse to back-end stability, I leverage these technologies to build seamless, full-stack experiences without the bloat.">
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Tools of the trade'>
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.hero': HomeHero
      'home.my-projects': HomeMyProjects
      'home.tools-of-the-trade': HomeToolsOfTheTrade
    }
  }
}
