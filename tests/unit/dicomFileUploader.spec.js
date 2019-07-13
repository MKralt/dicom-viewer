import { shallowMount } from '@vue/test-utils'
import DicomFileUploader from '@/components/DicomFileUploader.vue'

describe('DicomFileUploader.vue', () => {
  it('has the correct default prop values', () => {
    const wrapper = shallowMount(DicomFileUploader)

    expect(wrapper.props().fileList).toBeTruthy()
    expect(Array.isArray(wrapper.props().fileList)).toBe(true)
    expect(wrapper.props().fileList.length).toBe(0)
  })

  it('contains a fileList when passed as a prop', () => {
    const fileList = new Array()
    const wrapper = shallowMount(DicomFileUploader, {
      propsData: { fileList }
    })

    expect(wrapper.props().fileList).toBeTruthy()
    expect(wrapper.props().fileList.length).toBe(0)
    expect(wrapper.props().fileList).toBe(fileList)
  })

  it('emits the fileList on a change event', () => {
    const fileList = new Array()
    const wrapper = shallowMount(DicomFileUploader, {
      propsData: { fileList }
    })

    wrapper.trigger('change')

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change.length).toBe(1)
    expect(wrapper.emitted().change[0]).toEqual([fileList])
  })
})
