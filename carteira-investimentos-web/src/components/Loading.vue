<template>
    <div class="vld-parent">
        <loading :active.sync="activate" 
            :can-cancel="onCancel" 
            :is-full-page="isFullPage"></loading>
    </div>
</template>
 
<script>
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    
    export default {
        props: [
            'activate',
            'onCancel',
            'isFullPage',
        ],
        components: {
            Loading
        },
    }
</script> 