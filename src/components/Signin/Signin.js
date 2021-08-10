import React from 'react';

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      errors: {
        signInEmail: '',
        signInPassword: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'signInEmail':
        errors.signInEmail = Regex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'signInPassword':
        errors.signInPassword = value.length < 8 ? 'Password must be eight characters long!' : '';
        break;
      default:
        break;
    }
    this.setState(Object.assign(this.state, { errors, [name]: value }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let validity = true;
    Object.values(this.state.errors).forEach(
      (val) => val.length > 0 && (validity = false)
    );
    if(validity === true){
       this.onSubmitSignIn();
    }else{
       alert("Please fill out every information needed");
    }
 }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) { //checks if we received a user with the property of id
          this.props.loadUser(user);
          this.props.onRouteChange("home");
          this.props.userSignedIn(true);
        }
      })
  }

  render() {
    const {errors} = this.state 
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 bg-washed-blue center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="email">Email</label>
                <input
                  onChange={this.handleChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="signInEmail" id="signInEmail" />
                  {errors.signInEmail.length > 0 &&  <span style={{color: "red"}}>{errors.signInEmail}</span>}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                <input
                  onChange={this.handleChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="signInPassword" id="signInPassword" />
                  {errors.signInPassword.length > 0 &&  <span style={{color: "red"}}>{errors.signInPassword}</span>}
              </div>
              {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
            </fieldset>
            <div className="">
              <input
                onClick={this.handleSubmit} //only when onClick happens instead of each rendering
                noValidate
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} href="#0" className="f4 link dim black db pointer">Register</p>
              {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;