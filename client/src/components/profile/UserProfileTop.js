import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getFollowing } from "../../actions/profile";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
const UserProfileTop = ({
  otherprofile: {
    location,
    website,
    social,
    handle,
    following,
    user: { name, avatar, rating },
  },
  id,
  getFollowing,
  profile: { profiles },
}) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    getFollowing(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    getFollowing(id);
  }, [getFollowing, id]);
  return (
    <>
      <div className='profile-top bg-primary p-2'>
        <img className='round-img' src={avatar} alt='' />
        <div>
          <h2>{name}</h2>
          <h4>@{handle}</h4>
          <h4>
            <i className='fas fa-star'></i> {rating}
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
          <button
            onClick={handleClickOpen("paper")}
            className='btn btn-dark my-1'
            style={{ width: "160px" }}
          >
            Following{" "}
            {following && (
              <span className='comment-count'>{following.length}</span>
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
          Following{" "}
          {following.length > 0 && (
            <span className='comment-count'>{following.length}</span>
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

UserProfileTop.propTypes = {
  otherprofile: PropTypes.object.isRequired,
  getFollowing: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getFollowing })(UserProfileTop);
