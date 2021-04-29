import "./App.css";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageForm from "./components/ImageForm/ImageForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import "tachyons";
import Clarifai from "clarifai";
import { Component } from "react";

const app = new Clarifai.App({
  apiKey: "f2708c28092949a2b9456352cc4a6f90",
});

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 7,
      },
    },
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user:{
        id:'',
        name:'',
        email: '',
        entries: 0,
        userId: ''
      }
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - clarifaiFace.right_col * width,
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if(response){
          fetch('http://localhost:3001/image', {
            method:'put',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
        }
          this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === 'signin'){
      this.setState({isSignedIn:false})
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route});
  }

  loadUser = (user) => {
    this.setState({user : {
      id:user.id,
      name:user.name,
      email: user.email,
      entries: user.entries,
      userId: user.userId
    }
    });
  }

  render() {
    const { imageUrl, isSignedIn, box, route } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              imageUrl={imageUrl}
              box={box}
            />
          </div>
        ) : (route === 'signin' 
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>        
        )}
      </div>
    );
  }
}

export default App;
