import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import Alert from '../layout/alert';
import Spinner from '../layout/Spinner';
const EditProfile = ({  createProfile , profile: {profile, loading, request_profile}, getCurrentProfile }) => {
 const navigate = useNavigate()
  const [formData, setFormData] = useState({
      handle:'',
      location: '',
      website: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
      handle,
      location,
      bio,
      website,
      twitter,
      facebook,
      linkedin,
      instagram

} = formData

const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})


const onSubmit = async (e) => {
  e.preventDefault();

  createProfile(formData, true);
};
useEffect(() => {
    getCurrentProfile()

      setFormData({
        handle: loading || !profile.handle ? "":profile.handle,
        website:loading || !profile.website  ? "": profile.website,
        location:loading || !profile.location  ? "": profile.location,
        bio: loading || !profile.bio  ?"": profile.bio,
        twitter: loading || !profile.social  ?"": profile.social.twitter,
        facebook:loading || !profile.social  ? "": profile.social.facebook,
        linkedin: loading || !profile.social  ?"": profile.social.linkedin,
        instagram: loading || !profile.social  ?"": profile.social.instagram,

      })
  }, [loading, getCurrentProfile]);
useEffect(() => {
  
  if (request_profile) {
    navigate("/dashboard");
  }
}, [request_profile,navigate]);
 
 return (<Fragment>
    <section className='container'>
   {loading && !profile ? <Spinner/>:
    <><h1 className="large text-primary">
        Edit Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <Alert/>
      <form className="form" onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
          <input type="text" placeholder="Handle" name="handle"
          value={handle} onChange={e=> onChange(e)} />
          <small className="form-text">*Give yourselves a unique handle</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" 
          value={location} onChange={e=> onChange(e)} />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        { profile.type_of &&  (<div className='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={website}
              onChange={(e) => onChange(e)}
            />
            <small className='form-text'>
              Could be your own or a company website
            </small>
          </div>)}
        

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"
          value={bio} onChange={e=> onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={()=> toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && <Fragment>
          <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter"
          value={twitter} onChange={e=> onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" 
          value={facebook} onChange={e=> onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin"
          value={linkedin} onChange={e=> onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" 
          value={instagram} onChange={e=> onChange(e)}/>
        </div>
        </Fragment>}

        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form></>}
      </section>

  </Fragment>);
};


EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
 
};

const mapStateToProps = state => ({
  profile: state.profile,
 
 
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);
