import React from 'react';
import PropTypes from 'prop-types';

export default class ContactDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
      name: '',
      phone: ''
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleToggle() {
    if(!this.state.isEdit){
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone
      })
    } else {
      this.handleEdit();
    }

    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  handleChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState)
  }

  handleEdit(){
    this.props.onEdit(this.state.name, this.state.phone);
  }

  handleKeyPress(e){
    if(e.charCode===13){
      this.handleToggle();
    }
  }

  render(){

    const details = (
      <div>
        <p>{this.props.contact.name} <br/>
        {this.props.contact.phone}</p>
      </div>
    );

    const edit = (
      <div>
        <p>
          <input type='text' name='name' placeholder='Enter Name...'
                value={this.state.name}
                onChange={this.handleChange}
          />
        </p>
        <p>
          <input type='text' name='phone' placeholder='Enter Phone Number...'
                value={this.state.phone}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
          />
        </p>
      </div>
    )
    const viewEdit = this.state.isEdit ? edit : details;
    const blank = (<div>Nothing is selected</div>);

    return(
      <div>
        <h1>Details</h1>
        <p>NOTE: To see details, click the name.</p>
        {this.props.isSelected ? viewEdit : blank}
        <p>
          <button onClick={this.handleToggle}>
            {this.state.isEdit ? 'OK' : 'EDIT'}
          </button>
          <button onClick={this.props.onRemove}>REMOVE</button>
        </p>
      </div>
    );
  }
}

ContactDetails.defaultProps = {
  contact: {
    name: '',
    phone: ''
  },
  onRemove: () => {console.error('onRemove props not defined');},
  onEdit: () => {console.error('onEdit props not defined');}
};

ContactDetails.propTypes = {
  contact: PropTypes.object,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func
}
