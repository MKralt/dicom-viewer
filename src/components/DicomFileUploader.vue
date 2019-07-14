<template>
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
                    <span v-show="!loading">Upload DICOM files</span>
                </span>
            </span>
        </label>
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

    methods: {
        onChange(event) {
            this.$emit('change', Array.from(event.target.files))
        }
    }
}
</script>

<style lang="scss">
.loader.loader-grey {
    border-bottom-color: hsl(0, 0%, 48%);
    border-left-color: hsl(0, 0%, 48%);
}
</style>