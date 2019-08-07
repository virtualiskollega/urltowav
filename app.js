const http = require('http')
const {spawn} = require('child_process')

const server = http.createServer()

server.on('request', (req, res) => {
	console.log("%s %s", req.method, req.url)
	if (req.url.match(/^\/https?:\/\//)) {
		const ffmpeg = spawn('ffmpeg', ['-i', req.url.slice(1), '-f', "wav", '-'])
		ffmpeg.stdout.pipe(res)
		ffmpeg.stderr.pipe(process.stderr)
	} else {
		res.statusCode = 400
		res.setHeader('Content-Type', 'text/plain')
		res.end(
			"This simple web service lets you convert MP3 files to WAV on the fly.\n" +
			"\n" +
			"Usage:\n" +
			"Just supply the URL of an MP3 (or other) file as a path, like so:\n" +
			"  https://urltowav.herokuapp.com/http://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=Test&extensionhack=.wav\n" +
			"\n" +
			"TODO (aka features which won't be ever implemented)\n" +
			"- Pass URL as a query parameter\n" +
			"- Supply input file by some upload method (PUT, multipart/form-data)\n" +
			"- Ability to examine ffmpeg output at client side\n" +
			"- Proper error handling\n" +
			"- Security\n"
		)
	}
})

server.listen(process.env.PORT || 3000)