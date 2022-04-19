import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/system';
import axios from "axios"
import { useNavigate } from "react-router-dom";


// import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl } from '@mui/material';


const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  display: flex;
  font-weight: 500;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 8px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  align-items: center;
  justify-content: center;

  &.${inputUnstyledClasses.focused} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
`,
);

const StyledInputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
`,
);

const IconButton = styled(ButtonUnstyled)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
`;

const InputAdornment = styled('div')`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { components, ...other } = props;

 
  return (
    <InputUnstyled
      components={{
        Root: StyledInputRoot,
        Input: StyledInputElement,
        ...components,
      }}
      {...other}
      ref={ref}
    />
  );
});

CustomInput.propTypes = {
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Textarea: PropTypes.elementType,
  }),
};

export function Login() {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
      e.preventDefault()
    //   setIsLoading(true);

    //   setTimeout(() => {
    //     setIsLoading(false);
    //   },2000)
    console.log(values)
      axios.post("http://localhost:5000/login", values).then(res => {
          console.log(res.data);
          setIsLoading(false);
          localStorage.setItem("islogin", true)
        navigate("/")
      }).catch(rej => {
          console.log(rej);
          setIsLoading(false);
      })
  }

  

  

  return (
    <FormControl>
    <Box sx={{ display: 'flex', '& > * + *': { ml: 1 } }}>
      {/* <CustomInput
        id="outlined-start-adornment"
        startAdornment={<InputAdornment>email</InputAdornment>}
      /> */}
      

    <CustomInput
        id="outlined-adornment-password"
        type='text'
        value={values.email}
        onChange={handleChange('email')}
        placeholder="Enter Email"
        
      />
      <CustomInput
        id="outlined-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        placeholder="Enter Password"
        endAdornment={
          <InputAdornment>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

    <LoadingButton onClick={handleSubmit} loading={isLoading} variant="outlined">
        Submit
      </LoadingButton>
    </Box>
    </FormControl>
  );
}

/*import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';

export default function LoadingButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton loading loadingIndicator="Loading..." variant="outlined">
        Fetch data
      </LoadingButton>
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        Save
      </LoadingButton>
    </Stack>
  );
}
 */