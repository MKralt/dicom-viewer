import { shallowMount } from '@vue/test-utils'
import DicomViewer from '@/components/DicomViewer.vue'

describe('DicomViewer.vue', () => {
  it('has the correct default prop values', () => {
    const wrapper = shallowMount(DicomViewer)

    expect(wrapper.props().files).toBeTruthy()
    expect(Array.isArray(wrapper.props().files)).toBe(true)
    expect(wrapper.props().files.length).toBe(0)
  })

  it('contains files when passed as a prop', () => {
    const files = new Array()
    const wrapper = shallowMount(DicomViewer, {
      propsData: { files }
    })

    expect(wrapper.props().files).toBeTruthy()
    expect(wrapper.props().files.length).toBe(0)
    expect(wrapper.props().files).toBe(files)
  })
})
