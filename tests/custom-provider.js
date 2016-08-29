const assert = require('assert')
const Repository = require('..')

{
  process.stdout.write('Use custom provider')

  Repository.addProvider({
    url: 'https://gitparadise.com',
    apiUrl: 'https://api.gitparadise.com/repos',
  })

  const repo = Repository.fromUrl('gitparadise:octocat/Spoon-Knife')

  assert.strictEqual(
    JSON.stringify(repo),
    `{
      "name":"Spoon-Knife",
      "owner":"octocat",
      "fullName":"octocat/Spoon-Knife",
      "provider":"gitparadise",
      "url":"https://gitparadise.com/octocat/Spoon-Knife",
      "apiUrl":"https://api.gitparadise.com/repos/octocat/Spoon-Knife"
    }`.replace(/\s/g, '')
  )

  console.log(' ✔') // eslint-disable-line no-console
}
