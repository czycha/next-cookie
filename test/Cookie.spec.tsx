import { NextPageContext } from 'next'
import { createResponse } from 'node-mocks-http'

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

  describe('works properly when setting "set-cookie" headers', () => {
    let dummyNextContext;
    let c: Cookie;

    beforeEach(() => {
      dummyNextContext = {
        req: {
          headers: {
            cookie: "",
          },
        },
        res: createResponse(),
      };

      c = new Cookie(dummyNextContext as NextPageContext);
    })

    it('adds a set-cookie header when setting cookies', () => {
      c.set('testKey', 'testValue')

      expect(dummyNextContext.res.getHeader('set-cookie')).toEqual(['testKey=testValue'])
    })

    it("adds multiple set-cookie headers when setting cookies", () => {
      c.set("testKey1", "testValue1");
      c.set("testKey2", "testValue2");
      c.set("testKey3", "testValue3");

      expect(dummyNextContext.res.getHeader("set-cookie")).toEqual([
        "testKey1=testValue1",
        "testKey2=testValue2",
        "testKey3=testValue3",
      ]);
    });

    it('removes extant set-cookie headers when removing cookies', () => {
      c.set('testKey1', 'testValue1');
      c.set('testKey2', 'testValue2');
      c.set('testKey3', 'testValue3');
      c.remove('testKey2');

      expect(dummyNextContext.res.getHeader("set-cookie")).toEqual([
        "testKey1=testValue1",
        "testKey3=testValue3",
      ]);
    })
  })
})
