import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  MenuItem,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from 'react-material-ui-form-validator';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  btn: {
    backgroundColor: '#A60000',
    color: '#ffffff',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    '&:hover': {
      backgroundColor: 'rgba(166, 0, 0, 0.8)'
    }
  },
  textField: {
    marginBottom: '16px'
  },
  submissions: {
    width: '80px',
    height: '50px'
  }
}));

export default function VolunteerFormModal({ className }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formData, updateFormData] = useState({});
  const [submitting, setSubmitting] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
    formData.countryCode = '+91';
    formData.phone = '';
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    formData.phone = `${formData.countryCode}${formData.phone}`;
    setSubmitting(1);
    e.preventDefault();
    axios({
      method: 'post',
      url:
        'https://us-central1-codeforcauseorg.cloudfunctions.net/widgets/leads', // TO CHANGE******************
      data: formData
    })
      .then(response => {
        setSubmitting(0);
        handleClose();
        enqueueSnackbar('Application Submitted Successfully');
      })
      .catch(error => {
        enqueueSnackbar('Application Failed. Try again later');
      });
  };

  const countryCodes = Array(100)
    .fill(1)
    .map((x, y) => x + y)
    .reverse();

  return (
    <div>
      <Button
        className={className}
        size="large"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Apply now
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Apply to Volunteer with Codeforcause
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Please provide your details below.</Typography>
          </DialogContentText>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              required
              key="name"
              className={classes.textField}
              label="Full Name"
              variant="outlined"
              value={formData.name}
              fullWidth
              name="name"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['This is a required field']}
            />

            <TextValidator
              required
              key="email"
              className={classes.textField}
              label="Email"
              variant="outlined"
              value={formData.email}
              fullWidth
              name="email"
              onChange={handleChange}
              validators={['required', 'isEmail']}
              errorMessages={[
                'This is a required field',
                'Please enter a valid email'
              ]}
            />

            <Grid container spacing={2} justify="space-evenly">
              <Grid item xs={2}>
                <SelectValidator
                  key="countryCode"
                  className={classes.textField}
                  value={formData.countryCode}
                  onChange={handleChange}
                  name="countryCode"
                  variant="outlined"
                  validators={['required']}
                  errorMessages={['Please select a country code']}
                  fullWidth
                >
                  {countryCodes.map(code => {
                    return <MenuItem value={`+${code}`}>+{code}</MenuItem>;
                  })}
                </SelectValidator>
              </Grid>

              <Grid item xs={10}>
                <TextValidator
                  key="contact"
                  className={classes.textField}
                  label="WhatsApp / Contact Number "
                  variant="outlined"
                  value={formData.phone}
                  fullWidth
                  name="phone"
                  onChange={handleChange}
                  validators={[
                    'required',
                    'matchRegexp:^[+]*[(]*[+]{0,1}[0-9]{1,3}[)]{0,1}[-s./0-9]*$'
                  ]}
                  errorMessages={[
                    'This is a required field',
                    'Please enter a valid contact number'
                  ]}
                />
              </Grid>
            </Grid>

            <TextValidator
              required
              key="linkedIn"
              className={classes.textField}
              label="LinkedIn URL"
              variant="outlined"
              value={formData.linkedIn}
              fullWidth
              name="linkedIn"
              onChange={handleChange}
              validators={[
                'required',
                'matchRegexp:^(http(s)?://)?([w]+.)?linkedin.com/(pub|in|profile)'
              ]}
              errorMessages={[
                'This is a required field',
                'Please enter a valid URL'
              ]}
            />

            <TextValidator
              required
              key="interests"
              className={classes.textField}
              label="Interested Domains"
              variant="outlined"
              value={formData.interests}
              fullWidth
              name="interests"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['This is a required field']}
            />

            <TextValidator
              required
              key="videoLink"
              className={classes.textField}
              label="Demo Video Link (3 - 10 min)"
              variant="outlined"
              value={formData.videoLink}
              fullWidth
              name="videoLink"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['This is a required field']}
            />

            {submitting === 0 ? (
              <Button type="submit" variant="contained" color="secondary">
                Submit
              </Button>
            ) : (
              <div className={classes.submissions}>
                <CircularProgress />
              </div>
            )}

            <Button
              variant="outlined"
              onClick={handleClose}
              color="secondary"
              style={{
                marginLeft: '16px'
              }}
            >
              Cancel
            </Button>
          </ValidatorForm>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
