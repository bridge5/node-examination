const supertest = require('supertest');
const http = require('http');

const app = require('../../../server');
const conn = require('../../../swagger/db');

let request = null;
let server = null;

describe('Test API /players', () => {

  beforeAll(async (done) => {
    jest.setTimeout(30000);
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
    await conn.connect()
  });
  
  afterAll(async (done) => {
    await conn.close()
    await server.close();
    done();
  });

  it('Corrected, createing a new player', async () => {
      let result = await request.post('/players')
        .send({
          name: "LeBron",
          position: "C"
        })

      const body = result.body;

      expect(result.status).toBe(200);
      expect(body.message).toBe('success')
  })

  it('Incorrected, createing a new player', async () => {
    let result = await request.post('/players')
      .send({
        name: "LeBron",
        position: "GG"
      })

    const body = result.body;

    expect(result.status).toBe(405);
    expect(body.message).toBe('Invalid Input')
  })

  it('Corrected, query a existing player', async () => {
    let result = await request.get('/players/0')

    const body = result.body;

    expect(result.status).toBe(200);
    const existingPlayer = {
      id: 0,
      name: "LeBron",
      position: "C",
      message: "success"
    };
    expect(body).toEqual(existingPlayer)
  })  

  it('Incorrected, query a non-existing player', async () => {
    let result = await request.get('/players/GG')

    const body = result.body;

    expect(result.status).toBe(400);
    expect(body.message).toEqual('Invalid ID supplied')
  })

  it('Corrected, update a existing player', async () => {
    let result = await request.put('/players')
      .send({
        id: 0,
        name: "Curry",
        position: "C"
      })

    const body = result.body;

    expect(result.status).toBe(200);
    expect(body.message).toBe('success')
  })  

  it('Incorrected, update a existing player with wrong position', async () => {
    let result = await request.put('/players')
      .send({
        id: 100,
        name: "Curry",
        position: "C"
      })

    const body = result.body;

    expect(result.status).toBe(404);
    expect(body.message).toBe('Player not found')
  })  

  it('Incorrected, update a existing player with wrong position', async () => {
    let result = await request.put('/players')
      .send({
        id: 0,
        name: "Curry",
        position: "GG"
      })

    const body = result.body;

    expect(result.status).toBe(405);
    expect(body.message).toBe('Validation exception')
  })  

  it('Incorrected, update a existing player with wrong ID', async () => {
    let result = await request.put('/players')
      .send({
        id: 'GG',
        name: "Curry",
        position: "C"
      })

    const body = result.body;

    expect(result.status).toBe(400);
    expect(body.message).toBe('Invalid ID supplied')
  })  

  it('Corrected, Delete a existing player', async () => {
    let result = await request.del('/players/0')

    const body = result.body;

    expect(result.status).toBe(200);
    expect(body.message).toBe('success')
  })  

  it('Incorrected, Delete a non-existing player', async () => {
    let result = await request.del('/players/1000')

    const body = result.body;

    expect(result.status).toBe(404);
    expect(body.message).toBe('Player not found')
  })  

  it('Incorrected, Delete a non-existing player with wrong ID', async () => {
    let result = await request.del('/players/GG')

    const body = result.body;

    expect(result.status).toBe(400);
    expect(body.message).toBe('Invalid ID supplied')
  })  
})
