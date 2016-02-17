Remote Test System target
=========================

Remote Test System target - part of testing system for remote step-by-step test execution.
Other parts:
[client](https://github.com/stbrnd/rts-client)
[server](https://github.com/stbrnd/rts-server)


## Usage ##

Default mode: Run client part at PC. It will generate url. Launch the url at stb device.

Pre-defined mode: change and activate config, run index.html page at stb device.


## Debug mode ##

> There is a global var `DEBUG` which activates additional consistency checks and protection logic not available in release mode.

In debug mode the constructor is exposed to the global namespace as `window.app`.


## API methods and notification events ##

### runTask ###

Run task at target with given parameters, send task result to server.

Request parameters:

 Name         | Type     | Description
--------------|----------|-------------
 name         | String   | optional task name
 description  | String   | optional task description
 values       | Object   | optional task launch parameters
 source       | String   | tack code

Request example:

```js
{
	name: 'Play',
	description: 'Start video playback',
	values: {
		url: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_50mb.mp4',
		loop: true
	},
	source: "'use strict';\n\n(function () {\n\t return {\n\t\t...this.done();\n\t\t}\n\t};\n})();\n"
}
```

Response examples:

```js
{
	context: {
		uri: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_50mb.mp4'
	},
	status: 1
}
```

```js
{
	output: 'task is done',
	status: -1
}
```


## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/stbrnd/rts-target).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`rts-target` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
