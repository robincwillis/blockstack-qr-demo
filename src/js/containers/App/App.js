import React, { Component } from 'react';

import QrReader from 'react-qr-reader';
import InlineSVG from 'svg-inline-react';


class App extends Component {

	state = {
		inputCode : 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
		svg : null,
		img : null,
		delay: 300,
		result: 'No result',
		inputMode : false,
		error : '',
		legacyMode : true
	}

	handleScan = (data) => {
		console.log('handleScan...');
		console.log(data);
		if(data){
			this.setState({
				result: data,
			})
		}
	}

	handleError = (error) => {
		console.error(error);
		this.setState({
			error : error.message,
			legacyMode: true
		});
	}


	generateBrandedCode = (event) => {
		const {inputCode} = this.state;

		const options = {
			method : 'POST',
			body : JSON.stringify({inputCode}),
			headers: new Headers({ "Content-Type": "application/json" })
		}

		fetch('/api/branded-qr-code', options).then( (res) => {
			return res.text();
		}).then( (img) => {
			this.setState({img});
		})
		.catch( (err) => {console.error(err)});

	}

	generateCode = (event) => {
		const {inputCode} = this.state;

		const options = {
			method : 'POST',
			body : JSON.stringify({inputCode}),
			headers: new Headers({ "Content-Type": "application/json" })
		}

		fetch('/api/qr-code', options).then( (res) => {
			return res.text();
		}).then( (svg) => {
			this.setState({svg});
		})
		.catch( (err) => {console.error(err)});
	}


	toggleInputMode = () => {
		this.setState({
			inputMode : !this.state.inputMode
		});
	}

	toggleLegacyMode = () => {
		this.setState({
			legacyMode : !this.state.legacyMode
		});
	}

	handleInput = (event) => {
		this.setState({
			inputCode : event.target.value
		})
	}

	openImageDialog = (event) => {
		this.qrReader.openImageDialog()
	}

	render() {

		const readerStyles = {}

		return (
			<div>
				<span onClick={this.toggleInputMode} className="tab">Toggle Generate/Read</span>
				<span onClick={this.toggleLegacyMode} className="tab">Toggle Legacy Mode</span>
				{this.state.inputMode ? (
					<div>
						<input
							type="text"
							value={this.state.inputCode}
							onChange={this.handleInput}
						/>
						<input
							type="button"
							value="Generate QR Code"
							onClick={this.generateCode}
						/>
						<input
							type="button"
							value="Generate Branded QR Code"
							onClick={this.generateBrandedCode}
						/>

						{/* Display the saved qr-code */}
						{this.state.svg ? (
							<div className="qr-container">
								<InlineSVG src={this.state.svg} element="div" className="svg" />
							</div>
						) : false}

						{this.state.img ? (
							<div className="qr-container">
								<img src={`/api${this.state.img}`} />
							</div>
						) : false}

					</div>
				) : (
					<div>
						<div className="container">
							<QrReader
								className="myQrReader"
								ref={(qrReader) => {this.qrReader = qrReader}}
								showViewFinder={false}
								style={readerStyles}
								delay={this.state.delay}
								onError={this.handleError}
								onScan={this.handleScan}
								style={{ width: '100%' }}
								legacyMode={this.state.legacyMode}
							/>
						</div>
						<p className="result">{this.state.result}</p>

						{this.state.legacyMode ? (
							<div>
								<p className="error">{this.state.error}</p>
								<h3>Webcam not supported</h3>
								<input
									type="button"
									value="Submit QR Code"
									onClick={this.openImageDialog}
								/>
							</div>
						) : false}


					</div>
				)}
			</div>
		);
	}
}

export default App;
