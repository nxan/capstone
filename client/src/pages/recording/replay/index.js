import React from 'react'
import { Helmet } from 'react-helmet'
import $ from 'jquery'
import styles from './style.module.scss'

class Video extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.location.id,
        }
    }

    componentDidMount() {
        let script = '<script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/record/rrweb-record.min.js"></script>'
        $('head').prepend(script);
        script = '<script src="https://cdn.jsdelivr.net/npm/rrweb-player@0.3.14/dist/index.js"></script>'
        $('head').prepend(script);
        let link = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />';
        $('head').prepend(link);
        link = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/style.css" />'
        $('head').prepend(link);

        const { playerString } = this.props
        const { id } = this.state

        console.log(playerString)
        console.log(id)
        if (id !== undefined) {
            fetch('http://localhost:8888/api/video/getOne/'.concat(id), {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((data) => data.json()).then((data) => {
                $('#container').show();
                $('#close').show();
                this.setState({
                    // visibled: true,
                    playerString: data
                });
                this.replayFormatSetter(data);
            }).catch(error => console.log(error));
        }

    }

    componentWillUnmount() {

    }

    replay = () => {
        /* eslint-disable no-new */
        /* eslint new-cap: ["error", { "newIsCap": false }] */
        /* global rrwebPlayer  */
        /* eslint no-undef: "error" */
        const { events } = this.state
        
        new rrwebPlayer({
            target: document.getElementById('video'),
            data: {
                events,
                autoPlay: true
            }
        })
    }

    replayFormatSetter = (events) => {
        let data = [];
        const { playerString } = this.state
        // console.log(playerString.length)
        console.log(events.length);
        // console.log(events)
        // for (let i = 0; i < playerString.length / 1000; i += 1) {
        //   data = data.concat(playerString[i]);
        //   console.log(data);
        // }
        playerString.forEach((entry) => {
            data = data.concat(entry);
            console.log(data)
            // return data;
        });
        // this.setState({ playerString: data })
        this.setState({
            //  visibled: true,
            events: data
        });
        // return <Redirect to={{
        //   pathname: '/replay',
        //   state: { playerString: data }
        // }}
        // />
        this.replay();
        // return playerString;
    }

    render() {


        return (
            <div>
                <Helmet title="Video List" />
                <div className="card">
                    <div className="card-body">
                        <div>
                            <div id="container" className={styles.container}>
                                <div id="video" className={styles.video} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Video