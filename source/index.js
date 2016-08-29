const nativeUrl = require('url')
const providersMap = require('./providersMap')

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

module.exports = class Repository {
  constructor (options = {}) {
    Object.assign(this, options)
  }

  static fromLocation (location) {
    const url = nativeUrl.parse(location)
    const isLocalPath = url.protocol === null && url.host === null
    if (isLocalPath) return this.fromPath(location)
    else return this.fromUrl(location)
  }

  static fromPath (repoPath) {
    this.path = repoPath
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

  get slug () {
    return '/' + this.owner + '/' + this.name
  }

  get fullName () {
    return this.owner + '/' + this.name
  }

  get url () {
    return providersMap[this.provider].url + this.slug
  }
  set url (repoUrl) {
    Object.assign(this, parseRepoUrl(repoUrl))
  }

  get apiUrl () {
    return providersMap[this.provider].api + this.slug
  }
  set apiUrl (apiUrl) {
    this._apiUrl = apiUrl
  }

  get object () {
    const {name, owner, provider, url, apiUrl} = this
    return {name, owner, provider, url, apiUrl}
  }
  toJSON () {
    return this.object
  }

  get string () {
    return nativeUrl.format(this.url)
  }
  toString () {
    return this.string
  }
}
