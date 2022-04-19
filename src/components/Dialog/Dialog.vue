<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="850"
            @click:outside="setShow(false)"
        >
            <slot name="content">
            </slot>
        </v-dialog>
    </div>
</template>

<script>

    import { mapState, mapMutations  } from 'vuex'
    export default {
        data(){
            return{
                //dialog: false
            }
        },
        methods: {
            ...mapMutations({
                setShow: 'dialog/setShow'
            })
        },
        computed: mapState({
            dialog: state => state.dialog.show,
        })
    }
</script>