<template>
  <div id="app" class="app">
      <div class="columns is-centered is-marginless">
        <div class="box column is-10-desktop is-8-widescreen is-6-fullhd has-background-light">
          <dicom-viewer
            :files="dicomFiles"
            @loaded="onLoaded"
          ></dicom-viewer>
        </div>
      </div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <span class="modal-card-title">Upload DICOM files</span>
        </header>
        <section class="modal-card-body">
          <p class="margin-bottom">
            Welcome to DICOM viewer! Please click the button below to upload one or multiple DICOM files, in order to view them.
          </p>
          <dicom-file-uploader v-model="dicomFiles"></dicom-file-uploader>
        </section>
        <footer class="modal-card-foot">
        </footer>
      </div>
    </div>
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
      dicomFiles: [],
      showModal: true
    }
  },

  methods: {
    onLoaded() {
      this.dicomFiles.length > 0 && (this.showModal = false)
    }
  }
}
</script>

<style lang="scss">
@import 'bulma';
@import 'bulma-slider/dist/css/bulma-slider.sass';

.app {
  height: 100vh;

  padding: 8px;

  @include desktop{
    padding: 32px;
  }
}

.margin-bottom {
  margin-bottom: 16px;
}
</style>