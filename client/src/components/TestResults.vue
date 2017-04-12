<template>
  <section class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title">Results</span>
          <table>
            <thead>
              <th>Name</th>
              <th>OPS</th>
              <th>Samples</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              <tr v-for="result in results">
                <td>{{result.test.name || result.fn}}</td>
                <template v-if="!result.error">
                  <td>{{result.hz | round | localize}}</td>
                  <td>{{result.count | localize}}</td>
                  <td>
                    <span v-if="result.running" class="badge new blue" data-badge-caption="Running..."></span>
                    <span v-if="result.fastest" class="badge new" data-badge-caption="Fastest!"></span>
                  </td>
                </template>
                <template v-else>
                  <td colspan="2">
                    {{result.error}}
                  </td>
                  <td>
                    <span class="badge new red" data-badge-caption="Error"></span>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: [
    'results'
  ],
  filters: {
    round (num) {
      if (typeof num === 'number') {
        return Math.round(num)
      }
    },
    localize (num) {
      if (typeof num === 'number') {
        return num.toLocaleString()
      }
    }
  }
}
</script>
