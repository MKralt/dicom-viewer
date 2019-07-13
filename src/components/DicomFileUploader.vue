<template>
    <input
        type="file"
        multiple
        role="button"
        aria-label="Upload file"
        @change="onChange"
    />
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