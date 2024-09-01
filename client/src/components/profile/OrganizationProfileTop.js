import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { follow, getFollowers } from "../../actions/profile";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
const OrganizationProfileTop = ({
  otherprofile: {
    type_of,
    location,
    website,
    social,
    handle,
    followers,
    user: { name, avatar, rating },
  },
  auth,
  follow,
  id,
  getFollowers,
  profile: { profiles },
}) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    getFollowers(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    getFollowers(id);
  }, [getFollowers, id]);
  return (
    <>
      <div className='profile-top bg-primary p-2'>
        <img className='round-img' src={avatar} alt='' />
        <div>
          <h2>{name}</h2>
          <h4>@{handle}</h4>
          <h4>
            <i className='fas fa-bolt'></i> {rating}
          </h4>
          <h4 className='my-1'>
            {location && (
              <span>
                <i className='fa fa-map-marker' aria-hidden='true'></i>{" "}
                {location}
              </span>
            )}
          </h4>

          <div className='icons'>
            {website && (
              <a href={website} target='_blank' rel='noopener noreferrer'>
                <i className='fab fa-globe fa-2x'></i>
              </a>
            )}
            {social && social.twitter && (
              <a
                href={social.twitter}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-twitter fa-2x'></i>
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-facebook fa-2x'></i>
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-linkedin fa-2x'></i>
              </a>
            )}

            {social && social.instagram && (
              <a
                href={social.instagram}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-instagram fa-2x'></i>
              </a>
            )}
          </div>
        </div>
        <div>
          {auth.isAuthenticated &&
            auth.loading === false &&
            !auth.user.type_of && (
              <button
                onClick={(e) => follow(id)}
                className='btn btn-dark'
                style={{ width: "160px" }}
              >
                {followers.filter(
                  (item) => item.user.toString() === auth.user._id
                ).length > 0
                  ? "Unfollow"
                  : "Follow"}
              </button>
            )}
          <button
            onClick={handleClickOpen("paper")}
            className='btn btn-dark my-1'
            style={{ width: "160px" }}
          >
            Followers{" "}
            {followers && (
              <span className='comment-count'>{followers.length}</span>
            )}
          </button>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          {" "}
          Followers{" "}
          {followers.length > 0 && (
            <span className='comment-count'>{followers.length}</span>
          )}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {profiles == null ? (
            <h2>Loading Profiles ...</h2>
          ) : (
            <>
              <div className='profiles'>
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h2>No profiles to display ...</h2>
                )}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

OrganizationProfileTop.propTypes = {
  otherprofile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  getFollowers: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { follow, getFollowers })(
  OrganizationProfileTop
);
