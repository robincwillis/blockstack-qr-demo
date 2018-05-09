
Small Proof of concept for Generating and reading QR Codes through web browser for BlockStack

# QR Reader for Blockstack

# QR Generator for Blockstack

# Branded QR Generator for Blockstack

Frontend and Backend Apps are decoupled so you can choose to use both or just one individually.


## Requirements

Node ^6.7
NPM  ^4.6

## Development

1. Install Dependancies

```
npm install
```

2. Run Local Development Server (serves frontend)

```
npm start
```

3. Run QR Code Generator Server (servers backend)

```
node gen.js
```

# Notes

If not running on Localhost Camera will only work on https enabled sites.

on Safari

Trying to call getUserMedia from an insecure document.
probably fixed by serving from https

on iPhone

{name: "NoVideoInputDevicesError", message: "No video input devices found", line: 6, column: 207239, sourceURL: "http://r.local:5000/app.js"}