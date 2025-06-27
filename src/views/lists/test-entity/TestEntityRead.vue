<template>
  <div>
    <!--{{$route.params.rId}}-->

    <!--<SuperRecord-->
    <!--  :model="superRecordModel"-->
    <!--  :id="$route.params.rId"-->
    <!--  :displayMapField="true"-->
    <!--  @initialLoadHappened="$emit('initialLoadHappened')"-->
    <!--&gt;-->
    <!--</SuperRecord>-->
  </div>
</template>

<script>
// import { SuperRecord } from 'wizweb-fe'
import TestEntity from 'src/models/orm-api/TestEntity'

export default {
    name: 'Brand-read',
    // components: { SuperRecord },
    computed: {
        superRecordModel() {
            return TestEntity
        },
    },
}
</script>

<style scoped></style>
