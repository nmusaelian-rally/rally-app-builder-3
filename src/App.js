import { Immutable, Rally, React} from 'fiesta';

const { DataTable } = Rally.component;

export default class MyApp extends Rally.App {
  constructor(config) {
    super(config);

    this.api = new Rally.AlmApi({
      scope: this.props.context.scope,
      server: 'https://rally1.rallydev.com'
    });

    this.state = {
      data: null
    };

    this._getData();
  }

  render() {
    if (this.state.data) {
      return (
        <div>
        <DataTable items={ Immutable.fromJS(this.state.data) }>
          <DataTable.Column dataIndex="FormattedID" width={100}>FormattedID</DataTable.Column>
          <DataTable.Column dataIndex="Name">Name</DataTable.Column>
          <DataTable.Column dataIndex="Priority">Priority</DataTable.Column>
          <DataTable.Column dataIndex="Severity">Severity</DataTable.Column>
        </DataTable>
        </div>
      );
    } else {
      return <p>No data yet</p>;
    }
  }

  _getData() {
    this.api.query('/defect', { 
      fetch: ['Name', 'FormattedID', 'Priority', 'Severity'] 
    }).then((data) => {
        this.setState({
        data: data.Results
      });
    });
  }
}
