<template>
  <div id="app">
    <dicom-file-uploader v-model="dicomFiles"></dicom-file-uploader>
    <dicom-viewer :files="dicomFiles"></dicom-viewer>
  </div>
</template>

<script>
import DicomFileUploader from '@/components/DicomFileUploader.vue'
import DicomViewer from '@/components/DicomViewer.vue'

export default {
  name: 'app',
  components: {
    DicomFileUploader,
    DicomViewer
  },

  data() {
    return {
      dicomFiles: ['file']
    }
  }
}
</script>