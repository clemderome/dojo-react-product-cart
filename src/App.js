import React from 'react';
import './App.css';

// const initialProductList = [
//   { id: 1, name: 'produit 1', price: 50, quantity: 1 },
//   { id: 2, name: 'produit 2', price: 75, quantity: 2 },
//   { id: 3, name: 'produit 3', price: 20, quantity: 5 }
// ];

class App extends React.Component {
  state = {
    ProductList: [
      { id: 0, name: 'produit 1', price: 50, quantity: 1 },
      { id: 1, name: 'produit 2', price: 75, quantity: 2 },
      { id: 2, name: 'produit 3', price: 20, quantity: 5 }
    ],
    name:"",
    price:""
  }

  handleChange = (e, id) => {
    const newValue = this.state.ProductList.slice()
    newValue[id].quantity = e.target.value
    this.setState(({ ProductList: newValue }))
    console.log(e.target.value)
    if (e.target.value === '0') {
      console.log(e.target.value)
      if (window.confirm('Are you sure to delete that ?')) {
        const productListCopy = this.state.ProductList.slice()
        const newProductList = productListCopy.filter((product) => product.quantity !== "0")
        console.log(newProductList)
        this.setState(({ ProductList: newProductList }))
      }
    }
  }

  handleSubmit = (e) => {
    const newProduct = {id: 4, name: this.state.name, price: this.state.price, quantity: 4}
    console.log(newProduct)
    this.setState({ProductList: [...this.state.ProductList, newProduct]})
    e.preventDefault()
  }

  stateChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className='App'>
        <h1>Ma commande</h1>
        <table>
          <thead>
            <tr>
              <td>Produit</td>
              <td>Prix unitaire</td>
              <td>Quantité</td>
              <td>Prix total</td>
            </tr>
          </thead>
          <tbody>
            {this.state.ProductList.map(({ id, name, price, quantity }, index) => (
              <tr key={id}>
                <td className="name">{name}</td>
                <td className="price">{price} €</td>
                <td className="quantity"><input value={quantity} type="number" onChange={(e) => this.handleChange(e, index)}></input></td>
                <td className="total">{price * quantity} €</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="totalPrice">
          Montant total : {this.state.ProductList.map((product) => product.price * product.quantity).reduce((a, b) => a + b)} €
          </p>
          <form>
            <h2>Ajout d'un produit</h2>
            <label className="field">Nom : <input name="name" type="text" onChange={this.stateChange}></input></label>
            <label className="field">Prix : <input  name="price" type="number" onChange={this.stateChange}></input></label>
            <input className="button" type="submit" value="Ajouter" onClick={this.handleSubmit}></input>
          </form>

      </div>
    );
  }
}

export default App;
