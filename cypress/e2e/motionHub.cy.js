import { faker } from '@faker-js/faker'

describe('CRUD of a movie', () => {

  beforeEach(() => {
    cy.cleanDatabase()
  })
  it('Happy Path', () => {
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

  it('Search Query', () => {
    cy.createMovie({ title: `How to ${faker.word.words(5)}`})
      .then(response => {
        expect(response.status).to.equal(201)
        let movie = response.body[0]
        cy.wrap(movie).as('createdMovie')
      })

    cy.get('@createdMovie').then(movie => {
      cy.request({
        method: 'GET',
        url: '/videos/?search=How to',
      }).then(response => {
        expect(response.status).to.equal(200)
        expect(response.body[0]).to.deep.equal(movie)
      })
    })
  })

  context('Alternatives Paths', () => {
    context('Unexisting Id', () => {
      it('GET a video with invalid id', () => {
        cy.request({
          method: 'GET',
          url: `/videos/${faker.string.uuid()}`,
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.equal(404)
        })
      })

      it('DELETE a video with invalid id', () => {
        cy.request({
          method: 'DELETE',
          url: `/videos/${faker.string.uuid()}`,
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.equal(404)
        })
      })

      it('UPDATE a video with invalid id', () => {
        cy.request({
          method: 'PUT',
          url: `/videos/${faker.string.uuid()}`,
          failOnStatusCode: false,
          body:
          {
            title: faker.hacker.phrase(),
            description: faker.hacker.phrase(),
            duration: faker.number.int({ min: 1, max: 1200 })
          }
        }).then(response => {
          expect(response.status).to.equal(404)
        })
      })
    })

    context('Invalid Fields', () => {
      it('Create a new video without title', () => {
        cy.request({
          method: 'POST',
          url: '/videos',
          failOnStatusCode: false,
          body: {
            description: faker.hacker.phrase(),
            duration: faker.number.int(1200)
          }
        }).then(response => {
          expect(response.status).to.equal(400)
        })
      })

      it('Create a new video with duration as string', () => {
        cy.request({
          method: 'POST',
          url: '/videos',
          failOnStatusCode: false,
          body: {
            title: faker.hacker.phrase(),
            description: faker.hacker.phrase(),
            duration: '180,1'
          }
        }).then(response => {
          expect(response.status).to.equal(400)
        })
      })

      it('Create a new video without header application/json', () => {
        cy.request({
          method: 'POST',
          url: '/videos',
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.equal(415)
        })
      })
    })
  })
})