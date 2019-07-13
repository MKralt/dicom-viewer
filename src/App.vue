<template>
  <div id="app">
    <dicom-file-uploader v-model="dicomFiles"></dicom-file-uploader>
  </div>
</template>

<script>
import DicomFileUploader from '@/components/DicomFileUploader.vue'

export default {
  name: 'app',
  components: {
    DicomFileUploader
  },

  data() {
    return {
      dicomFiles: ['file']
    }
  }
}
</script>