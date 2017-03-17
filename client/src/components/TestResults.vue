<template>
  <section class="mdc-card">
    <table>
      <thead>
        <th>Name</th>
        <th>OPS</th>
        <th>Samples</th>
        <th>&nbsp;</th>
      </thead>
      <tbody>
        <tr v-for="result in results">
          <td>{{result.test.name}}</td>
          <td>{{result.hz}}</td>
          <td>{{result.count}}</td>
          <td>
            <span v-if="result.running">RUNNING</span>
            <span v-if="result.fastest">FASTEST!</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  props: [
    'results'
  ]
}
</script>
