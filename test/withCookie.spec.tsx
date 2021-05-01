/* tslint:disable */
import { configure, mount } from 'enzyme'
import { JSDOM } from 'jsdom'
import React from 'react'

import { WithCookieProps, withCookie } from '../src/withCookie'

const dom = new JSDOM('<!doctype html><html><body></body></html>')

global['window'] = dom.window
global['document'] = dom.window.document
global['navigator'] = {
  userAgent: 'node.js'
}

const Adapter: any = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })

class TestComponent extends React.Component<WithCookieProps> {

  render() {
    const { cookie } = this.props

    return (
      <React.Fragment>
        <p>{ cookie.get('test') }</p>
        <a onClick={ () => {
          cookie.set('test', 'value')

          this.forceUpdate()
        } }>Click</a>
      </React.Fragment>
    )
  }
}

describe('withCookie.tsx', () => {

  it('works in the render method', () => {
    const Component = withCookie(TestComponent)

    let wrapper = mount(<Component />)

    expect(wrapper.find(TestComponent).length).toEqual(1)
    expect(wrapper.find('p').text()).toEqual('')

    wrapper.find('a').simulate('click')

    expect(wrapper.find(TestComponent).length).toEqual(1)
    expect(wrapper.find('p').text()).toEqual('value')
  })
})
