import React from 'react';
import ReactDOM from 'react-dom';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import AddRecipe from './components/addRecipe';
import './CSS/index.css';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {name: "Banana Smoothie", ingredients: ["2 bananas", "1/2 cup vanilla yogurt", "1/2 cup skim milk", "2 teaspoons honey", "pinch of cinnamon"]},
        {name: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "Meatballs"]},
        {name: "Split Pea Soup", ingredients: ["1 pound split peas", "1 onion", "6 carrots", "4 ounces of ham"]}
      ],
      showAddModal: false
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  showAddModal() {
    this.setState({showAddModal: !this.state.showAddModal});
  }

  addRecipe(recipe) {
    let recipes = this.state.recipes;
    recipes.push(recipe);
    this.setState({recipes});
    this.showAddModal();
  }


  render() {
    const recipes = this.state.recipes;
    return(
      <div className="jumbotron">
        <h1>Recipe Box</h1>
        <h4>By Aarón Reynoza for FreeCodeCamp</h4>
        <PanelGroup accordion id="recipes">
          {recipes.map((recipe, index) => (
            <Panel eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title toggle className="title">{recipe.name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ListGroup>
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                  ))}
                </ListGroup>
                <ButtonToolbar>
                  <Button bsStyle="warning">Edit</Button>
                  <Button bsStyle="danger">Delete</Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
          ))}
        </PanelGroup>
        <Button bsStyle="primary" onClick={this.showAddModal}>Add Recipe</Button>
        <AddRecipe onShow={this.state.showAddModal} onAdd={this.addRecipe} onAddModal={this.showAddModal}/>
        <h4>Credits to <a target="blank" href="https://medium.freecodecamp.org/how-to-build-freecodecamps-recipe-box-using-react-and-local-storage-3f285a96fe44">Edward Njoroge</a> for helping me sort this out</h4>
      </div>
    )
  }
}

ReactDOM.render(<Recipe />, document.getElementById('app'));