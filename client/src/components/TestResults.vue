<template>
  <div class="card">
    <div class="card-content">
      <span class="card-title">Results</span>
      <table>
        <thead>
          <th>Name</th>
          <th class="right-align">Samples</th>
          <th class="right-align">Cycles</th>
          <th class="right-align">OPS</th>
          <th style="width: 1px">&nbsp;</th>
        </thead>
        <tbody v-if="result">
          <tr v-for="testResult in result.tests">
            <td>{{testResult.test.name || testResult.fn}}</td>
            <template v-if="!testResult.error">
              <td class="right-align">{{testResult.count | localizeNumber}}</td>
              <td class="right-align">{{testResult.cycles | localizeNumber}}</td>
              <td class="right-align">{{testResult.hz | roundNumber | localizeNumber}}</td>
              <td>
                <span v-if="testResult.running" class="badge new blue" data-badge-caption="Running..."></span>
                <span v-if="testResult.fastest" class="badge new" data-badge-caption="Fastest!"></span>
              </td>
            </template>
            <template v-else>
              <td colspan="2">
                {{testResult.error}}
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
</template>

<script>
import '../filters'

export default {
  props: [
    'result'
  ]
}
</script>
