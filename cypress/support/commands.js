/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

Cypress.Commands.add('createVideo', (video = {}) => {
  const {title, description, duration} = video

  cy.request({
    method: 'POST',
    url: '/videos',
    body: {
      title: title || faker.hacker.phrase(),
      description: description || faker.hacker.phrase(),
      duration: duration || faker.number.int(1200)
    }
  })
})

Cypress.Commands.add('updateVideo', (video = {}) => {
  const {id, title, description, duration} = video

  cy.request({
    method: 'PUT',
    url: `/videos/${id}`,
    body: {
      title: title || faker.hacker.phrase(),
      description: description || faker.hacker.phrase(),
      duration: duration || faker.number.int(1200)
    }
  })
})


Cypress.Commands.add('deleteVideo', videoId => {
  cy.request({
    method: 'DELETE',
    url: `/videos/${videoId}`
  })
})

Cypress.Commands.add('cleanDatabase', () => {
  cy.request({
    method: 'GET',
    url: '/videos'
  }).then( response => {
    cy.wrap(response.body).each(video => {
      cy.request({
        method: 'DELETE',
        url: `videos/${video.id}`
      })
    })
  })
})