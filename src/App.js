import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            post: {},
            sights:[]

        }
    }
    onChange = (e) => {
        let nwState = {...this.state.post};
        nwState[e.target.name] = e.target.value
        this.setState({post: nwState});

    }

    retrieveHandler = async (e) => {
        e.preventDefault();
        document.getElementsByTagName('form')[0].reset();
        try {
            let resp = await axios.get('/sighting/search/', {params: this.state.post})
            this.setState({sights: resp.data, post: {}});
        } catch(err) {
            console.log(err);
        } 


    }

    clickHandler = (e) => {
        e.preventDefault();
        
        axios.post('/sighting', this.state.post).catch(err => console.log(err));

        document.getElementsByTagName('form')[0].reset();
        this.setState({post: {}});

    }

    render() {

        const form = 
                <form>
                    <label>How many?</label> <input onChange={this.onChange} type="text" name="num_bears"/>
                    <label>What type?</label> <input onChange={this.onChange} type="text" name="bear_type"/>
                    <label>Which zip code?</label> <input onChange={this.onChange} type="number" name="zip_code"/>
                    <label>When did it start?</label> <input onChange={this.onChange} type="datetime-local" name="start_date"/>
                    <label>When did it end?</label> <input onChange={this.onChange} type="datetime-local" name="end_date"/>
                    <label>What else?</label> <textarea onChange={this.onChange} type="text" name="notes"/>
                    <input onClick={this.clickHandler} type="submit" id="submit"/>
                    <input onClick={this.retrieveHandler} type="submit" id="submit" value="Retrieve"/>
                </form>



        let sights = 
        <table>
            <tbody>
            <tr>
                <th>Number</th>
                <th>Type</th>
                <th>Zip Code</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Notes key</th>
            </tr>
            {this.state.sights.map((x, i) => {
                return (
                    <tr key={i}>
                        <td>{x.num_bears}</td>
                        <td>{x.bear_type}</td>
                        <td>{x.zip_code}</td>
                        <td>{x.start_date}</td>
                        <td>{x.end_date}</td>
                        <td>{x.notes}</td>
                    </tr>
                    )
                })
            }
            </tbody>
            <button onClick={() => {this.setState({sights:[]})}}>Back</button>
        </table>
        

        return (
            <div className="App">
                <img src="https://www.dave.com/img/home/dave-name.svg"/>
                <h1>Bear Sighting</h1>
                {this.state.sights.length ? sights : form}
            </div>
        )
    }
}

export default App;