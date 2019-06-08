import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import Moment from 'react-moment'

import ImageBox from 'components/molecules/ImageBox'
import KakaoMap from 'components/molecules/KakaoMap'

import * as actions from 'store/actions'

import default_meeting from 'icons/default-meeting.png'

import './MeetingDetail.css'

class MeetingDetail extends Component {

	onDeleteHandler = (e) => {
		e.preventDefault()
		this.props.deleteMeetingRequest(this.props.meeting.id)
		this.props.history.push('/')
	}

	onEditHandler = (e) => {
		e.preventDefault()
		this.props.history.push(`/meeting/${this.props.meeting.id}/edit`)
	}

	render() {
		return (
			<div className="meeting-detail">
				<div className="description">
					<div className="image-wrapper">
						<ImageBox 
							src={this.props.meeting.photo}
							default={default_meeting}
						/>
					</div>							
					<div className="description-body">
						<div className="host-info">
							<p> 
								<strong> {this.props.meeting.nickname} </strong>
								호스트
							</p>
							<Link
								to={`/user/${this.props.meeting.host}/`}
							>
								정보
							</Link>
						</div>
						<div className="meeting-info">
							<p> {this.props.meeting.content} </p>
							<ul className="tag-list">
								{
									Object.keys(this.props.meeting.tag_set).map(key => (
										<li key={`tag_${key}`}>
											<Link 
												to={`/search/${this.props.meeting.tag_set[key]}`} 
											>
												{`#${this.props.meeting.tag_set[key]} `}
											</Link>
										</li>
								))}					
							</ul>				
							{(this.props.meeting.host === this.props.id) ? (
								<div className="host-buttons">
									<button onClick={this.onEditHandler} > 수정 </button>
									<button onClick={this.onDeleteHandler}> 삭제 </button>
								</div>
							) : (
								<div className="guest-buttons">
									<button> 참가하기 </button>
									<button> 신고하기 </button>
								</div>
							)}
						</div>
					</div>
					<ul className="description-list">
						<li>
							<p> 
								<strong> 현재 상태 </strong>
								{(this.props.meeting.status === 0) 
										? '모집중' : '마감'
								}
							</p>
						</li>
						<li>
							<p>
								<strong> 날짜 </strong>
								<Moment format='LLLL' locale='ko'>
									{this.props.meeting.date}
								</Moment>
							</p>
						</li>
						<li>
							<p>
								<strong> 모집 마감 </strong>
								<Moment format='LLLL' locale='ko'>
									{this.props.meeting.deadline}
								</Moment>
							</p>
						</li>
						<li>
							<p>
								<strong> 최대 인원 </strong>
								{this.props.meeting.max_participant}명
							</p>
						</li>
					</ul>
				</div>
				<div className="meeting-place">
					<div 
						className="map"
					>
						<KakaoMap	
							name={this.props.meeting.region}
							option="view"
						/>
					</div>
					<ul className="description-list">
						<li>
							<p className="location">
								<strong> 위치 </strong>
								{this.props.meeting.region}
							</p>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		id: state.user.id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteMeetingRequest: (index) => {
			dispatch(actions.meeting.deleteMeetingRequest(index))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetail)
