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
```
// screenshot of github.com
GET /?url=github.com
```
```
// custom viewport size
GET /?url=github.com&width=700&height=450
```
```
// non-default file type
GET /?url=github.com&format=pdf
```
###### POST
```
// delay rendering 3 seconds
POST /
{
	"url" : "github.com",
	"mode": "delay",
	"delay": 3000
}
```
```
// bulk request
POST /
{
	"format" : "pdf",
	"width": 1920,
	"height": 750,
	"paperSize": {
  		format: 'Letter',
  		orientation: 'landscape',
  		margin: '1cm'
	},
	"items": [{
		"url" : "github.com"
	},{
		"url" : "atom.io",
		"mode" : "delay",
		"delay" : 350
	},{
		"url" : "travis-ci.org",
		width: 1000
	}]
}
```


## Documentation

```
// todo
```

## API

```
// todo
```

## License

MIT © [Brandon Smith](https://github.com/brandon93s)
