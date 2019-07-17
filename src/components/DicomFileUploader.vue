<template>
    <div class="columns is-centered">
        <div class="column is-two-thirds-tablet">
            <div
                class="dropzone has-text-centered"
                :class="{'dropzone-active': active}"
                @drop.prevent.stop="onDrop"
                @dragover.prevent.stop="active = true"
                @dragenter.prevent.stop="active = true"
                @dragleave.prevent.stop="active = false"
                @dragend.prevent.stop="active = false">
                <p class="dropzone-label">
                    Drop files here, or click the button below.
                </p>
                <div class="file is-centered is-boxed">
                    <label class="file-label">
                        <input
                            class="file-input"
                            type="file"
                            multiple
                            role="button"
                            aria-label="Upload file"
                            @change="onChange"
                        >
                        <span class="file-cta">
                            <span class="file-label">
                                <span v-if="loading" class="loader loader-grey"></span>
                                <span v-show="!loading">Upload...</span>
                            </span>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'fileList',
        event: 'change'
    },

    props: {
        fileList: {
            type: Array,
            default: () => []
        },
        loading: Boolean
    },

    data() {
        return {
            active: false
        }
    },

    methods: {
        updateFiles(newFiles) {
            const sortedFiles = newFiles.sort(({ name: a}, {name: b}) => {
                const res =
                    a > b ? 1 :
                        a < b ? -1 : 0
                console.log(a,b, res)
                return res
            })
            this.$emit('change', sortedFiles)
        },

        onChange(event) {
            this.updateFiles(Array.from(event.target.files))
        },

        onDrop(event) {
            this.active = false
            this.updateFiles(Array.from(event.dataTransfer.files))
        },
    },
}
</script>

<style lang="scss">
.loader.loader-grey {
    border-bottom-color: hsl(0, 0%, 48%);
    border-left-color: hsl(0, 0%, 48%);
}

.dropzone {
    border: 4px dashed #dbdbdb;
    padding: 16px 32px;

    &.dropzone-active {
        border-color: rgb(183, 216, 216);
        background-color: rgb(230, 240, 240)
    }

    .dropzone-label {
        padding-bottom: 16px;
    }
}
</style>