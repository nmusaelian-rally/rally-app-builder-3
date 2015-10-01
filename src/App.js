import { Immutable, Rally, React} from 'fiesta';
// import React from 'react';

const { DataTable } = Rally.component;

export default class MyApp extends React.Component {
  constructor(config) {
    super(config);

    this.api = new Rally.AlmApi({
      scope: this.props.context.scope
    });

    this.state = {
      data: null
    };

    this._getData();
  }

  render() {
    if (this.state.data) {
      return (
        <DataTable items={ Immutable.fromJS(this.state.data) }>
          <DataTable.Column dataIndex="FormattedID">FormattedID</DataTable.Column>
          <DataTable.Column dataIndex="Name">Name</DataTable.Column>
        </DataTable>
      );
    } else {
      return <p>No data yet</p>;
    }
  }

  _getData() {
    this.api.query('/defect', { fetch: ['Name', 'FormattedID'] }).then((data) => {
      this.setState({
        data: data.Results
      })
    });
  }
}
