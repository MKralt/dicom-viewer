<template>
    <div>
        <div class="viewer" ref="viewer"></div>
        <input
            type="range"
            min="0"
            :max="imageIds.length - 1"
            v-model="currentImageIndex">
        <input
            type="number"
            min="0"
            :max="imageIds.length - 1"
            v-model="currentImageIndex">
    </div>
</template>

<script>
import dicomParser from 'dicom-parser'
import cornerstone from 'cornerstone-core'
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'

cornerstoneWADOImageLoader.external.dicomParser = dicomParser
cornerstoneWADOImageLoader.external.cornerstone = cornerstone

const config = {
    webWorkerPath : process.env.BASE_URL + 'cornerstoneWADOImageLoaderWebWorker.js',
    taskConfiguration: {
        'decodeTask' : {
            codecsPath: process.env.BASE_URL + 'cornerstoneWADOImageLoaderCodecs.js'
        }
    }
}

cornerstoneWADOImageLoader.webWorkerManager.initialize(config);

export default {
    props: {
        files: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            cornerstone: cornerstone,
            imageLoader: cornerstoneWADOImageLoader,
            currentImageIndex: 0
        }
    },

    computed: {
        imageIds() {
            return this.imageLoader ? this.files.map((file) => this.imageLoader.wadouri.fileManager.add(file)) : []
        },

        currentImageId() {
            return this.imageIds[this.currentImageIndex]
        }
    },

    methods: {
        displayImage(imageId) {
            imageId && this.cornerstone.loadImage(imageId).then((image) => this.cornerstone.displayImage(this.$refs.viewer, image))
        }
    },

    watch: {
        imageIds(newValue) {
            if(newValue.length > 0) {
                this.currentImageIndex = 0
            }
        },

        currentImageId(imageId) {
            this.displayImage(imageId)
        }
    },

    mounted() {
        this.cornerstone.enable(this.$refs.viewer)
    }
}
</script>

<style lang="scss" scoped>
.viewer {
    width: 500px;
    height: 500px;
}
</style>