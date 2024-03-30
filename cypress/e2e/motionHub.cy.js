import { faker } from '@faker-js/faker'

describe('CRUD of a movie', () => {
  // let movie
  it('Successfully', () => {
    cy.createMovie()
      .then(response => {
        expect(response.status).to.equal(201)
        let movie = response.body[0]
        cy.wrap(movie).as('createdMovie')
      })

    cy.get('@createdMovie').then(movie => {
      cy.request({
        method: 'GET',
        url: `/videos/${movie.id}`,
      }).then(response => {
        expect(response.status).to.equal(200)
        expect(response.body[0]).to.deep.equal(movie)
      })

      const newMovie = {
        id: movie.id,
        title: faker.hacker.phrase(),
        description: faker.hacker.phrase(),
        duration: faker.number.int({ min: 1, max: 1200 })
      }

      cy.updateMovie(newMovie)
        .then(response => {
          expect(response.status).to.equal(200)
          expect(response.body[0]).to.deep.equal(newMovie)
        })

      cy.deleteMovie(movie.id)
        .then(response => {
          expect(response.status).to.equal(204)
        })

      cy.request({
        method: 'GET',
        url: `/videos/${movie.id}`,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.equal(404)
      })
    })
  })
})