// dev only

const path = require('path')
const { linkBin } = require('./linkBin')

module.exports = function setupDevProject (targetDir) {
  return linkBin(
    require.resolve('@vicli/cli-service/bin/vue-cli-service'),
    path.join(targetDir, 'node_modules', '.bin', 'vicli-cli-service')
  )
}
