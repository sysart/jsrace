<template>
  <div>
    <div class="blue-text" v-if="result.running">
      <h4>Running</h4>
    </div>
    <div class="red-text" v-if="result.error">
      <h4>Error!</h4>
    </div>
    <div v-if="result.hz">
      <h4 class="green-text">Done</h4>
      <h5>
        {{result.hz | roundNumber | localizeNumber}}
        <small>ops</small>
      </h5>
      <h6 class="grey-text">
        {{result.count | localizeNumber}} <small>samples</small><br/>
        {{result.cycles | localizeNumber}} <small>cycles</small>
      </h6>
      <h4 class="blue-text" v-if="result.fastest">
        Fastest!
      </h4>
    </div>
  </div>
</template>

<script>
import '../filters'

export default {
  props: ['result']
}
</script>
