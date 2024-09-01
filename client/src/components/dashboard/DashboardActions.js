import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import OrganizationProfileTop from "../profile/OrganizationProfileTop";
import OrganizationProfileAbout from "../profile/OrganizationProfileAbout";
import OrganizationProfileBottom from "../profile/OrganizationProfileBottom";
import UserProfileTop from "../profile/UserProfileTop";
import UserProfileAbout from "../profile/UserProfileAbout";
import UserProfileBottom from "../profile/UserProfileBottom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { setNotificationsZero } from "../../actions/profile";
import { connect } from "react-redux";
import Moment from "react-moment";
const DashboardActions = ({ profile, id, setNotificationsZero }) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [notCount, setNotCount] = useState(profile.count);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setNotCount(0);
    setScroll(scrollType);
    setNotificationsZero(id);
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

  useEffect(()=>{
    setNotCount(profile.count)
  },[profile.count])
  return (
    <>
      <div className='dash-buttons my-2'>
        <Link to='/edit-profile'>
          <button  className='btn btn-primary my'>
              <i className='fas fa-user-circle text-primary'></i> Edit Profile
          </button>
          
        </Link>
        <button className='btn btn-primary my' onClick={handleClickOpen("paper")}>
          Notifications {notCount}
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby='scroll-dialog-title'
          aria-describedby='scroll-dialog-description'
        >
          <DialogTitle id='scroll-dialog-title'>
            Recent Notifications
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            {profile.notifications.map((item) => (
              <Link to={item.url} key={item._id}>
                <div className='notifications my-1 bg-light p'>
                  <p>{item.text}</p>
                  <p className='post-date'>
                   <Moment format="YYYY/MM/DD HH:mm">{item.date}</Moment>
                  </p>
                </div>
              </Link>
            ))}
            {
              profile.notifications.length === 0 && <h3>No new notifications</h3>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      {profile && profile.type_of ? (
        <>
          {" "}
          <div className='my-1'>
            <OrganizationProfileTop otherprofile={profile} id={id} />
            <OrganizationProfileAbout profile={profile} />
            <OrganizationProfileBottom id={id} />
          </div>
        </>
      ) : (
        <>
          <div className='my-1'>
            <UserProfileTop otherprofile={profile} id={id} />
            <UserProfileAbout profile={profile} />
            <UserProfileBottom profile={profile} />
          </div>
        </>
      )}
    </>
  );
};

DashboardActions.protoTypes = {
  profile: PropTypes.object.isRequired,
  setNotificationsZero: PropTypes.func.isRequired,
};
export default connect(null, { setNotificationsZero })(DashboardActions);
