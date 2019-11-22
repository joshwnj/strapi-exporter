#!/usr/bin/env node

const { default: Strapi } = require('strapi-sdk-javascript')
const doExport = require('../src')
const argv = require('yargs')
  .usage('Usage: $0 -u [Strapi URL] -o [Output Directory] -t [Content Type]')
  .demandOption(['u', 'o', 't'])
  .option('url', {
    alias: 'u',
    type: 'string',
    description: 'URL of Strapi CMS',
  })
  .option('out', {
    alias: 'o',
    type: 'string',
    description: 'Directory to write exported files.',
  })
  .option('type', {
    alias: 't',
    type: 'string',
    description: 'Content type to export (directory will be created with matching name)',
  })
  .option('name-field', {
    alias: 'f',
    type: 'string',
    description: 'Field to use as the filename of the exported object (default: _id)',    
  })
  .argv

const outputDir = argv.out
const url = argv.url
const contentType = argv.type
const nameField = argv.f || '_id'

const { 
  STRAPI_USER, 
  STRAPI_PASSWORD,
} = process.env

main()

// ----

async function main () {
  const strapi = new Strapi(url)
  
  if (STRAPI_USER && STRAPI_PASSWORD) {
    console.log('Authenticating as:', STRAPI_USER)
    await strapi.login(STRAPI_USER, STRAPI_PASSWORD)
  }

  const count = await doExport(strapi, { 
    outputDir,
    contentType,
    filenameFunc: (item) => `${item[nameField]}.json`
  })
  
  console.log('Exported %d %s', count, contentType)
}
