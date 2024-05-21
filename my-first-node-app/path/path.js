function getURL() {
    const myURL = new URL('https://example.org:5173/foo/bar?baz=faz');
    console.log(myURL.origin); //https://example.org:5173
    console.log(myURL.pathname); // foo/bar;
    console.log(myURL.port); // 5173
    console.log(myURL.search); // ?baz=faz;
    console.log(myURL.searchParams.get('baz')); // faz;
}

module.exports = getURL;

