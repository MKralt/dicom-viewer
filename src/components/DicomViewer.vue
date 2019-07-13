<template>
    <div>
        <div class="viewer" ref="viewer"></div>
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
            imageLoader: cornerstoneWADOImageLoader
        }
    },

    computed: {
        imageIds() {
            return this.imageLoader ? this.files.map((file) => this.imageLoader.wadouri.fileManager.add(file)) : []
        }
    },

    methods: {
        displayImage(imageId) {
            this.cornerstone.loadImage(imageId).then((image) => this.cornerstone.displayImage(this.$refs.viewer, image))
        }
    },

    watch: {
        imageIds(newValue) {
            if(newValue.length > 0) {
                this.displayImage(newValue[0])
            }
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