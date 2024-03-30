import { faker } from '@faker-js/faker'

describe('CRUD of a video', () => {

  beforeEach(() => {
    cy.cleanDatabase()
  })
  it('Happy Path', () => {
    cy.createVideo()
      .then(response => {
        expect(response.status).to.equal(201)
        let video = response.body[0]
        cy.wrap(video).as('createdVideo')
      })

    cy.get('@createdVideo').then(video => {
      cy.request({
        method: 'GET',
        url: `/videos/${video.id}`,
      }).then(response => {
        expect(response.status).to.equal(200)
        expect(response.body[0]).to.deep.equal(video)
      })

      const newVideo = {
        id: video.id,
        title: faker.hacker.phrase(),
        description: faker.hacker.phrase(),
        duration: faker.number.int({ min: 1, max: 1200 })
      }

      cy.updateVideo(newVideo)
        .then(response => {
          expect(response.status).to.equal(200)
          expect(response.body[0]).to.deep.equal(newVideo)
        })

      cy.deleteVideo(video.id)
        .then(response => {
          expect(response.status).to.equal(204)
        })

      cy.request({
        method: 'GET',
        url: `/videos/${video.id}`,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.equal(404)
      })
    })
  })

  it('Search Query', () => {
    cy.createVideo({ title: `How to ${faker.word.words(5)}`})
      .then(response => {
        expect(response.status).to.equal(201)
        let video = response.body[0]
        cy.wrap(video).as('createdVideo')
      })

    cy.get('@createdVideo').then(video => {
      cy.request({
        method: 'GET',
        url: '/videos/?search=How to',
      }).then(response => {
        expect(response.status).to.equal(200)
        expect(response.body[0]).to.deep.equal(video)
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

      it('Update a new video without title', () => {
        cy.createVideo()
          .then(response => {
            expect(response.status).to.equal(201)
            let video = response.body[0]
            cy.wrap(video).as('createdVideo')
          })

        cy.get('@createdVideo').then(video => {
          cy.request({
            method: 'PUT',
            url: `/videos/${video.id}`,
            failOnStatusCode: false,
            body: {
              description: faker.hacker.phrase(),
              duration: faker.number.int(1200)
            }
          }).then(response => {
            expect(response.status).to.equal(400)
          })
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