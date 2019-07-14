<template>
    <div>
        <div class="slider-wrapper is-flex">
            <input
                type="range"
                class="slider"
                min="0"
                :max="imageFiles.length - 1"
                v-model="currentImageIndex">
            <span class="slider-value">
                {{ +currentImageIndex + 1 }} / {{ imageFiles.length }}
            </span>
        </div>
        <div class="columns">
            <div class="column is-three-quarters-desktop is-two-thirds-tablet">
                <div class="viewer" ref="viewer"></div>
            </div>
            <div class="column content-box" :style="`height: ${canvasHeight}`">
                <div class="message">
                    <div class="message-header">
                        <span>DICOM files</span>
                    </div>
                    <div class="panel">
                        <div class="panel-block-container has-background-white">
                            <a
                                v-for="({ id, name }, index) in imageFiles"
                                class="panel-block panel-link"
                                :class="{'is-active': currentImageIndex == index}"
                                style="text-decoration-line: none"
                                :key="id"
                                @click="currentImageIndex = index">
                                <span v-if="currentImageIndex == index" class="panel-icon">
                                    &#9679;
                                </span>
                                {{ name }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            images: {},
            canvasHeight: '0px'
        }
    },

    computed: {
        imageFiles() {
            return this.imageLoader ? this.files.map((file) => {
                return {
                    id: this.imageLoader.wadouri.fileManager.add(file),
                    name: file.name
                }
            }) : []
        },

        currentImage() {
            return this.imageFiles.length > 0 ? this.images[this.imageFiles[this.currentImageIndex].id] : {}
        }
    },

    methods: {
        displayImage(image, element = this.$refs.viewer) {
            this.cornerstone.displayImage(element, image)
        }
    },

    watch: {
        imageFiles(imageFiles) {
            const images = {}

            const promises = []

            imageFiles.map(({ id: imageId }) => {
                const promise = this.cornerstone.loadImage(imageId)
                promises.push(promise)

                promise.then((image) => {
                    images[imageId] = image
                })
            })

            Promise.all(promises).then(() => {
                this.currentImageIndex = 0
                this.images = images
                this.$emit('loaded')
            })
        },

        currentImage(image) {
            image && this.displayImage(image)
        }
    },

    mounted() {
        const viewer = this.$refs.viewer
        this.canvasHeight = viewer.style.height = window.getComputedStyle(viewer).width
        this.cornerstone.enable(viewer)

        window.addEventListener('resize', () => {
            this.canvasHeight = viewer.style.height = window.getComputedStyle(viewer).width
            this.cornerstone.resize(viewer)
        })
    }
}
</script>

<style lang="scss" scoped>
.viewer {
    width: 100%;
}

.message {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.content-box {
    box-sizing: content-box;
}

.slider-value {
    margin-left: 8px;
}

.slider-wrapper {
    margin-bottom: 16px;
    align-items: center;
}

.slider {
    flex: 1;
}

.panel {
    flex: 1;
    overflow-y: auto;
}

.panel-block-container {
    overflow-y: auto;
}
</style>