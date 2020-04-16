const fs = require('fs-extra')
const path = require('path')

// ----

async function main (strapi, { outputDir, contentType, filenameFunc }) {
  const items = await strapi.getEntries(contentType)

  const itemsDir = path.join(outputDir, contentType)
  await fs.ensureDir(itemsDir)

  const filenames = items.map((item) => {
    return filenameFunc ? filenameFunc(item) : `${item._id}.json`
  })

  await Promise.all(items.map((item, i) => {
    const filename = filenames[i]
    return fs.writeFile(
      path.join(itemsDir, filename),
      JSON.stringify(item, null, 2),
      'utf8'
    )
  }))
  
  await fs.writeFile(
    path.join(itemsDir, '_index.json'),
    JSON.stringify(filenames, null, 2),
    'utf8'
  )

  return items.length
}

module.exports = main
