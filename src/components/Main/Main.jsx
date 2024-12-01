import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import './Main.css'

const Main = () => {
	const {
		onSent,
		recentPrompt,
		showResult,
		loading,
		resultData,
		setInput,
		input,
	} = useContext(Context)

	const [rows, setRows] = useState(1)
	const MAX_ROWS = 10

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			if (event.shiftKey) {
				event.preventDefault()
				setInput(prevInput => prevInput + '\n')
				setRows(prevRows => Math.min(prevRows + 1, MAX_ROWS))
			} else {
				event.preventDefault()
				if (input.trim()) {
					onSent()
					setRows(1)
				}
			}
		}
	}

	const handleInputChange = e => {
		const value = e.target.value
		setInput(value)
		const newRows = value.split('\n').length
		setRows(Math.min(newRows, MAX_ROWS))
	}
	const handleCardClick = text => {
		setInput(text)
		setRows(text.split('\n').length)
		onSent(text)
	}
	return (
		<div className='main'>
			<div className='nav'>
				<p>Gemini</p>
				<img src={assets.user_icon} alt='' />
			</div>
			<div className='main-container'>
				{!showResult ? (
					<>
						<div
							className='content'
							style={{
								transform: `translateY(-${rows * 25}px)`,
							}}
						>
							<div className='greet'>
								<p>
									<span>Hello, User. </span>
								</p>
								<p>How can I help you today?</p>
							</div>
							<div className='cards'>
								<div
									className='card'
									onClick={() =>
										handleCardClick(
											'Suggest beautiful places to see on an upcoming road trip'
										)
									}
								>
									<p>
										Suggest beautiful places to see on an upcoming road trip
									</p>
									<img src={assets.compass_icon} alt='' />
								</div>
								<div
									className='card'
									onClick={() =>
										handleCardClick(
											'Briefly summarize this concept: urban planning'
										)
									}
								>
									<p>Briefly summarize this concept: urban planning</p>
									<img src={assets.bulb_icon} alt='' />
								</div>
								<div
									className='card'
									onClick={() =>
										handleCardClick(
											'Brainstorm team bonding activities for our work retreat'
										)
									}
								>
									<p>Brainstorm team bonding activities for our work retreat</p>
									<img src={assets.message_icon} alt='' />
								</div>
								<div
									className='card'
									onClick={() =>
										handleCardClick(
											'Improve the readability of the following code'
										)
									}
								>
									<p>Improve the readability of the following code</p>
									<img src={assets.code_icon} alt='' />
								</div>
							</div>
						</div>
					</>
				) : (
					<div className='result'>
						<div className='result-title'>
							<img src={assets.user_icon} alt='' />
							<p>{recentPrompt}</p>
						</div>
						<div className='result-data'>
							<img src={assets.gemini_icon} alt='' />
							{loading ? (
								<div className='loader'>
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
							)}
						</div>
					</div>
				)}

				<div className='main-bottom'>
					<div className='search-box'>
						<textarea
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							value={input}
							placeholder='Enter prompt here'
							rows={rows}
							className='text-area-input'
							style={{
								height: 'auto',
								resize: 'none',
								whiteSpace: 'pre-wrap',
								overflowWrap: 'break-word',
							}}
						/>
						<div>
							{input ? (
								<img
									className='send-icon'
									onClick={() => onSent()}
									src={assets.send_icon}
									alt=''
								/>
							) : null}
						</div>
					</div>
					<p className='bottom-info'>
						Gemini may display inaccurate info, including about people, so
						double-check its responses. Your privacy and Gemini Apps
					</p>
				</div>
			</div>
		</div>
	)
}

export default Main
