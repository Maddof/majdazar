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
    description: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'From founder-led products to client platforms, these projects show how I design, build, and ship web experiences that solve real business problems.'>
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'My projects'>
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.hero': HomeHero
      'home.my-projects': HomeMyProjects
    }
  }
}
