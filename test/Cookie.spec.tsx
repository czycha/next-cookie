import { NextPageContext } from 'next'

import { Cookie } from '../src/Cookie'

describe('Cookie.ts', () => {

  describe('works properly when executing a constructor', () => {
    it('read a cookie string', () => {
      const c = new Cookie('testKey=testValue')

      expect(c.has('testKey')).toBeTruthy()
      expect(c.get('testKey')).toEqual('testValue')
    })

    it('read a NextContext', () => {
      const dummyNextContext = {
        req: {
          headers: {
            cookie: 'testKey=testValue'
          }
        }
      }

      const c = new Cookie(dummyNextContext as NextPageContext)

      expect(c.has('testKey')).toBeTruthy()
      expect(c.get('testKey')).toEqual('testValue')
    })
  })
})
