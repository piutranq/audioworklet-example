# audioworklet-example

The simple audio worklet example.

The example just play the white noise, generated by the same way
(using 15-bit LFSR) of Nintendo GameBoy.


## Browser Support

### Need features
- [AudioWorklet](https://caniuse.com/?search=AudioWorklet)
- [ES2015](https://caniuse.com/?search=ES6)
- [Async Functions (ES2017)](https://caniuse.com/?search=async%20functions)

### Tested on
- Google Chrome: latest stable (tested on 90)
- Microsoft Edge: latest stable (tested on 90)
- Mozilla Firefox: latest stable (tested on 87)

## Play the Demo

```bash
npm install
npm run build
npm run serve
```

and browse `http://localhost:8080`

※ The repo is using `webpack` to build the sources,
but not using `webpack-dev-server` for test/demo.
So every changes are not applied instantly
but need manually rebuild and refresh.