import * as cheerio from 'cheerio';

const ytIdRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

function getID(url) {
  var match = url.match(ytIdRegex);
  return (match && match[7].length == 11) ? match[7] : false;
}

async function findIframes(req) {
  const html = await req.text()
  try {
    const $ = cheerio.load(html)

    const iframes = $('iframe[src*="youtube"]')
    for (const iframe of $(iframes)) {
      let src = $(iframe).attr('src')
      const id = await getID(src)
      const width = $(iframe).attr('width')
      const height = $(iframe).attr('height')
      const params = new URL(src).searchParams.toString()
      
      if (id) {
        const lite = `<lite-youtube  videoid="${id}" autoload nocookie params=${params}> </lite-youtube>`
        $(iframe).replaceWith(lite)
      }
    }

    return $.html()
  } catch {
    console.log('Error parsing html')
    return html
  }
}

class addJS {
  async element(element) {
    element.append(`<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1.3.1/lite-youtube.js"></script>`, {
      html: true,
    })
  }
}

async function handleRequest(req) {
  const res = await fetch(req)
  const html = await findIframes(res);
  const newRes = new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    }
  });


  const rewritter = new HTMLRewriter().on('body', new addJS())

  return rewritter.transform(newRes)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})