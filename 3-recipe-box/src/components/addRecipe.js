import React, { Component } from 'react';
import {Modal, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';


export default class addRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: ""
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRecipeChange = this.handleRecipeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCancel() {
    const cancelModal = this.props.onAddModal;
    this.setState({
      name: "",
      ingredients: ""
    });
    cancelModal();
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handleRecipeChange(e) {
    this.setState({ingredients: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    const onAdd = this.props.onAdd;
    let newName = this.state.name;
    let newIngredients = this.state.ingredients.split(",");
    let newRecipe = {name: newName, ingredients: newIngredients};
    onAdd(newRecipe);
    this.setState({name: "", ingredients: ""});
  }


  render() {
    const onShow = this.props.onShow;
    //I need to lear RegExp...
    let regex1 = /^\S/;
    let regex2 = /^[^,\s]/;
    let regex3 = /[^,\s]$/;
    const validated = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients);
    return (
      <Modal show={onShow} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>Recipe Name</ControlLabel>
              <FormControl
              id="formsControlName"
              type="text"
              value={this.state.name}
              placeholder="Enter name"
              onChange={this.handleNameChange}
              />
              <br/>
              <FormControl
              id="formsControllRecipe"
              type="text"
              value={this.state.ingredients}
              placeholder="Enter recipe, separated by comas."
              onChange={this.handleRecipeChange}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" disabled={!validated} onClick={this.handleSubmit}>Save Recipe</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
