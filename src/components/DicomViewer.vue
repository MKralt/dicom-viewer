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
            currentImageIndex: 0,
            images: {}
        }
    },

    computed: {
        imageIds() {
            return this.imageLoader ? this.files.map((file) => this.imageLoader.wadouri.fileManager.add(file)) : []
        },

        currentImage() {
            return this.images[this.imageIds[this.currentImageIndex]]
        }
    },

    methods: {
        displayImage(image) {
            this.cornerstone.displayImage(this.$refs.viewer, image)
        }
    },

    watch: {
        imageIds(imageIds) {
            const images = {}

            const promises = []

            imageIds.map((imageId) => {
                const promise = this.cornerstone.loadImage(imageId)
                promises.push(promise)

                promise.then((image) => {
                    images[imageId] = image
                })
            })

            Promise.all(promises).then(() => {
                this.currentImageIndex = 0
                this.images = images
            })
        },

        currentImage(image) {
            image && this.displayImage(image)
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