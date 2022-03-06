const Article = require('../db/models/article')
const fs = require('fs')


const generateSiteMap = async () => {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n\r`
  let pages = `
  <url>
    <loc>https://www.kodiranje.in.rs/</loc>
    <lastmod>${(new Date()).toISOString().split('.')[0]}+00:00</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>\r\n`
  const close = `\n\r</urlset>`
  const data = await Article.find({ published: true }).select(`-articleContent 
    -__v 
    -socImage 
    -_id 
    -tags 
    -googDesc 
    -socDesc 
    -socTitle 
    -googTitle 
    -created 
    -edited 
    -order
    -createdAt
    -navName
    -published
    -author`)
  //let otherPages = ``
  data.forEach(article => {
    pages += `
  <url>
    <loc>https://www.kodiranje.in.rs/${article.courseName}/${article.selectedURL}/</loc>
    <lastmod>${(new Date(article.updatedAt)).toISOString().split('.')[0]}+00:00</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>\r\n`
  })
  const sitemap = header + pages + close
  fs.writeFile('src/sitemap.xml', sitemap, (er) => {
    if (er) console.log(er)
  })
}

module.exports = generateSiteMap