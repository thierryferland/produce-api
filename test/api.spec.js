let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()
let config = require('../config')
let expect = chai.expect

chai.use(chaiHttp)

describe('/GET producer', () => {
  it('it should GET all the published producers', (done) => {
    chai.request(server)
            .get('/' + config.API_VERSION + '/producer')
            .end((err, res) => {
              res.should.have.status(200)
              res.body.producers.should.be.a('array')
              expect(res.body.producers).to.not.be.empty
              done()
            })
  })

  it('A producer should have a name, a description and and image url', (done) => {
    chai.request(server)
            .get('/' + config.API_VERSION + '/producer')
            .end((err, res) => {
              res.should.have.status(200)
              res.body.producers[0].should.have.property('name')
              res.body.producers[0]['name'].should.be.a('string')
              res.body.producers[0].should.have.property('description')
              res.body.producers[0]['description'].should.be.a('string')
              res.body.producers[0].should.have.property('imageUrl')
              res.body.producers[0]['imageUrl'].should.be.a('string')
              done()
            })
  })
})

describe('/GET producer/image/55', () => {
  it('it should GET an image', (done) => {
    chai.request(server)
            .get('/' + config.API_VERSION + '/producer/image/55')
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('Uint8Array')
              done()
            })
  })
})
