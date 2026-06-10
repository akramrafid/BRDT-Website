import https from 'https';

https.get('https://brdtrust.com/contact.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    if (data.includes('alert("Could not connect to server. Please try again later.");')) {
      console.log('ALERT FOUND: The live site is still serving the old contact.html code!');
    } else if (data.includes('document.createElement(\'div\')') && data.includes('Connection Error')) {
      console.log('NEW POPUP FOUND: The live site is serving the new code.');
    } else {
      console.log('NEITHER FOUND: The code might be different or minified.');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
