const assert = require('assert')
const Repository = require('..')

{
  process.stdout.write('Serialize with JSON.stringify()')

  const repo = Repository.fromUrl('github:octocat/Spoon-Knife')

  assert.equal(
    JSON.stringify(repo),
    `{
      "name":"Spoon-Knife",
      "owner":"octocat",
      "fullName":"octocat/Spoon-Knife",
      "provider":"github",
      "url":"https://github.com/octocat/Spoon-Knife",
      "apiUrl":"https://api.github.com/repos/octocat/Spoon-Knife"
    }`.replace(/\s/g, '')
  )

  console.log(' ✔') // eslint-disable-line no-console
}
