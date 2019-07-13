<template>
    <input
        type="file"
        :files="fileList"
        @change="$emit('change', fileList)"
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
    }
}
</script>