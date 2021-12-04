/*
 * @Description:参数验证器
 */
module.exports = paramSchema => {
  return async function (ctx, next) {
    const paramMap = {
      query: ctx.request.query,
      body: ctx.request.body
    }

    if (!paramSchema) return next()

    const validResult = paramSchema.schema.validate(paramMap[paramSchema.type], {
      allowUnknown: true
    })
    if (validResult.error) {
      console.log(validResult.error)
      ctx.body = {
        code: 400,
        message: validResult.error.details[0].message
      }
      return
    }
    await next()
  }
}
