const axios = require('axios');

const owner = '---------';
const repo = '--------';
const token = '------'; 


const jsFilesContents = [];

async function fetchRepoContents(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `token ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching repository contents:', error);
    return [];
  }
}

async function fetchJSFiles(contentsUrl) {
  const contents = await fetchRepoContents(contentsUrl);
  for (const item of contents) {
    if (item.type === 'file' && item.name.endsWith('.js')) {
      const fileResponse = await axios.get(item.download_url);
      jsFilesContents.push(fileResponse.data);
      console.log(`Read: ${item.path}`);
    } else if (item.type === 'dir') {
      await fetchJSFiles(item.url);
    }
  }
}

(async () => {
  const repoContentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
  await fetchJSFiles(repoContentsUrl);
  console.log('Finished scraping JavaScript files.');
  //console.log('JavaScript files contents:', jsFilesContents);
})();
