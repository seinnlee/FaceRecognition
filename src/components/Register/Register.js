import React from 'react';

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

class Register extends React.Component {
  constructor(props) {
    super(props);
    const initialState = {
      name: '',
      email: '',
      password: '',
      errors: {
        name: '',
        email: '',
        password: ''
      }
    }
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'name':
        errors.name = value.length < 2 ? 'Name must be at least 2 characters long!' : '';
        break;
      case 'email':
        errors.email = Regex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password = value.length < 8 ? 'Password must be eight characters long!' : '';
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
       this.onSubmitRegister();
    }else{
       alert("Please fill out every information needed");
    }
 }

  onSubmitRegister = () => {
    fetch('https://arcane-sierra-67660.herokuapp.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json()) //the response is not JSON 
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
          this.props.userSignedIn(true);
        }
      })
  }

  render() {
    const {errors} = this.state;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 bg-washed-blue center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                <input
                  onChange={this.handleChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
                {errors.name.length > 0 &&  <span style={{color: "red"}}>{errors.name}</span>}
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5" htmlFor="email">Email</label>
                <input
                  onChange={this.handleChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email"
                />
                {errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                <input
                  onChange={this.handleChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
                {errors.password.length > 0 &&  <span style={{color: "red"}}>{errors.password}</span>}
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.handleSubmit} //only when onClick happens instead of each rendering
                noValidate
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                type="submit"
                value="Register"
              />
            </div>
            <div className="lh-copy mt3">
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;