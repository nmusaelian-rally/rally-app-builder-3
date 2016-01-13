import { Immutable, Rally, React} from 'fiesta';

const { DataTable } = Rally.component;

export default class FooApp extends Rally.App {
  constructor(config) {
    super(config);
    this.api = new Rally.LookbackApi({
      scope: this.props.context.scope,
      workspace: this.props.context.scope.workspace.ObjectID,             
      server: 'https://rally1.rallydev.com'
    });

    this.state = {
      data: null
    };

    this._getData();
  }

  _getData() {
    this.api.query({
      find: {'ObjectID':30635346657,'_PreviousValues.c_CustomBox':{$exists:true}},
      fields: "['ObjectID', '_ValidFrom', '_ValidTo','c_CustomBox', '_PreviousValues.c_CustomBox']",
    }).then((data) => {
        this.setState({
        data: data
      });
    });
  }
  
    render() {
    if (this.state.data) {
      return (
        <DataTable items={ Immutable.fromJS(this.state.data) }>
          <DataTable.Column dataIndex="_ValidFrom">_ValidFrom</DataTable.Column>
          <DataTable.Column dataIndex="_ValidTo">_ValidTo</DataTable.Column>
          <DataTable.Column dataIndex="_PreviousValues">_PreviousValues.c_CustomBox</DataTable.Column>
          <DataTable.Column dataIndex="c_CustomBox">c_CustomBox</DataTable.Column>
        </DataTable>
      )
    } else {
      return <p>No data yet</p>;
    }
  }
}
