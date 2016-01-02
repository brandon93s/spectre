<h1 align="center">
	<br>
	<img width="400" src="https://cdn.rawgit.com/brandon93s/spectre/c8045fa55773b321015db94d3b55787e6dbc5fdb/media/logo.png" alt="spectre">
	<br>
    <br>
</h1>

# spectre [![Build Status](https://travis-ci.org/brandon93s/spectre.svg?branch=master)](https://travis-ci.org/brandon93s/spectre)

> Highly concurrent, extensively configurable, necessarily stable export server   :ghost:

## Install

#### External Dependencies

###### Required
- Node.js >= [4.2.x](https://nodejs.org/en/download/)
- PhantomJS<sup> 1</sup> >= [2.x](http://phantomjs.org/download.html)

###### Optional
- PDFtk<sup> 1</sup> >= [2.x](https://www.pdflabs.com/tools/pdftk-server/) - only required for merging bulk pdf request into a single pdf

<sub>1: this dependency must be either (1) available directly in your path OR (2) the absolute path to the executable provided in the config </sub>


#### Clone
```
git clone https://github.com/brandon93s/spectre.git
cd spectre
```
#### Install Node Modules

```
npm install
```


## Usage

```
// start spectre
npm start

// run tests
npm test
```

## Examples
###### GET
```js
// screenshot of github.com
GET /?url=github.com
```
```js
// custom viewport size
GET /?url=github.com&width=700&height=450
```
```js
// non-default file type
GET /?url=github.com&format=pdf
```
###### POST
```js
// delay rendering 3 seconds
POST /
{
   "url":"github.com",
   "mode":"delay",
   "delay":3000
}
```
```js
// bulk request
POST /
{
   "format":"pdf",
   "width":1920,
   "height":750,
   "paperSize":{
      "format":"Letter",
      "orientation":"landscape",
      "margin":"1cm"
   },
   "items":[
      {
         "url":"github.com"
      },
      {
         "url":"atom.io",
         "mode":"delay",
         "delay":350
      },
      {
         "url":"travis-ci.org",
         "width":1000
      }
   ]
}
```


## Documentation

```
// todo
```

## API

#### GET /

#### POST /

##### url
*Required* <br />
Type: `string`

The url to request.

##### format
Type: `string` <br />
Default: `'png'`

The file format of the export. <br />
Possible Values: `'png'` `'jpg'` `'gif'` `'pdf'`

##### width
Type: `int` <br />
Default: `1366`

The width of the viewport at the time of rendering.

##### height
Type: `int` <br />
Default: `768`

The height of the viewport at the time of rendering.

##### paperSize
Type: `object`

Defines the size of the web page when rendered as a PDF. If no paperSize is defined the size is defined by the web page.

Supported dimension units are: `mm` `cm` `in` `px`. No unit means `px`. <br />
Supported formats are: `'A3'` `'A4'` `'A5'` `'Legal'` `'Letter'` `'Tabloid'`. <br />
Supported orientations are: `'landscape'` `'portrait'`. Default is `'portrait'`.

paperSize accepts objects in the following two formats:

```js
// width, height, margin
{
	width: '400px',
	height: '900px',
	margin: '1cm'
}

// format, orientation, margin
{
	format: 'Letter',
	orientation: 'landscape',
	margin: '30px'
}
```

##### quality
Type: `int` <br />
Default: `100`

The quality of the rendered output. Option not available for `format === 'png'`. <br />
Possible Values: `1` - `100`

##### mode
Type: `string` <br />
Default: `'auto'`

The triggering mode that controls when to begin rendering. <br />
Possible Values:
- `'auto'` - render immediately when the dom is ready
- `'delay'` - render after a user-defined amount of time
- `'trigger'` - trigger rendering from the page itself (w.i.p.)

##### delay
Type: `int` <br />

When `mode === 'delay'` this value represents the amount of time to delay rendering in ms.

##### userAgent
Type: `string` <br />
Default: PhantomJS default userAgent

The user agent string to send with the request.

##### enableJs
Type: `bool` <br />
Default: `true`

Whether or not to load JavaScript in the target page.

##### loadImages
Type: `bool` <br />
Default: `true`

Whether or not to load inlined images in the target page.

##### data
Type: `object` `string`

The data to send with the web page request.

Note: When data is present, the web page request is *currently* always a POST request.

##### dataType
Type: `string`<br />
Default: `'urlencoded'`

Defines the type of data to send with the web page request.
Possible Values: `'urlencoded'` `'json'`

Note: Data is currently not converted to the correct type. This sets the correct headers for the request. Because of this `'urlencoded'` expects a pre-formatted string and `'json'` an object.

##### cookies
Type: `array`

An array of cookie objects with the following properties:

###### &nbsp;&nbsp;&nbsp;&nbsp; name
&nbsp;&nbsp;&nbsp;&nbsp; *Required* <br />
&nbsp;&nbsp;&nbsp;&nbsp; Type: `string`
###### &nbsp;&nbsp;&nbsp;&nbsp; value
&nbsp;&nbsp;&nbsp;&nbsp; *Required* <br />
&nbsp;&nbsp;&nbsp;&nbsp; Type: `string`, `number`, `object`
###### &nbsp;&nbsp;&nbsp;&nbsp; path
&nbsp;&nbsp;&nbsp;&nbsp; *Required* <br />
&nbsp;&nbsp;&nbsp;&nbsp; Type: `string`
###### &nbsp;&nbsp;&nbsp;&nbsp; domain
&nbsp;&nbsp;&nbsp;&nbsp; Type: `string`
###### &nbsp;&nbsp;&nbsp;&nbsp; httponly
&nbsp;&nbsp;&nbsp;&nbsp; Type: `bool`
###### &nbsp;&nbsp;&nbsp;&nbsp; secure
&nbsp;&nbsp;&nbsp;&nbsp; Type: `bool`
###### &nbsp;&nbsp;&nbsp;&nbsp; expires
&nbsp;&nbsp;&nbsp;&nbsp; Type: `string`

##### userName
Type: `string`

The user name used for HTTP Authentication

##### password
Type: `string`

The password used for HTTP Authentication

```
// todo
##### headers - custom KVP headers
##### timeout - web page request timeout
##### requestMethod - allow user to choose GET, POST, PUT, etc.
```

## License

MIT © [Brandon Smith](https://github.com/brandon93s)
