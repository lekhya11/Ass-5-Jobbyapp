import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Jobs extends Component {
  state = {
    profileDetails: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const kookie = Cookies.get('kookie')

    const options = {
      headers: {
        Authorization: `Bearer ${kookie}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data.profile_details)
    const profile = data.profile_details
    const updatedDetails = {
      name: profile.name,
      profileImageUrl: profile.profile_image_url,
      shortBio: profile.short_bio,
    }
    this.setState({
      profileDetails: updatedDetails,
    })
  }

  render() {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    console.log(profileDetails)
    return (
      <div className="jobs-container">
        <div className="profile-con">
          <img src={profileImageUrl} alt={name} />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
      </div>
    )
  }
}

export default Jobs
