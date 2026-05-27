import React from 'react'
import firebase from '../../Firestore'

class BuildAircraftTable extends React.Component {
    state = { aircraft: [] }

    componentDidMount() {
        const db = firebase.firestore().collection("Aircrafts");

        db.get().then( (querySnapshot) => {
            const aircraft = [];

            querySnapshot.forEach(function (doc) {
                aircraft.push({
                    name: doc.id,
                    xa: doc.data().Xa,
                    xe: doc.data().Xe,
                    za: doc.data().Za,
                    ze: doc.data().Ze,
                    cg: doc.data().cg,
                    flaps: doc.data().flaps,
                    lookdown: doc.data().lookdown,
                    pitch: doc.data().pitch,
                    speed: doc.data().speed,
                    weight: doc.data().weight,
                    unitsair: doc.data().unitsAir,
                    airType: doc.data().aircraftType, 
                })
            })

            this.setState({ aircraft })
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error)
        })
    }

    render() {       
        return (
            <tbody>
                    {this.state.aircraft.map(v => {
                        return (
                            <tr key={v.name}>
                                <th>{v.name}</th>
                                <th>{v.xa}</th>
                                <th>{v.xe}</th>
                                <th>{v.za}</th>
                                <th>{v.ze}</th>
                                <th>{v.cg}</th>
                                <th>{v.flaps}</th>
                                <th>{v.lookdown}</th>
                                <th>{v.pitch}</th>
                                <th>{v.speed}</th>
                                <th>{v.weight}</th>
                                <th>{v.unitsair}</th>
                                <th>{v.aircraftType}</th>
                            </tr>
                        )
                    })}
            </tbody>
                        
        )
    }
}

export default BuildAircraftTable