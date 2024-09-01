import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
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
const PostForm = ({ addPost, posting }) => {
  const [text, setText] = useState("");
  const [value, setValue] = React.useState("post");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setText("");
    setValue("post");
    setImage("");
    setImageName("");
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const imageChange = (event) => {
    setImage(event.target.files[0]);
    setImageName(event.target.files[0].name);
  };
  return (
    <div>
      <button className='btn btn-primary' onClick={handleClickOpen} disabled={posting}>
        Create a Post/Event
      </button>
     {posting && <button className="btn btn-danger ml-1">
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
      {' '}Creating your content
      </button>}
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className='bg-primary p' style={{ fontFamily: "monospace" }}>
            <p>Create a Post/Event</p>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='post-form'>
            <form
              className='form'
              onSubmit={(e) => {
                e.preventDefault();
                addPost({ text, value, image });
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

              <div>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='post'
                      control={<Radio />}
                      label='Post'
                    />
                    <FormControlLabel
                      value='event'
                      control={<Radio />}
                      label='Event'
                    />
                  </RadioGroup>
                </FormControl>
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
