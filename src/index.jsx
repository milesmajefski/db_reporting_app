import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Database Reporting App</h1>
                {/* <div className="miles-container">
                    <a className="miles-menu-item" href={this.props.reportsurl}>View All Reports</a>
                    <a className="miles-menu-item" href={this.props.schemaurl}>View Database Schema</a>
                </div> */}
            </div>
        );
    }
}

let id = 'app';
let root = document.getElementById(id);
if (root) {
    ReactDOM.render(<App {...(root.dataset)} />, root);
}

///////////////////////////
// Schema View
const compactImage = "/static/relationships.real.compact.png";
const largeImage = "/static/relationships.real.large.png";

class ViewSchema extends React.Component {


    render() {
        return (
            <div className="miles-imgs">
                <div>
                    <h1>Db Schema Compact</h1>
                    <a href={compactImage}>
                        <img className="miles-img v-space" src={compactImage} alt="" />
                    </a>
                </div>

                <div>
                    <h1>Db Schema Full</h1>
                    <a href={largeImage}>
                        <img className="miles-img v-space" src={largeImage} alt="" />
                    </a>
                </div>


            </div>
        );
    }
}

id = 'viewschema';
root = document.getElementById(id);
if (root) {
    ReactDOM.render(<ViewSchema {...(root.dataset)} />, root);
}


//////////////////////////////////
// list all reports
class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reports: JSON.parse(this.props.reports) };
    }
    render() {
        return (
            <div>
                <h1>Reports</h1>
                {this.state.reports.map((report, index) =>
                    <div key={index}>
                        <p></p>
                        <a href={report.url}>{report.name}</a>
                        {/* <pre><code>{report.query}</code></pre> */}
                        {/* <br /> */}
                    </div>
                )}
            </div>
        );
    }
}

id = 'reports';
root = document.getElementById(id);
if (root) {
    ReactDOM.render(<Reports {...(root.dataset)} />, root);
}

//////////////////////////////////////////////
class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportdata: JSON.parse(this.props.reportdata),
            timestamp: parseFloat(this.props.reporttimestamp)
        };
    }
    dateString(timestamp) {
        // const t = parseFloat(timestamp);
        // console.log(t);
        const d = new Date(timestamp * 1000);
        d.setMilliseconds(0, 0);
        return d.toISOString().replace("T", " ").replace(".000", "");
    }

    handleClick() {
        exportTableToCSV(this.props.reportname + " " + this.dateString(this.state.timestamp) + ".csv");
    }

    render() {
        return (
            <div>
                <h1>{this.props.reportname}</h1>
                <pre><code>{this.props.reportquery}</code></pre>
                <div className="miles-pad-top">
                    <button className="pure-button" onClick={this.handleClick.bind(this)}>Download as CSV</button>
                </div>
                <table className="pure-table pure-table-bordered">
                    <caption>{this.props.reportname} {this.dateString(this.state.timestamp)}</caption>
                    <thead>
                        <tr>
                            {this.state.reportdata.columns.map(
                                (column, index) =>
                                    <td key={index}>{column}</td>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reportdata.data.map(
                            (row, index) =>
                                <tr key={"row" + index}>
                                    {row.map(
                                        (item, index) =>
                                            <td key={"item" + index}>{item}</td>
                                    )}
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

id = 'report';
root = document.getElementById(id);
if (root) {
    ReactDOM.render(<Report {...(root.dataset)} />, root);
}