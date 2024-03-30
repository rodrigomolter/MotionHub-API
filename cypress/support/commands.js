/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

Cypress.Commands.add('createMovie', (movie = {}) => {
  const {title, description, duration} = movie

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

Cypress.Commands.add('updateMovie', (movie = {}) => {
  const {id, title, description, duration} = movie

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


Cypress.Commands.add('deleteMovie', movieId => {
  cy.request({
    method: 'DELETE',
    url: `/videos/${movieId}`
  })
})