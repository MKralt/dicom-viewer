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
                    Upload DICOM files
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
        }
    },

    methods: {
        onChange(event) {
            this.$emit('change', Array.from(event.target.files))
        }
    }
}
</script>