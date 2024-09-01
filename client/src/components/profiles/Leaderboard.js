import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EnhancedTable from "./EnhancedTable";
import { getLeaderboard } from "../../actions/profile";
import Spinner from "../layout/Spinner";


const Leaderboard = ({ leaderboard: { users, loading, error }, getLeaderboard }) => {
  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);
//   console.log(users);
  return (
    <section className='container'>
       <h1 className='large text-primary'>Leaderboard</h1>
      {loading || users ===  null ? <Spinner /> :<EnhancedTable rows={users} />}
    </section>
  );
};

Leaderboard.propTypes = {
  leaderboard: PropTypes.object.isRequired,
  getLeaderboard: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  leaderboard: state.leaderboard,
});

export default connect(mapStateToProps, { getLeaderboard })(Leaderboard);
