const assert = require('assert')
const Repository = require('..')

{
  process.stdout.write('Create repo from file path')

  const repo = Repository.fromLocation('.')

  assert.equal(
    JSON.stringify(repo),
    `{
      "name":"repository",
      "absolutePath":"/Users/adrian/Projects/repository"
    }`.replace(/\s/g, '')
  )

  console.log(' ✔') // eslint-disable-line no-console
}
