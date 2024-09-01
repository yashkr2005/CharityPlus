import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
const Input = styled("input")({
  display: "none",
});

const CommentForm = ({ postId, addComment, commenting }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setText("");
    setImage("");
    setImageName("");
  };

  const imageChange = (event) => {
    setImage(event.target.files[0]);
    setImageName(event.target.files[0].name);
  };
  return (
    <div>
      <button className='btn btn-primary' onClick={handleClickOpen} disabled={commenting}>
        Add a Comment/Contribution
      </button>
     {commenting && <button className="btn btn-danger ml-1">
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: '#ffffff',
          animationDuration: '800ms',
        
        
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={14}
        thickness={6}
        
      />
      {' '}Adding your content
      </button>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className='bg-primary p' style={{ fontFamily: "monospace" }}>
            <p>Add a Comment/Contribution</p>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='post-form'>
            <form
              className='form'
              onSubmit={(e) => {
                e.preventDefault();
                addComment(postId,{ text, image });
                handleClose();
              }}
            >
              <textarea
                name='text'
                cols='50'
                rows='5'
                placeholder='Say Something...'
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
              <div className='my-1'>
                <label htmlFor='contained-button-file'>
                  <Input
                    accept='image/*'
                    id='contained-button-file'
                    onChange={imageChange}
                    type='file'
                  />
                  <Button variant='contained' component='span'>
                    Choose Image
                  </Button>
                  <span className='ml-1'>{imageName}</span>
                </label>
              </div>

              <input
                type='submit'
                className='btn btn-primary my-1'
                value='Submit'
              />
              <button
                type='button'
                onClick={handleClose}
                className='btn btn-danger my-1'
              >
                Cancel
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
