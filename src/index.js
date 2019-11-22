const fs = require('fs-extra')
const path = require('path')

// ----

async function main (strapi, { outputDir, contentType, filenameFunc }) {
  const items = await strapi.getEntries(contentType)

  const itemsDir = path.join(outputDir, contentType)
  await fs.ensureDir(itemsDir)

  await Promise.all(items.map((item) => {
    const filename = filenameFunc ? filenameFunc(item) : `${item._id}.json`
    return fs.writeFile(
      path.join(itemsDir, filename),
      JSON.stringify(item, null, 2),
      'utf8'
    )
  }))
  
  return items.length
}

module.exports = main
