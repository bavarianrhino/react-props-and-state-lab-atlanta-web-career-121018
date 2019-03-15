import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'


class App extends React.Component {

    constructor() {
        super()

        this.state = {
            // isLoading: false,
            pets: [],
            filters: {
                type: 'all'
            }
        }
    }

    fetchData = () => {
        // this.setState({ isLoading: true });
        let urlEndPoint = '/api/pets';

        if (this.state.filters.type !== 'all'){
            urlEndPoint += `?type=${this.state.filters.type}`;
        }

        fetch(urlEndPoint)
            .then(res => res.json())
            .then(pets => this.setState({ pets: pets }));
    }

    updateFilterType = (event) => {
        this.setState({
            filters: {...this.state.filters,
                type: event.target.value
            }
        })
    }

    onAdoptPet = (id) => {
        let adoptedUpdatedPets = this.state.pets.map(pet => {
            if (pet.id === id ){
                return {...pet, isAdopted: true}
            } else {
                return pet
            }
        })
        this.setState({ pets: adoptedUpdatedPets })
    }

    render() {
        return (
            <div className="ui container">
                <header>
                    <h1 className="ui dividing header">React Animal Shelter</h1>
                </header>

                <div className="ui container">
                    <div className="ui grid">
                        <div className="four wide column">
                            <Filters onChangeType={this.updateFilterType} onFindPetsClick={this.fetchData} />
                        </div>
                        <div className="twelve wide column">
                            <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default App
