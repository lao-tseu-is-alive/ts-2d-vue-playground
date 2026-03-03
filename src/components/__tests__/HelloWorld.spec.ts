import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import World from '../World.vue'

describe('World', () => {
  it('renders properly', () => {
    const wrapper = mount(World, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
