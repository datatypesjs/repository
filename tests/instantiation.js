const assert = require('assert')
const Repository = require('..')
const options = {
  id: 1300192,
  name: 'Spoon-Knife',
  owner: {
    id: 583231,
    username: 'octocat',
    email: 'octocat@github.com',
    name: 'The Octocat',
    url: 'https://api.github.com/users/octocat',
    apiUrl: 'https://api.github.com/users/octocat',
    type: 'bot',
    role: 'user',
    state: 'active',
    createdAt: '2011-01-25T18:44:36Z',
    updatedAt: '2016-07-22T20:23:23Z',
  },
  private: false,
  description: 'This repo is for demonstration purposes only.',
  fork: false,
  url: 'https://github.com/octocat/Spoon-Knife',
  apiUrl: 'https://api.github.com/repos/octocat/Spoon-Knife',
  createdAt: '2011-01-27T19:30:43Z',
  updatedAt: '2016-07-29T05:55:33Z',
  pushedAt: '2016-07-29T16:36:13Z',
  language: 'HTML',
  defaultBranch: 'master',
}

{
  process.stdout.write('Instantiate class "Repository"')

  const repo = new Repository(options)

  assert(repo.id)
  assert(repo.name)
  assert(repo.owner)
  assert(repo.url)

  console.log(' ✔') // eslint-disable-line no-console
}

{
  process.stdout.write('Instantiate from URL')

  const repo = Repository.fromUrl(options.url)

  assert(repo.name)
  assert(repo.owner)
  assert.equal(repo.provider, 'github')
  assert.equal(String(repo.url), options.url)

  console.log(' ✔') // eslint-disable-line no-console
}

{
  process.stdout.write('Instantiate from provider URL')

  const repo = Repository.fromUrl('github:octocat/Spoon-Knife')

  assert(repo.name)
  assert(repo.owner)
  assert.equal(repo.provider, 'github')
  assert.equal(String(repo.url), options.url)

  console.log(' ✔') // eslint-disable-line no-console
}
