import React, { Component } from 'react';

import QrReader from 'react-qr-reader';
import InlineSVG from 'svg-inline-react';


class App extends Component {

	state = {
		inputCode : 'waelfjwaliejfiawlejfwfwlijfiw3jfl',
		outoutCode : '',
		svg : '',
		delay: 300,
		result: 'No result',
		inputMode : false,
		error : '',
		legacyMode : false
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

	generateCode = (event) => {
		const {inputCode} = this.state;
		const options = {
			method : 'POST',
			body : JSON.stringify({inputCode}),
			headers: new Headers({ "Content-Type": "application/json" })
			//body : this.state.inputCode
		}

		fetch('http://localhost:5000/api/qr-code', options).then( (res) => {
			return res.text();
		}).then( (svg) => {
			this.setState({svg});
		})
		.catch(console.error.bind(console));
	}


	toggleMode = () => {
		const mode = this.state.inputMode;
		this.setState({
			inputMode : !mode
		});
	}

	uploadCode = (event) => {
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
				<span onClick={this.toggleMode} className="tab">Toggle Gen/Read</span>
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
						{/* Display the saved qr-code image */}
						<div className="qr-container">
							<InlineSVG src={this.state.svg} element="div" className="svg" />
						</div>
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
						<p>{this.state.result}</p>

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

//<div style="top: 0px; left: 0px; z-index: 1; box-sizing: border-box; border: 50px solid rgba(0, 0, 0, 0.3); box-shadow: rgba(255, 0, 0, 0.5) 0px 0px 0px 5px inset; position: absolute; width: 100%; height: 100%;"></div>

export default App;