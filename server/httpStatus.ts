export const HttpStatus = {
  BadRequest: 400,
  MethodNotAllowed: 405,
  InternalServerError: 500,
} as const

export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus]
