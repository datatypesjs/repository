const url = require('url')
const assert = require('assert')
const providers = {
  bitbucket: {
    url: 'https://bitbucket.com',
    apiUrl: 'https://api.bitbucket.org/2.0/repositories',
  },
  github: {
    url: 'https://github.com',
    apiUrl: 'https://api.github.com/repos',
  },
  gitlab: {
    url: 'https://gitlab.com',
    apiUrl: 'https://gitlab.com/api/v3/repos',
  },
}

module.exports.get = (providerName) => {
  const provider = providers[providerName]

  if (!provider) {
    throw new Error(
      `Provider "${providerName}" is not defined.
      Add the provider with "repository.addProvider(providerObject)" `)
  }

  return provider
}

module.exports.getAll = () => {
  return providers
}

module.exports.add = (providerObject) => {
  assert(
    providerObject.url || providerObject.apiUrl,
    'Provider object must have a "url" or an "apiUrl" property'
  )
  const urlObject = url.parse(providerObject.url || providerObject.apiUrl)
  const provider = urlObject.hostname.split('.')[0]

  assert(provider)
  providers[provider] = providerObject
  return this
}
