const nativeUrl = require('url')
const path = require('path')
const providers = require('./providers')

function parseRepoUrl (repoUrl) {
  if (typeof repoUrl === 'string') {
    repoUrl = nativeUrl.parse(repoUrl)
  }
  const hostFragments = repoUrl.hostname.split('.')
  const pathFragments = repoUrl.pathname.split('/')

  return {
    provider: hostFragments[0],
    owner: pathFragments[1],
    name: pathFragments[2],
  }
}

function getNotSettableError (propertyName, value, dependencies) {
  const depsString = dependencies
    .map(dep => `".${dep}"`)
    .join(' and ')

  return new Error(
    `".${propertyName}" is a computed property
    and can not be set to "${value}" directly.
    Set ${depsString} instead.`.replace(/\s+/g, ' ')
  )
}

module.exports = class Repository {
  constructor (options = {}) {
    // Delete all fields which provider a getter but no setter
    delete options.slug
    delete options.fullName
    delete options.apiUrl
    delete options.object
    delete options.string

    Object.assign(this, options)
  }

  static fromLocation (location) {
    const url = nativeUrl.parse(location)
    const isLocalPath = url.protocol === null && url.host === null
    if (isLocalPath) return this.fromPath(location)
    else return this.fromUrl(location)
  }

  static fromPath (repoPath) {
    const absolutePath = path.resolve(repoPath)

    return new Repository({
      absolutePath,
      name: path.basename(
        absolutePath,
        path.extname(absolutePath)
      ),
    })
  }

  static fromUrl (repoUrl) {
    if (typeof repoUrl === 'string') {
      repoUrl = nativeUrl.parse(repoUrl)
    }
    const isProviderUrl = repoUrl.slashes === null

    if (isProviderUrl) {
      // e.g. github:feramhq/broken
      return new Repository({
        provider: repoUrl.protocol.slice(0, -1),
        owner: repoUrl.hostname,
        name: repoUrl.pathname.slice(1),
      })
    }
    else {
      // e.g. https://github.com/feramhq/broken
      return new Repository(parseRepoUrl(repoUrl))
    }
  }

  static addProvider (providerObject) {
    providers.add(providerObject)
    return this
  }

  get slug () {
    return '/' + this.owner + '/' + this.name
  }
  set slug (value) {
    throw getNotSettableError('slug', value, ['owner', 'name'])
  }

  get fullName () {
    if (!this.owner || !this.name) return

    return this.owner + '/' + this.name
  }
  set fullName (value) {
    throw getNotSettableError('slug', value, ['owner', 'name'])
  }

  get url () {
    if (!this.provider || !this.slug) return
    return providers.get(this.provider).url + this.slug
  }
  set url (repoUrl) {
    Object.assign(this, parseRepoUrl(repoUrl))
  }

  get apiUrl () {
    if (!this.provider || !this.slug) return
    return providers.get(this.provider).apiUrl + this.slug
  }
  set apiUrl (value) {
    throw getNotSettableError('apiUrl', value, ['provider', 'slug'])
  }

  get object () {
    const {name, owner, fullName, provider, url, apiUrl, absolutePath} = this
    return {name, owner, fullName, provider, url, apiUrl, absolutePath}
  }
  set object (value) {
    throw getNotSettableError(
      'apiUrl',
      value,
      ['name', 'owner', 'provider']
    )
  }
  toJSON () {
    return this.object
  }

  get string () {
    return this.url
      ? nativeUrl.format(this.url)
      : this.name
  }
  set string (value) {
    throw getNotSettableError(
      'apiUrl',
      value,
      ['name', 'owner', 'provider']
    )
  }
  toString () {
    return this.string
  }
}
