/*
 * @Description:player crud 测试
 */
const { expect } = require('chai')
const server = require('../server')

// 获取列表
test('获取列表，应当成功', async () => {
  const res = await server
    .get('/players')
  expect(res.body.code).equal(200)
})

// 创建检测，输入检测，应当失败
test('创建检测，输入检测，应当失败', async () => {
  const res = await server
    .post('/players')
    .send({
      name: 'laoxu',
      position: 'aa'
    })
  expect(res.body.code).equal(400)
})

// 创建检测，缺少字段，应当失败
test('创建检测，缺少字段，应当失败', async () => {
  const res = await server
    .post('/players')
    .send({
      name: 'laoxu',
    })
  expect(res.body.code).equal(400)
})

// 创建检测，格式正确，应当成功
test('创建检测，格式正确，应当成功', async () => {
  const res = await server
    .post('/players')
    .send({
      name: 'laoxu12345',
      position: 'C'
    })
  expect(res.body.code).equal(201)
})

// 获取列表
test('获取列表，应当成功', async () => {
  const res = await server
    .get('/players')
    .query({
      name: 'laoxu12345'
    })
  expect(res.body.code).equal(200)
})

// 获取详情
test('获取详情，应当成功', async () => {
  const resList = await server
    .get('/players')
    .query({
      name: 'laoxu12345'
    })
  const res = await server
    .get(`/players/${resList.body.data[0]._id}`)
  expect(res.body.data.name).equal('laoxu12345')
})

// 更新检测，应当成功
test('更新检测，应当成功', async () => {
  const resList = await server
    .get('/players')
    .query({
      name: 'laoxu12345'
    })
  const res = await server
    .put(`/players/${resList.body.data[0]._id}`)
    .send({
      name: 'laoxu1234567890',
      position: 'C'
    })
  expect(res.body.code).equal(200)
})

// 删除检测，应当成功
test('删除检测，应当成功', async () => {
  const resList = await server
    .get('/players')
    .query({
      name: 'laoxu1234567890'
    })
  const res = await server
    .delete(`/players/${resList.body.data[0]._id}`)
  expect(res.body.code).equal(200)
})
