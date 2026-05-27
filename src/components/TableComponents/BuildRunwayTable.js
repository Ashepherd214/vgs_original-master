import React from 'react'
import firebase from '../../Firestore'

class BuildRunwayTable extends React.Component {
    state = { runway: [] }

    componentDidMount() {
        const db = firebase.firestore().collection("Runways");

        db.get().then( (querySnapshot) => {
            const runway = [];

            querySnapshot.forEach(function (doc) {
                runway.push({
                    name: doc.id,
                    approachlights: doc.data().ApproachLights,
                    dh: doc.data().DH,
                    edgespacing: doc.data().EdgeSpacing,
                    gsx: doc.data().GSOffsetX,
                    gsy: doc.data().GSOffsetY,
                    glideslope: doc.data().GlideSlope,
                    icao: doc.data().ICAO,
                    tch: doc.data().TCH,
                    units: doc.data().Units,
                    width: doc.data().Width
                })
            })

            this.setState({ runway })
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error)
        })
    }

    render() {       
        return (
            <tbody>
                    {this.state.runway.map(v => {
                        return (
                            <tr key={v.name}>
                                <th>{v.name}</th>
                                <th>{v.approachlights}</th>
                                <th>{v.dh}</th>
                                <th>{v.edgespacing}</th>
                                <th>{v.gsx}</th>
                                <th>{v.gsy}</th>
                                <th>{v.glideslope}</th>
                                <th>{v.icao}</th>
                                <th>{v.tch}</th>
                                <th>{v.units}</th>
                                <th>{v.width}</th>
                            </tr>
                        )
                    })}
            </tbody>
                        
        )
    }
}

export default BuildRunwayTable