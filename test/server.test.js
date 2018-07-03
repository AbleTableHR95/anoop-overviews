
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/application.js');

const should = chai.should();

chai.use(chaiHttp);


describe('/GET restaurant', () => {
  it('it should return status code 200', (done) => {
    chai.request(server)
      .get('/restaurant/2/overview')
      .end((err, res) => {
        // console.log(res.body);
        res.should.have.status(200);
        done();
      });
  });
  it('it should GET restaurant overview object', (done) => {
    chai.request(server)
      .get('/restaurant/1/overview')
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });  
});


describe('/PUT restaurant', () => {
  it('it should return status code 200', (done) => {
    chai.request(server)
      .put('/restaurant/1/overview')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });  
});


describe('/POST restaurant', () => {
  it('it should return status code 200', (done) => {
    chai.request(server)
      .post('/restaurant/1/overview')
      .end((err, res) => {
        console.log(res.text)
        res.should.have.status(200);
        done();
      });
  });  

});

describe('/Delete restaurant', () => {
  it('it should return status code 200', (done) => {
    setTimeout(() => {
      chai.request(server)
        .delete('/restaurant/1/overview')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    }, 500)
  });  
});
